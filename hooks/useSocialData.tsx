import React, { createContext, useContext, useState, useCallback } from 'react';
import { USERS, POSTS } from '../constants';
import type { User, Post, Comment } from '../types';

interface SocialContextType {
  users: User[];
  posts: Post[];
  currentUser: User;
  findUserById: (userId: string) => User | undefined;
  addPost: (content: string, imageUrl: string) => void;
  deletePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  toggleLike: (postId: string) => void;
  toggleFollow: (userId: string) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(USERS);
  const [posts, setPosts] = useState<Post[]>(POSTS.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

  // For simplicity, we'll hardcode the "logged in" user as the first user.
  const currentUser = users[0];

  const findUserById = useCallback((userId: string) => users.find(u => u.id === userId), [users]);

  const addPost = useCallback((content: string, imageUrl: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      content,
      imageUrl,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);

  const deletePost = useCallback((postId: string) => {
    // Add a confirmation dialog for safety
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }, []);

  const addComment = useCallback((postId: string, text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
    };
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] } 
        : post
    ));
  }, [currentUser]);

  const toggleLike = useCallback((postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(currentUser.id);
        const newLikes = hasLiked
          ? post.likes.filter(userId => userId !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes: newLikes };
      }
      return post;
    }));
  }, [currentUser]);

  const toggleFollow = useCallback((userIdToFollow: string) => {
    setUsers(prevUsers => {
      // Don't allow following oneself
      if (currentUser.id === userIdToFollow) return prevUsers;

      return prevUsers.map(user => {
        // Update the user being followed/unfollowed
        if (user.id === userIdToFollow) {
          const isFollowing = user.followers.includes(currentUser.id);
          const newFollowers = isFollowing
            ? user.followers.filter(id => id !== currentUser.id)
            : [...user.followers, currentUser.id];
          return { ...user, followers: newFollowers };
        }
        // Update the current user's "following" list
        if (user.id === currentUser.id) {
          const isFollowing = user.following.includes(userIdToFollow);
          const newFollowing = isFollowing
            ? user.following.filter(id => id !== userIdToFollow)
            : [...user.following, userIdToFollow];
          return { ...user, following: newFollowing };
        }
        return user;
      });
    });
  }, [currentUser]);

  return (
    <SocialContext.Provider value={{ users, posts, currentUser, findUserById, addPost, deletePost, addComment, toggleLike, toggleFollow }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = (): SocialContextType => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};