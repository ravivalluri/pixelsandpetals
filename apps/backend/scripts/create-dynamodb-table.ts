import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  ...(process.env.NODE_ENV === 'development' && process.env.DYNAMODB_ENDPOINT
    ? { endpoint: process.env.DYNAMODB_ENDPOINT }
    : {}),
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    : undefined,
});

async function createTable() {
  const tableName = process.env.DYNAMODB_TABLE_NAME || 'pixelsandpetals-content';

  const command = new CreateTableCommand({
    TableName: tableName,
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH', // Partition key
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'slug',
        AttributeType: 'S',
      },
      {
        AttributeName: 'type',
        AttributeType: 'S',
      },
      {
        AttributeName: 'status',
        AttributeType: 'S',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: 'SlugIndex',
        KeySchema: [
          {
            AttributeName: 'slug',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
      {
        IndexName: 'TypeIndex',
        KeySchema: [
          {
            AttributeName: 'type',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
      {
        IndexName: 'StatusIndex',
        KeySchema: [
          {
            AttributeName: 'status',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
    Tags: [
      {
        Key: 'Project',
        Value: 'PixelsAndPetals',
      },
      {
        Key: 'Environment',
        Value: process.env.NODE_ENV || 'development',
      },
    ],
  });

  try {
    const result = await client.send(command);
    console.log('✅ Table created successfully:', result.TableDescription?.TableName);
    console.log('📊 Table ARN:', result.TableDescription?.TableArn);
    process.exit(0);
  } catch (error: any) {
    if (error.name === 'ResourceInUseException') {
      console.log('ℹ️  Table already exists:', tableName);
      process.exit(0);
    } else {
      console.error('❌ Error creating table:', error);
      process.exit(1);
    }
  }
}

createTable();