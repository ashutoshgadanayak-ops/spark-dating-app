'use client';

import React, { useState } from 'react';
import { FilterSettings } from '@/types/dating';
import { X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterModalProps {
  currentFilters: FilterSettings;
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterSettings) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  currentFilters,
  isOpen,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState<FilterSettings>(currentFilters);

  if (!isOpen) return null;

  const handleReset = () => {
    const defaultFilters: FilterSettings = {
      genderPreference: 'all',
      minAge: 18,
      maxAge: 40,
      maxDistance: 25,
      verifiedOnly: false,
    };
    setFilters(defaultFilters);
  };

  const goals = [
    'Long-term',
    'Long-term, open to short',
    'Short-term fun',
    'New friends',
    'Figuring it out',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#161922] border border-[#2A3040] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#202430]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#FF4458]" />
            <h2 className="font-bold text-base text-white">Discovery Preferences</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#202430] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-white text-sm">
          {/* Interested In */}
          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] block mb-2">
              Show Me
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['all', 'woman', 'man'] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setFilters({ ...filters, genderPreference: gender })}
                  className={`py-2.5 px-3 rounded-xl font-medium text-xs border transition-all ${
                    filters.genderPreference === gender
                      ? 'bg-gradient-to-r from-[#FF4458] to-[#FF8058] text-white border-transparent shadow-md'
                      : 'bg-[#202430] text-[#94A3B8] border-[#2A3040] hover:text-white'
                  }`}
                >
                  {gender === 'all' ? 'Everyone' : gender === 'woman' ? 'Women' : 'Men'}
                </button>
              ))}
            </div>
          </div>

          {/* Maximum Distance Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
                Maximum Distance
              </label>
              <span className="font-bold text-sm text-white">{filters.maxDistance} miles</span>
            </div>
            <input
              type="range"
              min={2}
              max={100}
              step={1}
              value={filters.maxDistance}
              onChange={(e) => setFilters({ ...filters, maxDistance: Number(e.target.value) })}
              className="w-full accent-[#FF4458] h-2 bg-[#202430] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#64748B] mt-1">
              <span>2 mi</span>
              <span>50 mi</span>
              <span>100 mi</span>
            </div>
          </div>

          {/* Age Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-bold tracking-wider text-[#94A3B8]">
                Age Range
              </label>
              <span className="font-bold text-sm text-white">
                {filters.minAge} – {filters.maxAge}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-[#64748B] block mb-1">Min Age</span>
                <input
                  type="number"
                  min={18}
                  max={filters.maxAge - 1}
                  value={filters.minAge}
                  onChange={(e) => setFilters({ ...filters, minAge: Number(e.target.value) })}
                  className="w-full py-2 px-3 rounded-lg bg-[#202430] border border-[#2A3040] text-white text-xs focus:border-[#FF4458] focus:outline-hidden"
                />
              </div>
              <div>
                <span className="text-[11px] text-[#64748B] block mb-1">Max Age</span>
                <input
                  type="number"
                  min={filters.minAge + 1}
                  max={70}
                  value={filters.maxAge}
                  onChange={(e) => setFilters({ ...filters, maxAge: Number(e.target.value) })}
                  className="w-full py-2 px-3 rounded-lg bg-[#202430] border border-[#2A3040] text-white text-xs focus:border-[#FF4458] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Relationship Goals */}
          <div>
            <label className="text-xs uppercase font-bold tracking-wider text-[#94A3B8] block mb-2">
              Relationship Goal
            </label>
            <div className="flex flex-wrap gap-2">
              {goals.map((goal) => {
                const isSelected = filters.selectedGoal === goal;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        selectedGoal: isSelected ? undefined : goal,
                      })
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-[#FF4458] text-white border-transparent'
                        : 'bg-[#202430] text-[#94A3B8] border-[#2A3040] hover:text-white'
                    }`}
                  >
                    {goal}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verified Only Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#202430] border border-[#2A3040]">
            <div>
              <span className="font-semibold text-white text-xs block">Verified Profiles Only</span>
              <span className="text-[11px] text-[#94A3B8]">Show only photo-verified profiles</span>
            </div>
            <button
              type="button"
              onClick={() => setFilters({ ...filters, verifiedOnly: !filters.verifiedOnly })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                filters.verifiedOnly ? 'bg-[#00B4D8]' : 'bg-[#343D4F]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  filters.verifiedOnly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t border-[#202430] flex items-center justify-between gap-3 bg-[#11141B]">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(filters);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF4458] to-[#FF8058] text-white text-xs font-bold shadow-md shadow-[#FF4458]/20 hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
