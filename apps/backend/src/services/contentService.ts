import {
  PutCommand,
  GetCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient } from '../config/dynamodb';
import { ContentItem, CreateContentItem, UpdateContentItem } from '../types/content';

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'pixelsandpetals-content';

export class ContentService {
  async createContent(data: CreateContentItem): Promise<ContentItem> {
    const now = new Date().toISOString();
    const id = `${data.type}_${data.slug}_${Date.now()}`;

    const item: ContentItem = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
      ConditionExpression: 'attribute_not_exists(id)',
    });

    await dynamoDbClient.send(command);
    return item;
  }

  async getContentById(id: string): Promise<ContentItem | null> {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });

    const result = await dynamoDbClient.send(command);
    return result.Item as ContentItem || null;
  }

  async getContentBySlug(slug: string, type?: string): Promise<ContentItem | null> {
    const scanCommand = new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: type
        ? 'slug = :slug AND #type = :type'
        : 'slug = :slug',
      ExpressionAttributeValues: {
        ':slug': slug,
        ...(type && { ':type': type }),
      },
      ...(type && {
        ExpressionAttributeNames: {
          '#type': 'type',
        },
      }),
    });

    const result = await dynamoDbClient.send(scanCommand);
    return result.Items?.[0] as ContentItem || null;
  }

  async getAllContent(type?: string, status?: string): Promise<ContentItem[]> {
    let filterExpression = '';
    const expressionAttributeValues: any = {};
    const expressionAttributeNames: any = {};

    if (type || status) {
      const conditions = [];

      if (type) {
        conditions.push('#type = :type');
        expressionAttributeValues[':type'] = type;
        expressionAttributeNames['#type'] = 'type';
      }

      if (status) {
        conditions.push('#status = :status');
        expressionAttributeValues[':status'] = status;
        expressionAttributeNames['#status'] = 'status';
      }

      filterExpression = conditions.join(' AND ');
    }

    const command = new ScanCommand({
      TableName: TABLE_NAME,
      ...(filterExpression && { FilterExpression: filterExpression }),
      ...(Object.keys(expressionAttributeValues).length > 0 && {
        ExpressionAttributeValues: expressionAttributeValues,
      }),
      ...(Object.keys(expressionAttributeNames).length > 0 && {
        ExpressionAttributeNames: expressionAttributeNames,
      }),
    });

    const result = await dynamoDbClient.send(command);
    return result.Items as ContentItem[] || [];
  }

  async updateContent(id: string, data: UpdateContentItem): Promise<ContentItem | null> {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const updateExpressions: string[] = [];
    const expressionAttributeValues: any = {};
    const expressionAttributeNames: any = {};

    Object.entries(updateData).forEach(([key, value], index) => {
      if (key === 'type') {
        updateExpressions.push(`#${key} = :val${index}`);
        expressionAttributeNames[`#${key}`] = key;
      } else {
        updateExpressions.push(`${key} = :val${index}`);
      }
      expressionAttributeValues[`:val${index}`] = value;
    });

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ...(Object.keys(expressionAttributeNames).length > 0 && {
        ExpressionAttributeNames: expressionAttributeNames,
      }),
      ReturnValues: 'ALL_NEW',
    });

    const result = await dynamoDbClient.send(command);
    return result.Attributes as ContentItem || null;
  }

  async deleteContent(id: string): Promise<boolean> {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
      ReturnValues: 'ALL_OLD',
    });

    const result = await dynamoDbClient.send(command);
    return !!result.Attributes;
  }

  async bulkCreateContent(items: CreateContentItem[]): Promise<ContentItem[]> {
    const createdItems: ContentItem[] = [];

    for (const item of items) {
      try {
        const createdItem = await this.createContent(item);
        createdItems.push(createdItem);
      } catch (error) {
        console.error(`Failed to create item with slug ${item.slug}:`, error);
      }
    }

    return createdItems;
  }
}

export const contentService = new ContentService();