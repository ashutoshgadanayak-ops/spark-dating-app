'use client';

import React, { useState, useMemo } from 'react';
import { 
  Profile, 
  MatchConversation, 
  FilterSettings, 
  UserProfile 
} from '@/types/dating';
import { MOCK_PROFILES, DEFAULT_USER_PROFILE } from '@/data/mockProfiles';
import { INITIAL_MATCHES } from '@/data/initialMatches';
import { Navigation } from '@/components/Navigation';
import { SwipeDeck } from '@/components/SwipeDeck';
import { ExploreView } from '@/components/ExploreView';
import { ChatView } from '@/components/ChatView';
import { ProfileView } from '@/components/ProfileView';
import { MatchModal } from '@/components/MatchModal';
import { FilterModal } from '@/components/FilterModal';
import { ProfileDetailsModal } from '@/components/ProfileDetailsModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'swipe' | 'explore' | 'chat' | 'profile'>('swipe');
  const [allProfiles, setAllProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [matches, setMatches] = useState<MatchConversation[]>(INITIAL_MATCHES);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [newMatchProfile, setNewMatchProfile] = useState<Profile | null>(null);
  const [inspectProfile, setInspectProfile] = useState<Profile | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [deckKey, setDeckKey] = useState(0); // To trigger deck reset

  const [filters, setFilters] = useState<FilterSettings>({
    genderPreference: 'all',
    minAge: 18,
    maxAge: 40,
    maxDistance: 35,
    verifiedOnly: false,
  });

  // Filtered profiles for discovery deck
  const filteredProfiles = useMemo(() => {
    return allProfiles.filter((p) => {
      if (filters.genderPreference !== 'all' && p.gender !== filters.genderPreference) {
        return false;
      }
      if (p.age < filters.minAge || p.age > filters.maxAge) {
        return false;
      }
      if (p.distanceMiles > filters.maxDistance) {
        return false;
      }
      if (filters.verifiedOnly && !p.verified) {
        return false;
      }
      if (filters.selectedGoal && p.relationshipGoal !== filters.selectedGoal) {
        return false;
      }
      return true;
    });
  }, [allProfiles, filters]);

  // Handle a new match triggered from swiping
  const handleMatch = (profile: Profile) => {
    // Check if match already exists
    const existing = matches.find((m) => m.profile.id === profile.id);
    if (!existing) {
      const newConv: MatchConversation = {
        id: `conv-${Date.now()}`,
        profile,
        matchedAt: 'Just now',
        unread: true,
        messages: [
          {
            id: `init-${Date.now()}`,
            senderId: profile.id,
            text: `Hey Alex! Glad we both swiped right ✨ How's your day going?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'delivered',
          },
        ],
      };
      setMatches((prev) => [newConv, ...prev]);
    }
    setNewMatchProfile(profile);
  };

  // Handle direct send message from Match Modal
  const handleModalSendMessage = (profile: Profile, messageText: string) => {
    let targetConv = matches.find((m) => m.profile.id === profile.id);

    if (!targetConv) {
      targetConv = {
        id: `conv-${Date.now()}`,
        profile,
        matchedAt: 'Just now',
        unread: false,
        messages: [],
      };
      setMatches((prev) => [targetConv!, ...prev]);
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const,
    };

    setMatches((prev) =>
      prev.map((c) =>
        c.id === targetConv!.id
          ? { ...c, messages: [...c.messages, newMsg], unread: false }
          : c
      )
    );

    setActiveConversationId(targetConv.id);
    setActiveTab('chat');
  };

  // Chat message sending
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg = {
      id: `user-msg-${Date.now()}`,
      senderId: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const,
    };

    setMatches((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );
  };

  // Chat auto-reply simulation
  const handleSimulateReply = (conversationId: string, replyText: string) => {
    const conv = matches.find((c) => c.id === conversationId);
    if (!conv) return;

    const replyMsg = {
      id: `reply-${Date.now()}`,
      senderId: conv.profile.id,
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered' as const,
    };

    setMatches((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, replyMsg],
            unread: activeConversationId !== conversationId,
          };
        }
        return c;
      })
    );
  };

  // Start chat with a profile from Explore or details modal
  const handleStartChatWithProfile = (profile: Profile) => {
    let existing = matches.find((m) => m.profile.id === profile.id);
    if (!existing) {
      existing = {
        id: `conv-${Date.now()}`,
        profile,
        matchedAt: 'Just now',
        unread: false,
        messages: [
          {
            id: `greeting-${Date.now()}`,
            senderId: profile.id,
            text: `Hey Alex! Loved your profile! What kind of coffee are we grabbing? ☕`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read',
          },
        ],
      };
      setMatches((prev) => [existing!, ...prev]);
    }
    setActiveConversationId(existing.id);
    setActiveTab('chat');
  };

  const handleResetDeck = () => {
    setDeckKey((prev) => prev + 1);
  };

  const unreadCount = matches.filter((m) => m.unread).length;

  return (
    <main className="min-h-screen bg-[#0D0F14] text-white flex flex-col selection:bg-[#FF4458] selection:text-white">
      {/* Top Header & Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={unreadCount}
        newMatchesCount={0}
        onOpenFilters={() => setIsFilterModalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Tab Screens */}
      <div className="flex-1 w-full pb-16 pt-2">
        {activeTab === 'swipe' && (
          <SwipeDeck
            key={deckKey}
            profiles={filteredProfiles}
            onMatch={handleMatch}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            onResetDeck={handleResetDeck}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreView
            profiles={allProfiles}
            onSelectProfile={(profile) => setInspectProfile(profile)}
            onLikeProfile={(profile) => handleMatch(profile)}
          />
        )}

        {activeTab === 'chat' && (
          <div className="px-3">
            <ChatView
              matches={matches}
              activeConversationId={activeConversationId}
              onSelectConversation={(id) => {
                setActiveConversationId(id);
                // Mark conversation as read
                setMatches((prev) =>
                  prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
                );
              }}
              onSendMessage={handleSendMessage}
              onSimulateReply={handleSimulateReply}
              onViewProfile={(profile) => setInspectProfile(profile)}
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={(updated) => setUserProfile(updated)}
          />
        )}
      </div>

      {/* Modals */}
      {newMatchProfile && (
        <MatchModal
          matchedProfile={newMatchProfile}
          userProfile={userProfile}
          onClose={() => setNewMatchProfile(null)}
          onSendMessage={handleModalSendMessage}
        />
      )}

      {inspectProfile && (
        <ProfileDetailsModal
          profile={inspectProfile}
          onClose={() => setInspectProfile(null)}
          onStartChat={handleStartChatWithProfile}
          onLike={(profile) => handleMatch(profile)}
        />
      )}

      <FilterModal
        isOpen={isFilterModalOpen}
        currentFilters={filters}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(newFilters) => setFilters(newFilters)}
      />
    </main>
  );
}
