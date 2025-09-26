import { useState, useEffect, useCallback } from 'react';
import { contentService } from '../services/contentService';
import { ContentItem, CreateContentItem, UpdateContentItem } from '../types/content';

export interface UseContentOptions {
  type?: string;
  status?: string;
  autoFetch?: boolean;
}

export function useContent(options: UseContentOptions = {}) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await contentService.getAllContent({
        type: options.type,
        status: options.status,
      });
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      console.warn('Mobile content fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [options.type, options.status]);

  const createContent = useCallback(async (data: CreateContentItem): Promise<ContentItem> => {
    setError(null);
    try {
      const newItem = await contentService.createContent(data);
      setContent(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create content';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchContent();
    }
  }, [fetchContent, options.autoFetch]);

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
    createContent,
  };
}

export function useContentItem(id?: string, slug?: string, type?: string) {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    if (!id && !slug) return;

    setLoading(true);
    setError(null);

    try {
      let data: ContentItem | null;
      if (id) {
        data = await contentService.getContentById(id);
      } else if (slug) {
        data = await contentService.getContentBySlug(slug, type);
      } else {
        throw new Error('Either id or slug must be provided');
      }
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      console.warn('Mobile content item fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [id, slug, type]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
  };
}

// Specific hooks for different content types
export function usePages(status: 'published' | 'draft' | 'archived' = 'published') {
  return useContent({ type: 'page', status });
}

export function usePosts(status: 'published' | 'draft' | 'archived' = 'published') {
  return useContent({ type: 'post', status });
}

export function useProjects(status: 'published' | 'draft' | 'archived' = 'published') {
  return useContent({ type: 'project', status });
}

export function useServices(status: 'published' | 'draft' | 'archived' = 'published') {
  return useContent({ type: 'service', status });
}

export function useTeamMembers(status: 'published' | 'draft' | 'archived' = 'published') {
  return useContent({ type: 'team-member', status });
}