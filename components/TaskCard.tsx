import React, { useState } from 'react';
import type { Post } from '../types';
import { useSocial } from '../hooks/useSocialData';
import { HeartIcon, MessageCircleIcon, SendIcon } from './icons/Icons';

interface PostCardProps {
  post: Post;
  onViewProfile: (userId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onViewProfile }) => {
  const { currentUser, findUserById, toggleLike, addComment } = useSocial();
  const [newComment, setNewComment] = useState('');
  
  const author = findUserById(post.userId);
  const hasLiked = post.likes.includes(currentUser.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, newComment);
      setNewComment('');
    }
  };

  const timeAgo = (timestamp: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };


  if (!author) return null;

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => onViewProfile(author.id)}
        />
        <div className="ml-3">
          <p 
            className="font-semibold text-sm text-slate-800 cursor-pointer" 
            onClick={() => onViewProfile(author.id)}
          >
            {author.name}
          </p>
          <p className="text-xs text-slate-500">{timeAgo(post.timestamp)}</p>
        </div>
      </div>

      {/* Post Image */}
      <img src={post.imageUrl} alt="Post content" className="w-full" />

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => toggleLike(post.id)} className="flex items-center space-x-1 text-slate-600 hover:text-red-500 transition-colors">
            <HeartIcon className={`w-6 h-6 ${hasLiked ? 'text-red-500 fill-current' : ''}`} />
            <span className="font-semibold text-sm">{post.likes.length}</span>
          </button>
          <div className="flex items-center space-x-1 text-slate-600">
            <MessageCircleIcon className="w-6 h-6" />
            <span className="font-semibold text-sm">{post.comments.length}</span>
          </div>
        </div>

        {/* Post Caption */}
        <div className="mt-3">
            <p className="text-sm text-slate-800">
                <span 
                    className="font-semibold cursor-pointer"
                    onClick={() => onViewProfile(author.id)}
                >{author.username}</span>
                <span className="ml-2">{post.content}</span>
            </p>
        </div>
      </div>
      
      {/* Comments Section */}
       <div className="px-4 pb-2">
            {post.comments.map((comment, index) => {
                const commentAuthor = findUserById(comment.userId);
                return (
                    <div key={index} className="text-sm mb-1">
                        <p>
                            <span className="font-semibold cursor-pointer" onClick={() => onViewProfile(commentAuthor!.id)}>{commentAuthor?.username}</span>
                            <span className="ml-2 text-slate-700">{comment.text}</span>
                        </p>
                    </div>
                );
            })}
       </div>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="border-t border-slate-200 p-4 flex items-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow bg-transparent text-sm focus:outline-none"
        />
        <button type="submit" className="text-blue-500 font-semibold text-sm hover:text-blue-700 disabled:text-blue-300" disabled={!newComment.trim()}>
            Post
        </button>
      </form>
    </div>
  );
};
