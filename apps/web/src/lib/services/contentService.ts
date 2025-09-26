import { ContentItem, CreateContentItem, UpdateContentItem, ApiResponse } from '../types/content';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ContentServiceClass {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async createContent(data: CreateContentItem): Promise<ContentItem> {
    const response = await this.request<ContentItem>('/api/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create content');
    }

    return response.data;
  }

  async bulkCreateContent(items: CreateContentItem[]): Promise<ContentItem[]> {
    const response = await this.request<ContentItem[]>('/api/content/bulk', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create bulk content');
    }

    return response.data;
  }

  async getAllContent(filters?: {
    type?: string;
    status?: string;
  }): Promise<ContentItem[]> {
    const searchParams = new URLSearchParams();

    if (filters?.type) searchParams.set('type', filters.type);
    if (filters?.status) searchParams.set('status', filters.status);

    const queryString = searchParams.toString();
    const endpoint = `/api/content${queryString ? `?${queryString}` : ''}`;

    const response = await this.request<ContentItem[]>(endpoint);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch content');
    }

    return response.data;
  }

  async getContentById(id: string): Promise<ContentItem | null> {
    const response = await this.request<ContentItem>(`/api/content/${id}`);

    if (!response.success) {
      if (response.error?.includes('not found')) {
        return null;
      }
      throw new Error(response.error || 'Failed to fetch content');
    }

    return response.data || null;
  }

  async getContentBySlug(slug: string, type?: string): Promise<ContentItem | null> {
    const searchParams = new URLSearchParams();
    if (type) searchParams.set('type', type);

    const queryString = searchParams.toString();
    const endpoint = `/api/content/slug/${slug}${queryString ? `?${queryString}` : ''}`;

    const response = await this.request<ContentItem>(endpoint);

    if (!response.success) {
      if (response.error?.includes('not found')) {
        return null;
      }
      throw new Error(response.error || 'Failed to fetch content');
    }

    return response.data || null;
  }

  async updateContent(id: string, data: UpdateContentItem): Promise<ContentItem> {
    const response = await this.request<ContentItem>(`/api/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update content');
    }

    return response.data;
  }

  async deleteContent(id: string): Promise<boolean> {
    const response = await this.request<void>(`/api/content/${id}`, {
      method: 'DELETE',
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to delete content');
    }

    return true;
  }

  // Convenience methods for specific content types
  async getPages(status: 'published' | 'draft' | 'archived' = 'published'): Promise<ContentItem[]> {
    return this.getAllContent({ type: 'page', status });
  }

  async getPosts(status: 'published' | 'draft' | 'archived' = 'published'): Promise<ContentItem[]> {
    return this.getAllContent({ type: 'post', status });
  }

  async getProjects(status: 'published' | 'draft' | 'archived' = 'published'): Promise<ContentItem[]> {
    return this.getAllContent({ type: 'project', status });
  }

  async getServices(status: 'published' | 'draft' | 'archived' = 'published'): Promise<ContentItem[]> {
    return this.getAllContent({ type: 'service', status });
  }

  async getTeamMembers(status: 'published' | 'draft' | 'archived' = 'published'): Promise<ContentItem[]> {
    return this.getAllContent({ type: 'team-member', status });
  }
}

export const contentService = new ContentServiceClass();