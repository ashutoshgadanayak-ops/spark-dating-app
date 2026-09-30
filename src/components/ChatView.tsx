'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MatchConversation, Profile, UserProfile } from '@/types/dating';
import { 
  Send, 
  ArrowLeft, 
  CheckCheck, 
  Sparkles, 
  Image as ImageIcon, 
  Mic, 
  Smile, 
  BadgeCheck, 
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';
import { sound } from '@/utils/soundEffects';
import { getSmartAutoReply } from '@/data/initialMatches';

interface ChatViewProps {
  matches: MatchConversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  onSimulateReply: (conversationId: string, replyText: string) => void;
  onViewProfile: (profile: Profile) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  matches,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  onSimulateReply,
  onViewProfile,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = matches.find((m) => m.id === activeConversationId);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const messageText = inputText.trim();
    setInputText('');
    sound.playMessagePop();

    // Send user message
    onSendMessage(activeConversation.id, messageText);

    // Simulate match typing & responding
    setIsTyping(true);
    const delay = 1400 + Math.random() * 1200;

    setTimeout(() => {
      setIsTyping(false);
      const reply = getSmartAutoReply(activeConversation.profile, messageText);
      onSimulateReply(activeConversation.id, reply);
      sound.playMessagePop();
    }, delay);
  };

  const handleSendQuickPrompt = (promptText: string) => {
    setInputText(promptText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[calc(100vh-140px)] min-h-[580px] bg-[#161922] border border-[#202430] rounded-2xl overflow-hidden flex shadow-2xl">
      {/* Left Column: Match List & Conversations */}
      <div
        className={`w-full md:w-80 border-r border-[#202430] flex flex-col bg-[#11141B] ${
          activeConversation ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* New Matches Row */}
        <div className="p-4 border-b border-[#202430]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3 flex items-center justify-between">
            <span>New Matches</span>
            <span className="text-[10px] bg-[#FF4458]/20 text-[#FF4458] px-2 py-0.5 rounded-full font-bold">
              {matches.length}
            </span>
          </h3>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {matches.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#FF4458] via-[#FF8058] to-[#00B4D8] group-hover:scale-105 transition-transform shadow-md">
                    <img
                      src={conv.profile.photos[0]}
                      alt={conv.profile.name}
                      className="w-full h-full rounded-full object-cover border-2 border-[#11141B]"
                    />
                  </div>
                  <span className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-[#2EC4B6] border-2 border-[#11141B] rounded-full" />
                </div>
                <span className="text-xs font-medium text-white truncate max-w-[64px]">
                  {conv.profile.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
              Messages
            </h3>
          </div>

          <div className="flex flex-col divide-y divide-[#202430]/50">
            {matches.map((conv) => {
              const lastMessage = conv.messages[conv.messages.length - 1];
              const isSelected = conv.id === activeConversationId;

              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`flex items-center gap-3.5 p-3.5 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#1E222D]'
                      : 'hover:bg-[#161922]'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.profile.photos[0]}
                      alt={conv.profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#2EC4B6] border-2 border-[#11141B] rounded-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white truncate flex items-center gap-1">
                        {conv.profile.name}
                        {conv.profile.verified && (
                          <BadgeCheck className="w-3.5 h-3.5 text-[#00B4D8]" />
                        )}
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        {lastMessage?.timestamp || conv.matchedAt}
                      </span>
                    </div>

                    <p className={`text-xs truncate ${conv.unread ? 'font-bold text-white' : 'text-[#94A3B8]'}`}>
                      {lastMessage ? (
                        lastMessage.senderId === 'user' ? `You: ${lastMessage.text}` : lastMessage.text
                      ) : (
                        'Matched! Say hello 👋'
                      )}
                    </p>
                  </div>

                  {conv.unread && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4458] flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col bg-[#161922]">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-[#202430] bg-[#161922]/90 backdrop-blur-md flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              {/* Back button for mobile */}
              <button
                onClick={() => onSelectConversation('')}
                className="md:hidden p-1.5 rounded-full bg-[#202430] text-white hover:bg-[#2A3040]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Avatar & Status */}
              <div
                onClick={() => onViewProfile(activeConversation.profile)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={activeConversation.profile.photos[0]}
                    alt={activeConversation.profile.name}
                    className="w-10 h-10 rounded-full object-cover group-hover:ring-2 ring-[#FF4458] transition-all"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2EC4B6] border-2 border-[#161922] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1 group-hover:text-[#FF8058] transition-colors">
                    {activeConversation.profile.name}
                    {activeConversation.profile.verified && (
                      <BadgeCheck className="w-4 h-4 text-[#00B4D8]" />
                    )}
                  </h4>
                  <span className="text-[11px] text-[#2EC4B6]">
                    {isTyping ? 'typing...' : 'Online now'}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Call / Details actions */}
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <button
                onClick={() => onViewProfile(activeConversation.profile)}
                className="px-2.5 py-1 text-xs rounded-lg bg-[#202430] hover:bg-[#2A3040] text-white/90 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {/* Match Date Pill */}
            <div className="flex justify-center my-2">
              <span className="text-[11px] bg-[#202430]/70 text-[#94A3B8] px-3 py-1 rounded-full border border-[#2A3040]">
                Matched {activeConversation.matchedAt}
              </span>
            </div>

            {activeConversation.messages.map((msg) => {
              const isMe = msg.senderId === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-[#FF4458] to-[#FF6B6B] text-white rounded-br-xs shadow-md shadow-[#FF4458]/15'
                        : 'bg-[#202430] text-white/95 rounded-bl-xs border border-[#2A3040]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-[#64748B]">
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#2EC4B6]" />}
                  </div>
                </div>
              );
            })}

            {/* Live Typing Indicator Bubble */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-[#202430] border border-[#2A3040] px-3.5 py-2.5 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:0.18s]" />
                  <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:0.36s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Icebreaker Suggestions bar */}
          <div className="px-4 py-2 border-t border-[#202430]/60 flex items-center gap-2 overflow-x-auto scrollbar-none bg-[#11141B]/40">
            <span className="text-[10px] uppercase font-bold text-[#64748B] flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-[#FF8058]" /> Icebreakers:
            </span>
            <button
              onClick={() => handleSendQuickPrompt('What is your favorite travel memory? ✈️')}
              className="text-xs px-2.5 py-1 rounded-full bg-[#202430] hover:bg-[#2A3040] text-white/80 whitespace-nowrap transition-colors border border-[#2A3040]"
            >
              Favorite travel memory?
            </button>
            <button
              onClick={() => handleSendQuickPrompt('Coffee or cocktails for a first meet? ☕🍸')}
              className="text-xs px-2.5 py-1 rounded-full bg-[#202430] hover:bg-[#2A3040] text-white/80 whitespace-nowrap transition-colors border border-[#2A3040]"
            >
              Coffee or cocktails?
            </button>
            <button
              onClick={() => handleSendQuickPrompt('Tell me one song that defines you right now 🎵')}
              className="text-xs px-2.5 py-1 rounded-full bg-[#202430] hover:bg-[#2A3040] text-white/80 whitespace-nowrap transition-colors border border-[#2A3040]"
            >
              Song that defines you?
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-[#202430] bg-[#11141B] flex items-center gap-2"
          >
            <button
              type="button"
              title="Add photo"
              onClick={() => {
                sound.playLike();
                handleSendQuickPrompt('Check out this view from my hike today! 🌲✨');
              }}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#202430] transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#161922] border border-[#2A3040] focus:border-[#FF4458] focus:outline-hidden text-sm text-white placeholder-[#64748B] transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#FF4458] hover:bg-[#E03548] text-white disabled:opacity-40 transition-colors shadow-md shadow-[#FF4458]/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Empty Conversation State */
        <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 text-center bg-[#161922]">
          <div className="w-16 h-16 rounded-full bg-[#202430] flex items-center justify-center text-[#94A3B8] mb-4">
            <Sparkles className="w-8 h-8 text-[#FF4458]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Select a Conversation</h3>
          <p className="text-xs text-[#94A3B8] max-w-xs">
            Choose from your matches on the left to start chatting, share icebreakers, and plan dates.
          </p>
        </div>
      )}
    </div>
  );
};
