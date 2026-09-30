'use client';

import React, { useEffect, useState } from 'react';
import { Profile, UserProfile } from '@/types/dating';
import confetti from 'canvas-confetti';
import { sound } from '@/utils/soundEffects';
import { Heart, Send, Sparkles, X } from 'lucide-react';

interface MatchModalProps {
  matchedProfile: Profile;
  userProfile: UserProfile;
  onClose: () => void;
  onSendMessage: (profile: Profile, messageText: string) => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedProfile,
  userProfile,
  onClose,
  onSendMessage,
}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Play celebratory sound
    sound.playMatch();

    // Trigger confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FF4458', '#FF8058', '#FFD166'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#00B4D8', '#2EC4B6', '#FFFFFF'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#FF4458', '#00B4D8'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(matchedProfile, message.trim());
    onClose();
  };

  const icebreakers = [
    `Hey ${matchedProfile.name}! Love your vibe ✨`,
    `We both love ${matchedProfile.interests[0] || 'good coffee'}! What’s your go-to spot?`,
    `Okay, tell me the story behind your prompt answer! 😂`,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#161922] border border-[#2A3040] p-6 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#202430] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-1.5 text-[#FF4458] mb-1">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs uppercase font-extrabold tracking-widest">Chemistry Alert</span>
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white mb-1">
          It’s a Match!
        </h2>
        <p className="text-xs text-[#94A3B8] mb-6">
          You and <span className="text-white font-semibold">{matchedProfile.name}</span> liked each other
        </p>

        {/* Intersecting Avatars */}
        <div className="relative flex items-center justify-center w-full my-3 h-32">
          {/* User Avatar */}
          <div className="absolute left-[20%] w-24 h-24 rounded-full border-4 border-[#0D0F14] overflow-hidden shadow-xl shadow-black/50 z-10 -rotate-6 transform hover:scale-105 transition-transform">
            <img
              src={userProfile.photos[0]}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Heart Emblem */}
          <div className="absolute z-20 w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF4458] to-[#FF8058] flex items-center justify-center shadow-lg shadow-[#FF4458]/40 border-2 border-white animate-heart-burst">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>

          {/* Matched Avatar */}
          <div className="absolute right-[20%] w-24 h-24 rounded-full border-4 border-[#0D0F14] overflow-hidden shadow-xl shadow-black/50 z-10 rotate-6 transform hover:scale-105 transition-transform">
            <img
              src={matchedProfile.photos[0]}
              alt={matchedProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quick Icebreakers */}
        <div className="w-full my-4 flex flex-col gap-2 text-left">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#64748B]">
            Break the ice
          </span>
          <div className="flex flex-col gap-1.5">
            {icebreakers.map((tip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(tip)}
                className="text-xs text-left px-3 py-2 rounded-xl bg-[#202430] hover:bg-[#2A3040] text-white/90 border border-[#2A3040] hover:border-[#FF4458]/40 transition-colors truncate"
              >
                &ldquo;{tip}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="w-full relative mt-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Say something to ${matchedProfile.name}...`}
            className="w-full py-3 pl-4 pr-12 rounded-xl bg-[#0D0F14] border border-[#2A3040] focus:border-[#FF4458] focus:outline-hidden text-sm text-white placeholder-[#64748B] transition-colors"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#FF4458] disabled:opacity-40 text-white flex items-center justify-center hover:bg-[#E03548] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Keep Swiping Button */}
        <button
          onClick={onClose}
          className="mt-4 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors"
        >
          Keep Swiping
        </button>
      </div>
    </div>
  );
};
