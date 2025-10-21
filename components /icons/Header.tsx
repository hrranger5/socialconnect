import React, { useState } from 'react';
import { useSocial } from '../hooks/useSocialData';
import { CreatePostModal } from './CreatePostModal';
import { PlusSquareIcon } from './icons/Icons';
import type { FeedType } from '../App';

interface HeaderProps {
    onGoHome: () => void;
    currentFeed: FeedType;
    setCurrentFeed: (feed: FeedType) => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, currentFeed, setCurrentFeed }) => {
    const { currentUser } = useSocial();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleTabClick = (feedType: FeedType) => {
        onGoHome(); // Always go home when switching tabs
        setCurrentFeed(feedType);
    };

    return (
        <>
            <header className="bg-white border-b border-slate-200 shrink-0 sticky top-0 z-10">
                <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
                     <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a3.001 3.001 0 015.688 0M12 12a3 3 0 100-6 3 3 0 000 6z"></path></svg>
                        </div>
                        <h1 className="text-xl font-bold text-slate-800 hidden sm:block">SocialConnect</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            <PlusSquareIcon className="w-4 h-4 mr-2 -ml-1" />
                            Create Post
                        </button>
                         {currentUser && (
                            <img
                                className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-blue-500 cursor-pointer"
                                src={currentUser.avatarUrl}
                                alt={currentUser.name}
                                title={currentUser.name}
                            />
                        )}
                    </div>
                </div>
                <nav className="max-w-2xl mx-auto grid grid-cols-2 text-center">
                    <button 
                        onClick={() => handleTabClick('all')}
                        className={`py-3 font-semibold transition-colors ${currentFeed === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}>
                        For You
                    </button>
                    <button 
                        onClick={() => handleTabClick('following')}
                        className={`py-3 font-semibold transition-colors ${currentFeed === 'following' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}>
                        Following
                    </button>
                </nav>
            </header>
            <CreatePostModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </>
    );
};