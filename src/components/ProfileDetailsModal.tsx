'use client';

import React, { useState } from 'react';
import { Profile } from '@/types/dating';
import { 
  X, 
  BadgeCheck, 
  MapPin, 
  Briefcase, 
  Music, 
  Sparkles, 
  Heart, 
  MessageCircle 
} from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface ProfileDetailsModalProps {
  profile: Profile | null;
  onClose: () => void;
  onStartChat?: (profile: Profile) => void;
  onLike?: (profile: Profile) => void;
}

export const ProfileDetailsModal: React.FC<ProfileDetailsModalProps> = ({
  profile,
  onClose,
  onStartChat,
  onLike,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg h-[92vh] max-h-[850px] rounded-3xl bg-[#0D0F14] border border-[#202430] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-white">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Photo Gallery Hero */}
          <div className="relative h-96 w-full">
            <img
              src={profile.photos[photoIndex]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-transparent to-black/30" />

            {/* Dots */}
            {profile.photos.length > 1 && (
              <div className="absolute top-4 left-4 flex gap-1.5 z-20">
                {profile.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === photoIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Basic Info Header Overlay */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-extrabold text-white">
                  {profile.name}, {profile.age}
                </h1>
                {profile.verified && (
                  <BadgeCheck className="w-6 h-6 text-[#00B4D8]" />
                )}
              </div>
              {profile.jobTitle && (
                <p className="text-sm text-white/90 flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-4 h-4 text-[#FF8058]" />
                  {profile.jobTitle}
                </p>
              )}
              <p className="text-xs text-[#94A3B8] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {profile.distanceMiles} miles away • {profile.location}
              </p>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-6">
            {/* Bio */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-2">
                About
              </h3>
              <p className="text-sm text-white/90 leading-relaxed bg-[#161922] p-4 rounded-2xl border border-[#202430]">
                {profile.bio}
              </p>
            </div>

            {/* Spotify Anthem */}
            {profile.anthem && (
              <div className="bg-[#161922] p-4 rounded-2xl border border-[#202430] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1DB954] flex items-center justify-center">
                    <Music className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#94A3B8] block">My Anthem</span>
                    <span className="text-sm font-bold text-white block">{profile.anthem.song}</span>
                    <span className="text-xs text-[#94A3B8]">{profile.anthem.artist}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Prompts */}
            {profile.prompts.map((prompt, idx) => (
              <div
                key={idx}
                className="bg-[#161922] p-4 rounded-2xl border border-[#202430] flex flex-col gap-1.5"
              >
                <span className="text-xs font-semibold text-[#FF8058] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {prompt.question}
                </span>
                <p className="text-sm font-medium text-white/95 leading-relaxed">
                  {prompt.answer}
                </p>
              </div>
            ))}

            {/* Passions */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-2.5">
                Passions
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#202430] text-white border border-[#2A3040]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Lifestyle & Basics */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-2.5">
                Basics
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#161922] p-3 rounded-xl border border-[#202430]">
                  🎯 {profile.relationshipGoal}
                </div>
                {profile.height && (
                  <div className="bg-[#161922] p-3 rounded-xl border border-[#202430]">
                    📏 {profile.height}
                  </div>
                )}
                {profile.zodiac && (
                  <div className="bg-[#161922] p-3 rounded-xl border border-[#202430]">
                    ✨ {profile.zodiac}
                  </div>
                )}
                {profile.pets && (
                  <div className="bg-[#161922] p-3 rounded-xl border border-[#202430]">
                    🐾 {profile.pets}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#202430] bg-[#11141B] flex items-center justify-center gap-4">
          {onLike && (
            <button
              onClick={() => {
                sound.playLike();
                onLike(profile);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF4458] to-[#FF8058] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF4458]/20 hover:opacity-95 transition-opacity"
            >
              <Heart className="w-5 h-5 fill-white" /> Like Profile
            </button>
          )}
          {onStartChat && (
            <button
              onClick={() => {
                onStartChat(profile);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#202430] hover:bg-[#2A3040] text-white font-bold text-sm flex items-center justify-center gap-2 border border-[#2A3040] transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[#2EC4B6]" /> Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
