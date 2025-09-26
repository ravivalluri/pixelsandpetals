import express from 'express';
import { contentService } from '../services/contentService';
import { ContentSchema, CreateContentSchema, UpdateContentSchema } from '../types/content';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = CreateContentSchema.parse(req.body);
    const item = await contentService.createContent(data);

    res.status(201).json({
      success: true,
      data: item,
      message: 'Content created successfully',
    });
  } catch (error: any) {
    console.error('Error creating content:', error);

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    if (error.name === 'ConditionalCheckFailedException') {
      return res.status(409).json({
        success: false,
        error: 'Content with this ID already exists',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create content',
      message: error.message,
    });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: 'Items must be an array',
      });
    }

    const validatedItems = items.map(item => CreateContentSchema.parse(item));
    const createdItems = await contentService.bulkCreateContent(validatedItems);

    res.status(201).json({
      success: true,
      data: createdItems,
      message: `${createdItems.length} items created successfully`,
      total: createdItems.length,
    });
  } catch (error: any) {
    console.error('Error creating bulk content:', error);

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create bulk content',
      message: error.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { type, status } = req.query;

    const items = await contentService.getAllContent(
      type as string,
      status as string
    );

    res.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error: any) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch content',
      message: error.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await contentService.getContentById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Content not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    console.error('Error fetching content by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch content',
      message: error.message,
    });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { type } = req.query;

    const item = await contentService.getContentBySlug(slug, type as string);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Content not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error: any) {
    console.error('Error fetching content by slug:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch content',
      message: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = UpdateContentSchema.parse(req.body);

    const item = await contentService.updateContent(id, data);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Content not found',
      });
    }

    res.json({
      success: true,
      data: item,
      message: 'Content updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating content:', error);

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update content',
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await contentService.deleteContent(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Content not found',
      });
    }

    res.json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete content',
      message: error.message,
    });
  }
});

export default router;