export interface ContentItem {
  id: string;
  type: 'page' | 'post' | 'project' | 'service' | 'team-member';
  title: string;
  slug: string;
  content: any;
  metadata?: Record<string, any>;
  status: 'draft' | 'published' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContentItem {
  type: 'page' | 'post' | 'project' | 'service' | 'team-member';
  title: string;
  slug: string;
  content: any;
  metadata?: Record<string, any>;
  status?: 'draft' | 'published' | 'archived';
}

export interface UpdateContentItem {
  type?: 'page' | 'post' | 'project' | 'service' | 'team-member';
  title?: string;
  slug?: string;
  content?: any;
  metadata?: Record<string, any>;
  status?: 'draft' | 'published' | 'archived';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any[];
  count?: number;
  total?: number;
}