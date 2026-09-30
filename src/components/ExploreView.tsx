'use client';

import React, { useState } from 'react';
import { Profile } from '@/types/dating';
import { VIBE_CATEGORIES } from '@/data/mockProfiles';
import { MapPin, Heart, BadgeCheck, Sparkles } from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface ExploreViewProps {
  profiles: Profile[];
  onSelectProfile: (profile: Profile) => void;
  onLikeProfile: (profile: Profile) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  profiles,
  onSelectProfile,
  onLikeProfile,
}) => {
  const [selectedVibe, setSelectedVibe] = useState('all');

  const filteredProfiles = profiles.filter((p) => {
    if (selectedVibe === 'all') return true;
    return p.vibes.includes(selectedVibe);
  });

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-140px)] min-h-[580px] overflow-y-auto px-4 py-2">
      {/* Hero Banner */}
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-[#161922] via-[#202430] to-[#161922] border border-[#2A3040] shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00B4D8] mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Curated Vibes
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">
            Discover by Energy
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Looking for someone who matches your weekend plans? Browse curated groups or jump into a vibe.
          </p>
        </div>
      </div>

      {/* Vibe Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        {VIBE_CATEGORIES.map((cat) => {
          const isSelected = selectedVibe === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedVibe(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#FF4458] to-[#FF8058] text-white border-transparent shadow-lg shadow-[#FF4458]/20 scale-105'
                  : 'bg-[#161922] text-[#94A3B8] hover:text-white border-[#2A3040] hover:bg-[#202430]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => onSelectProfile(profile)}
            className="group relative h-96 rounded-2xl overflow-hidden bg-[#161922] border border-[#202430] cursor-pointer shadow-lg hover:border-[#FF4458]/40 hover:-translate-y-1 transition-all"
          >
            {/* Background Image */}
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Top Vibe Badge */}
            <div className="absolute top-3 left-3 z-10 flex gap-1.5 flex-wrap">
              {profile.vibes.slice(0, 2).map((vibe, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/50 backdrop-blur-md text-white border border-white/10"
                >
                  {vibe}
                </span>
              ))}
            </div>

            {/* Like Button Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playLike();
                onLikeProfile(profile);
              }}
              title="Like"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-[#FF4458] backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white" />
            </button>

            {/* Bottom Profile Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-bold text-lg text-white">
                  {profile.name}, {profile.age}
                </h3>
                {profile.verified && (
                  <BadgeCheck className="w-4 h-4 text-[#00B4D8]" />
                )}
              </div>

              {profile.jobTitle && (
                <p className="text-xs text-white/80 truncate mb-1">
                  {profile.jobTitle}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-2 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {profile.distanceMiles} miles away
                </span>
                <span className="text-[11px] text-[#FF8058] font-semibold">
                  Tap for bio →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
