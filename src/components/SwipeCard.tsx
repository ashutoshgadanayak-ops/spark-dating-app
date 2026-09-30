'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Profile } from '@/types/dating';
import { 
  BadgeCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Music, 
  Sparkles,
  Info,
  X,
  Heart,
  Star
} from 'lucide-react';

interface SwipeCardProps {
  profile: Profile;
  isFront: boolean;
  onSwipe: (direction: 'like' | 'nope' | 'superlike') => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
  isFront,
  onSwipe,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showFullBio, setShowFullBio] = useState(false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset photo index when profile changes
  useEffect(() => {
    setCurrentPhotoIndex(0);
    setShowFullBio(false);
    setDragOffset({ x: 0, y: 0 });
  }, [profile.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isFront || showFullBio) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isFront) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !isFront) return;
    setIsDragging(false);

    const threshold = 110;
    const verticalThreshold = -120;

    if (dragOffset.y < verticalThreshold && Math.abs(dragOffset.x) < 80) {
      // Super like
      onSwipe('superlike');
    } else if (dragOffset.x > threshold) {
      // Like
      onSwipe('like');
    } else if (dragOffset.x < -threshold) {
      // Nope
      onSwipe('nope');
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Photo switching
  const handlePhotoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Math.abs(dragOffset.x) > 10 || Math.abs(dragOffset.y) > 10) return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const isLeftSide = clickX < rect.width * 0.35;

    if (isLeftSide) {
      setCurrentPhotoIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentPhotoIndex((prev) => Math.min(profile.photos.length - 1, prev + 1));
    }
  };

  // Card transform calculations
  const rotateDeg = dragOffset.x * 0.06;
  const cardStyle: React.CSSProperties = isFront
    ? {
        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotateDeg}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
        touchAction: 'none',
      }
    : {
        transform: 'scale(0.95) translateY(12px)',
        opacity: 0.85,
        pointerEvents: 'none',
      };

  // Stamp opacities
  const likeOpacity = Math.min(Math.max(dragOffset.x / 80, 0), 1);
  const nopeOpacity = Math.min(Math.max(-dragOffset.x / 80, 0), 1);
  const superLikeOpacity = Math.min(Math.max(-dragOffset.y / 90, 0), 1);

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={cardStyle}
      className={`absolute inset-0 w-full h-full select-none rounded-2xl overflow-hidden bg-[#161922] shadow-2xl border border-[#262C3A] cursor-grab active:cursor-grabbing ${
        !isFront ? 'pointer-events-none' : ''
      }`}
    >
      {/* Background Image */}
      <div 
        onClick={handlePhotoClick}
        className="relative w-full h-full overflow-hidden"
      >
        <img
          src={profile.photos[currentPhotoIndex] || profile.photos[0]}
          alt={profile.name}
          className="w-full h-full object-cover pointer-events-none transition-all duration-300"
          loading="eager"
        />

        {/* Top Story/Photo Bars */}
        <div className="absolute top-2.5 left-3 right-3 flex items-center gap-1.5 z-20">
          {profile.photos.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                idx === currentPhotoIndex
                  ? 'bg-white shadow-sm'
                  : idx < currentPhotoIndex
                  ? 'bg-white/60'
                  : 'bg-black/30 backdrop-blur-xs'
              }`}
            />
          ))}
        </div>

        {/* Gradient shadow overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

        {/* Stamps Overlay */}
        {isFront && (
          <>
            {/* LIKE Stamp */}
            <div
              style={{ opacity: likeOpacity }}
              className="absolute top-10 left-6 z-30 border-4 border-[#2EC4B6] text-[#2EC4B6] font-black text-3xl tracking-wider px-4 py-1 rounded-xl rotate-[-18deg] bg-black/30 backdrop-blur-xs shadow-lg uppercase"
            >
              LIKE
            </div>

            {/* NOPE Stamp */}
            <div
              style={{ opacity: nopeOpacity }}
              className="absolute top-10 right-6 z-30 border-4 border-[#FF4D6D] text-[#FF4D6D] font-black text-3xl tracking-wider px-4 py-1 rounded-xl rotate-[18deg] bg-black/30 backdrop-blur-xs shadow-lg uppercase"
            >
              NOPE
            </div>

            {/* SUPER LIKE Stamp */}
            <div
              style={{ opacity: superLikeOpacity }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-30 border-4 border-[#00B4D8] text-[#00B4D8] font-black text-3xl tracking-wider px-5 py-1.5 rounded-xl bg-black/40 backdrop-blur-xs shadow-lg uppercase flex items-center gap-2"
            >
              <Star className="w-7 h-7 fill-[#00B4D8]" /> SUPER LIKE
            </div>
          </>
        )}

        {/* Bottom Basic Info Card (Collapsed view) */}
        {!showFullBio && (
          <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col gap-2.5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  {profile.name}
                  {profile.verified && (
                    <BadgeCheck className="w-5 h-5 text-[#00B4D8] fill-[#00B4D8]/20" />
                  )}
                </h2>
                <span className="text-xl font-normal text-white/80">{profile.age}</span>
              </div>

              {/* Expand Info Trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullBio(true);
                }}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 text-white shadow-md"
                title="View Full Profile"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            {/* Job & Location */}
            <div className="flex flex-col gap-1 text-sm text-white/90">
              {profile.jobTitle && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF8058]" />
                  <span className="truncate">{profile.jobTitle}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs text-white/70">
                <MapPin className="w-3.5 h-3.5 text-white/60" />
                <span>{profile.distanceMiles} miles away • {profile.location}</span>
              </div>
            </div>

            {/* Relationship goal tag */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/15 backdrop-blur-sm text-white border border-white/10">
                🎯 {profile.relationshipGoal}
              </span>
              {profile.interests.slice(0, 2).map((interest, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white/90 border border-white/10"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Bio Drawer / Modal Overlay */}
      {showFullBio && (
        <div className="absolute inset-0 bg-[#0D0F14] z-40 overflow-y-auto text-white flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Header Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between p-4 bg-[#0D0F14]/90 backdrop-blur-md border-b border-[#202430]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{profile.name}, {profile.age}</span>
              {profile.verified && <BadgeCheck className="w-4 h-4 text-[#00B4D8]" />}
            </div>
            <button
              onClick={() => setShowFullBio(false)}
              className="p-1.5 rounded-full bg-[#161922] hover:bg-[#202430] text-white/80 hover:text-white transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Expanded Content Scrollable Area */}
          <div className="p-5 flex flex-col gap-6 pb-24">
            {/* Primary Bio */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-2">About Me</h3>
              <p className="text-sm text-white/90 leading-relaxed bg-[#161922] p-4 rounded-xl border border-[#202430]">
                {profile.bio}
              </p>
            </div>

            {/* Spotify Anthem */}
            {profile.anthem && (
              <div className="bg-gradient-to-r from-[#1DB954]/20 via-[#161922] to-[#161922] p-3.5 rounded-xl border border-[#1DB954]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1DB954] flex items-center justify-center shadow-md">
                    <Music className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-xs text-[#94A3B8]">My Anthem</div>
                    <div className="text-sm font-bold text-white">{profile.anthem.song}</div>
                    <div className="text-xs text-white/70">{profile.anthem.artist}</div>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1DB954]/20 text-[#1DB954]">
                  Spotify
                </span>
              </div>
            )}

            {/* Prompts & Answers */}
            {profile.prompts.map((prompt, idx) => (
              <div key={idx} className="bg-[#161922] p-4 rounded-xl border border-[#202430] flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#FF8058] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {prompt.question}
                </span>
                <p className="text-sm font-medium text-white/95 leading-relaxed">
                  {prompt.answer}
                </p>
              </div>
            ))}

            {/* Passions & Interests */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-2.5">Passions</h3>
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

            {/* Basics & Lifestyle Badges */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-2.5">Basics</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {profile.relationshipGoal && (
                  <div className="bg-[#161922] p-2.5 rounded-lg border border-[#202430] flex items-center gap-2">
                    <span>🎯</span>
                    <span className="truncate">{profile.relationshipGoal}</span>
                  </div>
                )}
                {profile.height && (
                  <div className="bg-[#161922] p-2.5 rounded-lg border border-[#202430] flex items-center gap-2">
                    <span>📏</span>
                    <span>{profile.height}</span>
                  </div>
                )}
                {profile.zodiac && (
                  <div className="bg-[#161922] p-2.5 rounded-lg border border-[#202430] flex items-center gap-2">
                    <span>✨</span>
                    <span>{profile.zodiac}</span>
                  </div>
                )}
                {profile.drinking && (
                  <div className="bg-[#161922] p-2.5 rounded-lg border border-[#202430] flex items-center gap-2">
                    <span>🍷</span>
                    <span>{profile.drinking}</span>
                  </div>
                )}
                {profile.pets && (
                  <div className="bg-[#161922] p-2.5 rounded-lg border border-[#202430] flex items-center gap-2">
                    <span>🐾</span>
                    <span className="truncate">{profile.pets}</span>
                  </div>
                )}
                {profile.languages && profile.languages.length > 0 && (
                  <div className="bg-[#161922] p-2.5 rounded-lg border border-[#202430] flex items-center gap-2">
                    <span>🗣️</span>
                    <span className="truncate">{profile.languages.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Photos */}
            {profile.photos.slice(1).map((photoUrl, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-[#202430] shadow-md">
                <img src={photoUrl} alt={`${profile.name} photo ${i + 2}`} className="w-full h-80 object-cover" />
              </div>
            ))}
          </div>

          {/* Floating Actions inside expanded sheet */}
          <div className="sticky bottom-0 p-4 bg-gradient-to-t from-[#0D0F14] via-[#0D0F14]/90 to-transparent flex items-center justify-center gap-4 z-40 border-t border-[#202430]/60">
            <button
              onClick={() => {
                setShowFullBio(false);
                onSwipe('nope');
              }}
              className="w-14 h-14 rounded-full bg-[#161922] border border-[#FF4D6D]/40 text-[#FF4D6D] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                setShowFullBio(false);
                onSwipe('superlike');
              }}
              className="w-12 h-12 rounded-full bg-[#161922] border border-[#00B4D8]/40 text-[#00B4D8] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Star className="w-5 h-5 fill-[#00B4D8]" />
            </button>
            <button
              onClick={() => {
                setShowFullBio(false);
                onSwipe('like');
              }}
              className="w-14 h-14 rounded-full bg-[#161922] border border-[#2EC4B6]/40 text-[#2EC4B6] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Heart className="w-6 h-6 fill-[#2EC4B6]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
