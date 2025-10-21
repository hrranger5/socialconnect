import React from 'react';
import { useSocial } from '../hooks/useSocialData';
import { PostCard } from './PostCard';
import type { FeedType } from '../App';

interface FeedProps {
  onViewProfile: (userId: string) => void;
  currentFeed: FeedType;
}

export const Feed: React.FC<FeedProps> = ({ onViewProfile, currentFeed }) => {
  const { posts, currentUser } = useSocial();

  const displayedPosts = currentFeed === 'following'
    ? posts.filter(post => currentUser.following.includes(post.userId) || post.userId === currentUser.id)
    : posts;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {displayedPosts.length > 0 ? (
          displayedPosts.map(post => (
            <PostCard key={post.id} post={post} onViewProfile={onViewProfile} />
          ))
        ) : (
          <div className="text-center text-slate-500 pt-16">
            <h3 className="text-xl font-semibold">Welcome to your Following Feed!</h3>
            <p className="mt-2">Posts from people you follow will appear here.</p>
            <p>Start by following some accounts to see their latest updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};