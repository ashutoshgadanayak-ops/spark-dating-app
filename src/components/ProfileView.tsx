'use client';

import React, { useState } from 'react';
import { UserProfile, PromptItem } from '@/types/dating';
import { 
  User, 
  Edit3, 
  Check, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  EyeOff, 
  Plus, 
  Trash2,
  Camera,
  Heart
} from 'lucide-react';
import { sound } from '@/utils/soundEffects';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [savedToast, setSavedToast] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
    sound.playLike();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleAddInterest = () => {
    if (!newTagInput.trim()) return;
    if (formData.interests.includes(newTagInput.trim())) return;
    setFormData({
      ...formData,
      interests: [...formData.interests, newTagInput.trim()],
    });
    setNewTagInput('');
  };

  const handleRemoveInterest = (tag: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== tag),
    });
  };

  const handlePromptChange = (idx: number, newAnswer: string) => {
    const nextPrompts = [...formData.prompts];
    nextPrompts[idx] = { ...nextPrompts[idx], answer: newAnswer };
    setFormData({ ...formData, prompts: nextPrompts });
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[calc(100vh-140px)] min-h-[580px] overflow-y-auto px-4 py-2 pb-16">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2EC4B6] text-black font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" /> Profile Updated Successfully!
        </div>
      )}

      {/* Header Profile Summary */}
      <div className="relative mb-6 p-6 rounded-3xl bg-[#161922] border border-[#202430] flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xl">
        {/* Photo Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#FF4458]/40 shadow-lg">
            <img
              src={formData.photos[0]}
              alt={formData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#00B4D8] text-white shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              {formData.name}, {formData.age}
            </h2>
            <button
              onClick={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                isEditing
                  ? 'bg-[#2EC4B6] text-black hover:bg-[#25a89b]'
                  : 'bg-[#202430] text-white hover:bg-[#2A3040] border border-[#2A3040]'
              }`}
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-[#94A3B8] mb-2 flex items-center justify-center sm:justify-start gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#64748B]" /> {formData.location} • {formData.jobTitle}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4458]/10 text-[#FF4458] border border-[#FF4458]/20 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-[#FF4458]" /> 94% Profile Strength
          </div>
        </div>
      </div>

      {/* Main Profile Details or Edit Form */}
      {!isEditing ? (
        /* View Mode */
        <div className="space-y-6">
          {/* Bio Box */}
          <div className="bg-[#161922] p-5 rounded-2xl border border-[#202430]">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-2">
              About Me
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">{formData.bio}</p>
          </div>

          {/* Prompts */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
              Prompts
            </h3>
            {formData.prompts.map((prompt, idx) => (
              <div
                key={idx}
                className="bg-[#161922] p-4 rounded-2xl border border-[#202430] flex flex-col gap-1.5"
              >
                <span className="text-xs font-semibold text-[#FF8058] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {prompt.question}
                </span>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  {prompt.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Interests */}
          <div className="bg-[#161922] p-5 rounded-2xl border border-[#202430]">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-3">
              Passions & Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#202430] text-white border border-[#2A3040]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Photos Grid */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
              Photos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {formData.photos.map((url, i) => (
                <div key={i} className="h-56 rounded-2xl overflow-hidden border border-[#202430]">
                  <img src={url} alt={`Profile photo ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode Form */
        <div className="space-y-6">
          {/* Basic Fields */}
          <div className="bg-[#161922] p-5 rounded-2xl border border-[#202430] space-y-4 text-xs">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
              Basic Info
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#94A3B8] block mb-1">Display Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#202430] border border-[#2A3040] text-white focus:border-[#FF4458] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-[#94A3B8] block mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-[#202430] border border-[#2A3040] text-white focus:border-[#FF4458] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-[#94A3B8] block mb-1">Job Title</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#202430] border border-[#2A3040] text-white focus:border-[#FF4458] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[#94A3B8] block mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#202430] border border-[#2A3040] text-white focus:border-[#FF4458] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[#94A3B8] block mb-1">Bio</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#202430] border border-[#2A3040] text-white focus:border-[#FF4458] focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          {/* Edit Prompts */}
          <div className="bg-[#161922] p-5 rounded-2xl border border-[#202430] space-y-4 text-xs">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
              Edit Prompts
            </h3>
            {formData.prompts.map((prompt, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="font-semibold text-[#FF8058]">{prompt.question}</span>
                <textarea
                  rows={2}
                  value={prompt.answer}
                  onChange={(e) => handlePromptChange(idx, e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#202430] border border-[#2A3040] text-white focus:border-[#FF4458] focus:outline-hidden"
                />
              </div>
            ))}
          </div>

          {/* Edit Interests */}
          <div className="bg-[#161922] p-5 rounded-2xl border border-[#202430] space-y-3 text-xs">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
              Manage Interests
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                placeholder="Add new interest (e.g. Bouldering, Sushi)..."
                className="flex-1 p-2.5 rounded-xl bg-[#202430] border border-[#2A3040] text-white focus:border-[#FF4458] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2.5 rounded-xl bg-[#FF4458] text-white font-bold hover:bg-[#E03548]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.interests.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#202430] text-white border border-[#2A3040]"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(tag)}
                    className="text-[#94A3B8] hover:text-[#FF4D6D]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white bg-[#202430]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-[#2EC4B6] hover:bg-[#25a89b] shadow-lg shadow-[#2EC4B6]/20"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
