import React, { useState } from 'react';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { ProfilePage } from './components/ProfilePage';
import { SocialProvider } from './hooks/useSocialData';

export type FeedType = 'all' | 'following';

function App() {
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [currentFeed, setCurrentFeed] = useState<FeedType>('all');

  const handleViewProfile = (userId: string) => {
    setViewingProfileId(userId);
  };

  const handleGoHome = () => {
    setViewingProfileId(null);
  };

  return (
    <SocialProvider>
      <div className="flex flex-col h-screen font-sans bg-slate-100">
        <Header 
          onGoHome={handleGoHome} 
          currentFeed={currentFeed}
          setCurrentFeed={setCurrentFeed}
        />
        <main className="flex-1 overflow-y-auto">
          {viewingProfileId ? (
            <ProfilePage userId={viewingProfileId} onViewProfile={handleViewProfile} />
          ) : (
            <Feed onViewProfile={handleViewProfile} currentFeed={currentFeed} />
          )}
        </main>
      </div>
    </SocialProvider>
  );
}

export default App;