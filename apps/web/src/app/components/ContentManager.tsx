'use client';

import { useState } from 'react';
import { useContent } from '../../lib/hooks/useContent';
import { CreateContentItem, ContentItem } from '../../lib/types/content';

export default function ContentManager() {
  const { content, loading, error, createContent, updateContent, deleteContent, refetch } = useContent({
    autoFetch: true,
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const [formData, setFormData] = useState<Partial<CreateContentItem>>({
    type: 'page',
    title: '',
    slug: '',
    content: {},
    status: 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        await updateContent(editingItem.id, formData);
        setEditingItem(null);
      } else {
        await createContent(formData as CreateContentItem);
        setShowCreateForm(false);
      }

      setFormData({
        type: 'page',
        title: '',
        slug: '',
        content: {},
        status: 'draft',
      });
    } catch (err) {
      console.error('Failed to save content:', err);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      slug: item.slug,
      content: item.content,
      status: item.status,
      metadata: item.metadata,
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteContent(id);
      } catch (err) {
        console.error('Failed to delete content:', err);
      }
    }
  };

  const resetForm = () => {
    setShowCreateForm(false);
    setEditingItem(null);
    setFormData({
      type: 'page',
      title: '',
      slug: '',
      content: {},
      status: 'draft',
    });
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">Loading content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create New Content
        </button>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingItem ? 'Edit Content' : 'Create New Content'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="page">Page</option>
                  <option value="post">Post</option>
                  <option value="project">Project</option>
                  <option value="service">Service</option>
                  <option value="team-member">Team Member</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (JSON)
                </label>
                <textarea
                  value={JSON.stringify(formData.content, null, 2)}
                  onChange={(e) => {
                    try {
                      const content = JSON.parse(e.target.value);
                      setFormData({ ...formData, content });
                    } catch {
                      // Invalid JSON, but let user continue typing
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows={8}
                  placeholder='{"description": "Content goes here"}'
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {content.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No content found. Create your first content item to get started.
          </div>
        ) : (
          content.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{item.type}</span>
                    <span className={`px-2 py-1 rounded ${
                      item.status === 'published' ? 'bg-green-100 text-green-800' :
                      item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-2">Slug: {item.slug}</p>

              {item.updatedAt && (
                <p className="text-xs text-gray-400">
                  Updated: {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}