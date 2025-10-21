export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followers: string[]; // Array of user IDs
  following: string[]; // Array of user IDs
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl: string;
  timestamp: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
}
