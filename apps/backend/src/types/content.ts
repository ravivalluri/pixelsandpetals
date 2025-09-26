import { z } from 'zod';

export const ContentSchema = z.object({
  id: z.string(),
  type: z.enum(['page', 'post', 'project', 'service', 'team-member']),
  title: z.string(),
  slug: z.string(),
  content: z.any(),
  metadata: z.record(z.any()).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ContentItem = z.infer<typeof ContentSchema>;

export const CreateContentSchema = ContentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateContentItem = z.infer<typeof CreateContentSchema>;

export const UpdateContentSchema = ContentSchema.partial().omit({
  id: true,
  createdAt: true,
});

export type UpdateContentItem = z.infer<typeof UpdateContentSchema>;