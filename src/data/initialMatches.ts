import { MatchConversation, Profile } from '@/types/dating';
import { MOCK_PROFILES } from './mockProfiles';

export const INITIAL_MATCHES: MatchConversation[] = [
  {
    id: 'conv-1',
    profile: MOCK_PROFILES[0], // Elena
    matchedAt: 'Yesterday',
    unread: true,
    messages: [
      {
        id: 'm1',
        senderId: 'p1',
        text: 'Hey Alex! Saw you like cortados and contemporary art. Have you checked out the new sculpture exhibit in Chelsea?',
        timestamp: '9:42 PM',
        status: 'read'
      },
      {
        id: 'm2',
        senderId: 'user',
        text: 'Not yet! But it is on my list. Is that the one with the raw terracotta forms?',
        timestamp: '9:45 PM',
        status: 'read'
      },
      {
        id: 'm3',
        senderId: 'p1',
        text: 'Exactly that one! The lighting in the main gallery at 4 PM is unreal. We should grab espresso and check it out sometime this week ✨',
        timestamp: '9:48 PM',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'conv-2',
    profile: MOCK_PROFILES[1], // Marcus
    matchedAt: '3 days ago',
    unread: false,
    messages: [
      {
        id: 'm2-1',
        senderId: 'user',
        text: 'A fellow sourdough baker! What hydration percentage are you running right now?',
        timestamp: 'Mon 6:15 PM',
        status: 'read'
      },
      {
        id: 'm2-2',
        senderId: 'p2',
        text: 'Haha yes!! Currently pushing 78% with a 20% rye blend. It gets sticky but the crust blistering is worth every minute.',
        timestamp: 'Mon 6:22 PM',
        status: 'read'
      },
      {
        id: 'm2-3',
        senderId: 'p2',
        text: 'What about you? Also please tell me you don’t put your Dutch oven in the dishwasher 😂',
        timestamp: 'Mon 6:23 PM',
        status: 'read'
      }
    ]
  }
];

// Context-aware simulated responses from matches
export function getSmartAutoReply(profile: Profile, userText: string): string {
  const lower = userText.toLowerCase();

  if (lower.includes('coffee') || lower.includes('espresso') || lower.includes('cortado') || lower.includes('latte')) {
    return `You just spoke my love language! Any favorite spots around here or are you more of a home-brewing purist? ☕`;
  }
  if (lower.includes('dinner') || lower.includes('food') || lower.includes('eat') || lower.includes('taco') || lower.includes('pasta')) {
    return `Count me in! What kind of food are we talking? I know an incredible low-key spot with great vibes and even better appetizers.`;
  }
  if (lower.includes('weekend') || lower.includes('friday') || lower.includes('saturday') || lower.includes('sunday')) {
    return `My weekend is looking pretty free! I was actually planning on exploring some new spots. Want to get drinks or coffee? 😊`;
  }
  if (lower.includes('music') || lower.includes('song') || lower.includes('album') || lower.includes('concert')) {
    return `Oh I love this question. Music is huge for me. If you had to pick one album to listen to on repeat for a 10-hour drive, what is it?`;
  }
  if (lower.includes('haha') || lower.includes('lol') || lower.includes('funny') || lower.includes('lmao')) {
    return `Haha glad I could make you smile! What else are you up to today?`;
  }
  if (lower.includes('hi') || lower.includes('hey') || lower.includes('hello')) {
    return `Hey there! Super glad we matched 😊 How is your week going so far?`;
  }
  if (lower.includes('date') || lower.includes('meet') || lower.includes('hangout') || lower.includes('drink')) {
    return `I would love that! How does Thursday or Friday evening work for you? I can send over a fun spot.`;
  }

  const genericPicks = [
    `That is so interesting! Tell me more about that?`,
    `Honestly love that perspective. How long have you been into that?`,
    `Haha you seem like great company. What do you usually do to unwind after work?`,
    `I was just thinking about something similar today! Total coincidence or good algorithm? 😉`,
    `That sounds amazing! We definitely have quite a few things in common.`
  ];

  return genericPicks[Math.floor(Math.random() * genericPicks.length)];
}
