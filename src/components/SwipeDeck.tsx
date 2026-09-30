'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Profile } from '@/types/dating';
import { SwipeCard } from './SwipeCard';
import { RotateCcw, X, Star, Heart, Zap, Sparkles, SlidersHorizontal } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface SwipeDeckProps {
  profiles: Profile[];
  onMatch: (profile: Profile) => void;
  onOpenFilters: () => void;
  onResetDeck: () => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  profiles,
  onMatch,
  onOpenFilters,
  onResetDeck,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<Profile[]>([]);
  const [boostActive, setBoostActive] = useState(false);
  const [boostTimer, setBoostTimer] = useState<number | null>(null);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const handleSwipe = useCallback(
    (direction: 'like' | 'nope' | 'superlike') => {
      if (!currentProfile) return;

      // Audio cue
      if (direction === 'like') sound.playLike();
      else if (direction === 'nope') sound.playNope();
      else if (direction === 'superlike') sound.playSuperLike();

      // Record history for rewind
      setHistory((prev) => [...prev, currentProfile]);

      // Trigger match check (e.g. 60% chance or if superlike)
      if (direction === 'like' || direction === 'superlike') {
        const isMatch = direction === 'superlike' || Math.random() < 0.65;
        if (isMatch) {
          setTimeout(() => {
            onMatch(currentProfile);
          }, 350);
        }
      }

      setCurrentIndex((prev) => prev + 1);
    },
    [currentProfile, onMatch]
  );

  const handleRewind = () => {
    if (history.length === 0 || currentIndex === 0) return;
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    sound.playLike();
  };

  const handleBoost = () => {
    if (boostActive) return;
    sound.playSuperLike();
    setBoostActive(true);
    setBoostTimer(30);

    const interval = setInterval(() => {
      setBoostTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setBoostActive(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSwipe('nope');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSwipe('like');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleSwipe('superlike');
      } else if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        handleRewind();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwipe, history.length, currentIndex]);

  const isDeckFinished = currentIndex >= profiles.length;

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center h-[calc(100vh-140px)] min-h-[580px] max-h-[720px] px-3 pt-2">
      {/* Boost Active Banner */}
      {boostActive && (
        <div className="w-full mb-2 bg-gradient-to-r from-[#A06CD5] to-[#FF4458] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center justify-between shadow-lg shadow-purple-500/20 animate-pulse">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-white" /> Profile Boosted! 10x More Views
          </span>
          <span className="bg-black/20 px-2 py-0.5 rounded-full">{boostTimer}s</span>
        </div>
      )}

      {/* Card Stack Viewport */}
      <div className="relative w-full flex-1">
        {!isDeckFinished ? (
          <>
            {/* Background Preview Card (for 3D depth effect) */}
            {nextProfile && (
              <SwipeCard
                key={nextProfile.id}
                profile={nextProfile}
                isFront={false}
                onSwipe={handleSwipe}
              />
            )}

            {/* Foreground Active Card */}
            {currentProfile && (
              <SwipeCard
                key={currentProfile.id}
                profile={currentProfile}
                isFront={true}
                onSwipe={handleSwipe}
              />
            )}
          </>
        ) : (
          /* Empty Deck State */
          <div className="w-full h-full rounded-2xl bg-[#161922] border border-[#202430] flex flex-col items-center justify-center p-6 text-center shadow-xl">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-[#FF4458]/10 border border-[#FF4458]/30 flex items-center justify-center animate-ping" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF4458] to-[#FF8058] flex items-center justify-center text-white shadow-xl shadow-[#FF4458]/30">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">You’re All Caught Up!</h3>
            <p className="text-sm text-[#94A3B8] max-w-xs mb-6">
              There are no new profiles right now. Expand your discovery preferences or review everyone again.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <button
                onClick={onResetDeck}
                className="flex-1 py-3 px-4 rounded-xl bg-[#202430] hover:bg-[#2A3040] text-white font-medium text-sm transition-all border border-[#343D4F] flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-[#FF4458]" /> Reset Deck
              </button>
              <button
                onClick={onOpenFilters}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF4458] to-[#FF8058] hover:opacity-95 text-white font-semibold text-sm transition-all shadow-lg shadow-[#FF4458]/20 flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Control Buttons */}
      {!isDeckFinished && (
        <div className="w-full pt-3 pb-1 flex items-center justify-center gap-3 sm:gap-4 z-20">
          {/* Rewind */}
          <button
            onClick={handleRewind}
            disabled={history.length === 0}
            title="Rewind (Z)"
            className={`w-11 h-11 rounded-full bg-[#161922] border border-[#2A3040] flex items-center justify-center transition-all ${
              history.length === 0
                ? 'opacity-40 cursor-not-allowed text-[#64748B]'
                : 'text-[#E0A96D] hover:border-[#E0A96D]/50 hover:scale-110 active:scale-95 shadow-md'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Nope (Pass) */}
          <button
            onClick={() => handleSwipe('nope')}
            title="Pass (Left Arrow)"
            className="w-14 h-14 rounded-full bg-[#161922] border border-[#FF4D6D]/40 text-[#FF4D6D] flex items-center justify-center shadow-lg shadow-[#FF4D6D]/10 hover:border-[#FF4D6D] hover:scale-110 active:scale-95 transition-all"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Super Like */}
          <button
            onClick={() => handleSwipe('superlike')}
            title="Super Like (Up Arrow)"
            className="w-12 h-12 rounded-full bg-[#161922] border border-[#00B4D8]/40 text-[#00B4D8] flex items-center justify-center shadow-lg shadow-[#00B4D8]/10 hover:border-[#00B4D8] hover:scale-110 active:scale-95 transition-all"
          >
            <Star className="w-6 h-6 fill-[#00B4D8]" />
          </button>

          {/* Like */}
          <button
            onClick={() => handleSwipe('like')}
            title="Like (Right Arrow)"
            className="w-14 h-14 rounded-full bg-[#161922] border border-[#2EC4B6]/40 text-[#2EC4B6] flex items-center justify-center shadow-lg shadow-[#2EC4B6]/10 hover:border-[#2EC4B6] hover:scale-110 active:scale-95 transition-all"
          >
            <Heart className="w-7 h-7 fill-[#2EC4B6]" />
          </button>

          {/* Boost */}
          <button
            onClick={handleBoost}
            title="Boost Profile"
            className={`w-11 h-11 rounded-full bg-[#161922] border border-[#2A3040] flex items-center justify-center transition-all ${
              boostActive
                ? 'bg-[#A06CD5] text-white border-[#A06CD5] animate-pulse'
                : 'text-[#A06CD5] hover:border-[#A06CD5]/50 hover:scale-110 active:scale-95 shadow-md'
            }`}
          >
            <Zap className="w-5 h-5 fill-current" />
          </button>
        </div>
      )}

      {/* Keyboard Shortcut Hints for Desktop */}
      <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#64748B] pt-1">
        <span>← Pass</span>
        <span>↑ Super Like</span>
        <span>→ Like</span>
        <span>Z Rewind</span>
      </div>
    </div>
  );
};
