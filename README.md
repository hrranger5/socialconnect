# SocialConnect - A Mini Social Media Platform

SocialConnect is a modern, responsive, and lightweight social media application built with React and Tailwind CSS. It provides a simple yet elegant platform for users to share posts, connect with others, and engage with content, featuring a dual-feed system for content discovery.

---

## ✨ Core Features

*   **Dual Feed System:**
    *   **For You Feed:** A global timeline showing all posts from every user, perfect for discovery.
    *   **Following Feed:** A personalized timeline showing posts only from users you follow, creating a curated content experience.
*   **User Profiles:**
    *   Click on any user's name or avatar to view their dedicated profile page.
    *   Profiles display the user's bio, statistics (posts, followers, following), and a grid of all their posts.
*   **Full Post Management:**
    *   **Create Posts:** A simple modal allows users to create and share new posts by providing an image URL and a caption.
    *   **Delete Posts:** Users can delete their own posts from either the main feed or their profile grid, with a confirmation step to prevent accidents.
*   **Interactive Content:**
    *   **Like System:** Like or unlike posts with a single click, with real-time updates to the like count.
    *   **Commenting:** View comments on posts and add your own to join the conversation.
*   **Follow System:**
    *   Easily follow and unfollow other users directly from their profile pages.

## 🚀 Tech Stack

*   **Frontend:** React, TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API (for managing users, posts, and interactions across the application)

## 🛠️ Getting Started

This is a frontend-only application that runs entirely in the browser using mock data. No backend, database setup, or installation is required.

**To run the application:**

Simply open the `index.html` file in a modern web browser. You can also serve the project directory using a simple local server (like the Live Server extension in VS Code).

## 📁 Project Structure

```
/
├── components/           # Reusable UI components
│   ├── ConfirmationModal.tsx
│   ├── CreatePostModal.tsx
│   ├── Feed.tsx
│   ├── Header.tsx
│   ├── PostCard.tsx
│   ├── ProfilePage.tsx
│   └── icons/Icons.tsx
├── hooks/                # Custom React hooks
│   └── useSocialData.tsx   # Main hook for state management
├── types.ts              # TypeScript type definitions
├── constants.ts          # Mock data for users and posts
├── App.tsx               # Main application component with view routing logic
├── index.tsx             # Application entry point
├── index.html            # Main HTML file
└── metadata.json         # Application metadata
```
