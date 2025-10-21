import React, { useState } from 'react';
import { useSocial } from '../hooks/useSocialData';
import { XIcon } from './icons/Icons';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { addPost } = useSocial();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && imageUrl.trim()) {
      addPost(content, imageUrl);
      setContent('');
      setImageUrl('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold text-slate-800">Create a New Post</h2>
          <button onClick={onClose} className="p-1 text-slate-500 hover:bg-slate-200 rounded-full">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700">Image URL</label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-slate-700">Caption</label>
            <textarea
              id="caption"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a caption..."
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!content.trim() || !imageUrl.trim()}
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};