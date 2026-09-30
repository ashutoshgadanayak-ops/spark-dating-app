export type Gender = 'woman' | 'man' | 'non-binary';

export interface PromptItem {
  question: string;
  answer: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  verified: boolean;
  distanceMiles: number;
  bio: string;
  photos: string[];
  jobTitle?: string;
  companyOrSchool?: string;
  location: string;
  interests: string[];
  prompts: PromptItem[];
  anthem?: {
    song: string;
    artist: string;
  };
  relationshipGoal: 'Long-term' | 'Short-term fun' | 'Long-term, open to short' | 'New friends' | 'Figuring it out';
  vibes: string[];
  height?: string;
  zodiac?: string;
  drinking?: string;
  smoking?: string;
  pets?: string;
  languages?: string[];
}

export interface Message {
  id: string;
  senderId: string; // 'user' or profile id
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  image?: string;
}

export interface MatchConversation {
  id: string;
  profile: Profile;
  matchedAt: string;
  messages: Message[];
  unread: boolean;
  isTyping?: boolean;
}

export interface FilterSettings {
  genderPreference: 'all' | 'woman' | 'man';
  minAge: number;
  maxAge: number;
  maxDistance: number;
  verifiedOnly: boolean;
  selectedGoal?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  bio: string;
  photos: string[];
  jobTitle: string;
  companyOrSchool: string;
  location: string;
  interests: string[];
  relationshipGoal: Profile['relationshipGoal'];
  prompts: PromptItem[];
}
