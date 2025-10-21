import React from 'react';
import { useSocial } from '../hooks/useSocialData';
import { PostCard } from './PostCard';

interface FeedProps {
  onViewProfile: (userId: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ onViewProfile }) => {
  const { posts } = useSocial();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onViewProfile={onViewProfile} />
        ))}
      </div>
    </div>
  );
};
