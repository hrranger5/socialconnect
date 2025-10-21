import type { User, Post } from './types';

export const USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alex Reid',
    username: 'alexr',
    avatarUrl: 'https://picsum.photos/seed/alex/200/200',
    bio: 'Photographer & Explorer. Capturing moments one click at a time.',
    followers: ['user-2', 'user-4'],
    following: ['user-2', 'user-3'],
  },
  {
    id: 'user-2',
    name: 'Casey Jordan',
    username: 'caseyj',
    avatarUrl: 'https://picsum.photos/seed/casey/200/200',
    bio: 'Chef, foodie, and recipe developer. Life is short, make it delicious.',
    followers: ['user-1', 'user-3', 'user-4'],
    following: ['user-1', 'user-4'],
  },
  {
    id: 'user-3',
    name: 'Morgan Lee',
    username: 'morganl',
    avatarUrl: 'https://picsum.photos/seed/morgan/200/200',
    bio: 'Developer and tech enthusiast. Building the future with code.',
    followers: ['user-1'],
    following: ['user-1', 'user-4'],
  },
  {
    id: 'user-4',
    name: 'Taylor Quinn',
    username: 'taylorq',
    avatarUrl: 'https://picsum.photos/seed/taylor/200/200',
    bio: 'Musician and artist. Creating sounds and visuals.',
    followers: ['user-2', 'user-3'],
    following: ['user-2'],
  },
];

export const POSTS: Post[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    content: 'Chasing the golden hour in the mountains. Absolutely breathtaking view!',
    imageUrl: 'https://picsum.photos/seed/mountains/600/400',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    likes: ['user-2', 'user-3', 'user-4'],
    comments: [
      { id: 'comment-1', userId: 'user-2', text: 'Wow, incredible shot!', timestamp: new Date(Date.now() - 86400000 * 2 + 10000).toISOString() },
      { id: 'comment-2', userId: 'user-4', text: 'Looks so peaceful. Wish I was there!', timestamp: new Date(Date.now() - 86400000 * 2 + 20000).toISOString() },
    ],
  },
  {
    id: 'post-2',
    userId: 'user-2',
    content: 'Perfecting my sourdough recipe. The crust on this one is just right. 🍞',
    imageUrl: 'https://picsum.photos/seed/bread/600/400',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: ['user-1', 'user-4'],
    comments: [
       { id: 'comment-3', userId: 'user-1', text: 'That looks delicious! Recipe please!', timestamp: new Date(Date.now() - 86400000 + 10000).toISOString() },
    ],
  },
  {
    id: 'post-3',
    userId: 'user-3',
    content: 'After weeks of work, my new coding setup is finally complete. Ready for some serious productivity.',
    imageUrl: 'https://picsum.photos/seed/desk/600/400',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    likes: ['user-1', 'user-2', 'user-4'],
    comments: [],
  },
    {
    id: 'post-4',
    userId: 'user-1',
    content: 'Morning coffee with a view. The best way to start the day.',
    imageUrl: 'https://picsum.photos/seed/coffee/600/400',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    likes: ['user-3'],
    comments: [],
  },
];
