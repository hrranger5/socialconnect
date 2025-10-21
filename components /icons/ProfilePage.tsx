import React, { useState } from 'react';
import { useSocial } from '../hooks/useSocialData';
import { TrashIcon } from './icons/Icons';
import { ConfirmationModal } from './ConfirmationModal';
import type { Post } from '../types';

interface ProfilePageProps {
  userId: string;
  onViewProfile: (userId: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userId, onViewProfile }) => {
  const { posts, currentUser, findUserById, toggleFollow, deletePost } = useSocial();
  const user = findUserById(userId);
  const userPosts = posts.filter(post => post.userId === userId);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  if (!user) {
    return <div className="text-center p-8">User not found.</div>;
  }
  
  const isFollowing = currentUser.following.includes(user.id);
  const isCurrentUser = currentUser.id === user.id;

  const openDeleteModal = (postId: string) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deletePost(postToDelete);
    }
    setIsDeleteModalOpen(false);
    setPostToDelete(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="flex items-center mb-8">
          <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg" />
          <div className="ml-6 sm:ml-10">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-light text-slate-700">{user.username}</h1>
              {!isCurrentUser && (
                  <button 
                      onClick={() => toggleFollow(user.id)}
                      className={`px-4 py-1.5 text-sm font-semibold rounded-md ${isFollowing ? 'bg-slate-200 text-slate-800' : 'bg-blue-500 text-white'}`}
                  >
                      {isFollowing ? 'Following' : 'Follow'}
                  </button>
              )}
            </div>
            <div className="flex space-x-6 mt-4 text-center">
              <div><span className="font-semibold">{userPosts.length}</span> posts</div>
              <div><span className="font-semibold">{user.followers.length}</span> followers</div>
              <div><span className="font-semibold">{user.following.length}</span> following</div>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-slate-600 text-sm">{user.bio}</p>
            </div>
          </div>
        </header>

        <div className="border-t border-slate-300 pt-4">
          <div className="grid grid-cols-3 gap-1 sm:gap-4">
              {userPosts.map(post => (
                  <div key={post.id} className="relative aspect-square bg-slate-200 group">
                      <img src={post.imageUrl} alt={`Post by ${user.name}`} className="w-full h-full object-cover" />
                      {isCurrentUser && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => openDeleteModal(post.id)}>
                            <button className="text-white p-2">
                                <TrashIcon className="w-7 h-7" />
                            </button>
                        </div>
                      )}
                  </div>
              ))}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to permanently delete this post? This action cannot be undone."
      />
    </>
  );
};