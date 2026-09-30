'use client';

import React from 'react';
import { Flame, Compass, MessageCircle, User, SlidersHorizontal, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface NavigationProps {
  activeTab: 'swipe' | 'explore' | 'chat' | 'profile';
  setActiveTab: (tab: 'swipe' | 'explore' | 'chat' | 'profile') => void;
  unreadCount: number;
  newMatchesCount: number;
  onOpenFilters: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  unreadCount,
  newMatchesCount,
  onOpenFilters,
  soundEnabled,
  setSoundEnabled,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#0D0F14]/90 backdrop-blur-md border-b border-[#202430] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('swipe')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF4458] to-[#FF8058] flex items-center justify-center shadow-lg shadow-[#FF4458]/20 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Spark
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF4458]"></span>
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              className="p-2.5 rounded-full bg-[#161922] hover:bg-[#202430] text-[#94A3B8] hover:text-white transition-colors border border-[#2A3040]"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Filter settings button */}
            <button
              onClick={onOpenFilters}
              title="Discovery Preferences"
              className="p-2.5 rounded-full bg-[#161922] hover:bg-[#202430] text-[#94A3B8] hover:text-white transition-colors border border-[#2A3040] relative"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Nav Bar (Mobile & Desktop dock) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0D0F14]/95 backdrop-blur-md border-t border-[#202430] py-2 px-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Swipe Tab */}
          <button
            onClick={() => setActiveTab('swipe')}
            className={`flex flex-col items-center gap-1 transition-colors relative py-1 px-3 rounded-lg ${
              activeTab === 'swipe' ? 'text-[#FF4458]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Flame className={`w-6 h-6 ${activeTab === 'swipe' ? 'fill-[#FF4458]' : ''}`} />
            <span className="text-xs font-medium">Discover</span>
          </button>

          {/* Explore Tab */}
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 transition-colors relative py-1 px-3 rounded-lg ${
              activeTab === 'explore' ? 'text-[#00B4D8]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs font-medium">Explore</span>
          </button>

          {/* Chat Tab */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 transition-colors relative py-1 px-3 rounded-lg ${
              activeTab === 'chat' ? 'text-[#2EC4B6]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              {(unreadCount > 0 || newMatchesCount > 0) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4458] text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount + newMatchesCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Matches</span>
          </button>

          {/* Profile Tab */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors relative py-1 px-3 rounded-lg ${
              activeTab === 'profile' ? 'text-white' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};
