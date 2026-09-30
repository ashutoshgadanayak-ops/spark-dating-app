import { Profile } from '@/types/dating';

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'p1',
    name: 'Elena Rostova',
    age: 26,
    gender: 'woman',
    verified: true,
    distanceMiles: 3,
    location: 'Brooklyn, NY',
    jobTitle: 'Architect & Ceramics Sculptor',
    companyOrSchool: 'Studio Terra / Columbia GSAPP',
    relationshipGoal: 'Long-term',
    bio: 'Designing sustainable pavilions by day, throwing messy clay on the wheel by night. Looking for someone who gets excited about hidden record bars, farmers markets, and spontaneous road trips with good playlists.',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80'
    ],
    interests: ['Architecture', 'Pottery', 'Film Photography', 'Espresso', 'Indie Rock', 'Hiking'],
    prompts: [
      {
        question: 'A boundary of mine is...',
        answer: 'Never ordering the same entree twice when we can share everything on the table.'
      },
      {
        question: 'The best way to win me over is...',
        answer: 'Surprise me with a fresh almond croissant and show me your favorite city overlook at twilight.'
      },
      {
        question: 'Two truths and a lie...',
        answer: '1. I survived a 10-day silent meditation. 2. I was once an extra in a French film. 3. I have never eaten avocado toast.'
      }
    ],
    anthem: {
      song: 'Chamber of Reflection',
      artist: 'Mac DeMarco'
    },
    vibes: ['Coffee Date', 'Night Owls', 'Creative Minds'],
    height: "5'8\"",
    zodiac: 'Scorpio',
    drinking: 'Socially',
    smoking: 'Never',
    pets: 'Cat person 🐈',
    languages: ['English', 'French', 'Russian']
  },
  {
    id: 'p2',
    name: 'Marcus Chen',
    age: 28,
    gender: 'man',
    verified: true,
    distanceMiles: 5,
    location: 'Manhattan, NY',
    jobTitle: 'Product Designer & Coffee Roaster',
    companyOrSchool: 'Linear / RISD',
    relationshipGoal: 'Long-term, open to short',
    bio: 'Obsessed with tactile hardware, sourdough hydration percentages, and long bike rides through Central Park. Big fan of 35mm cameras and competitive board games.',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80'
    ],
    interests: ['Product Design', 'Cycling', 'Specialty Coffee', 'Typography', 'Catan', 'Bouldering'],
    prompts: [
      {
        question: 'Together, we could...',
        answer: 'Blind taste test 5 different bakeries across the city and rank their pain au chocolat.'
      },
      {
        question: 'My most controversial opinion is...',
        answer: 'Dark roast coffee is just burned beans and you cannot change my mind.'
      }
    ],
    anthem: {
      song: 'Kyoto',
      artist: 'Phoebe Bridgers'
    },
    vibes: ['Coffee Date', 'Outdoor Adventurers', 'Gamers & Geeks'],
    height: "6'1\"",
    zodiac: 'Libra',
    drinking: 'Socially',
    smoking: 'Never',
    pets: 'Golden Retriever dad 🐕',
    languages: ['English', 'Mandarin']
  },
  {
    id: 'p3',
    name: 'Maya Lin',
    age: 25,
    gender: 'woman',
    verified: true,
    distanceMiles: 2,
    location: 'Williamsburg, NY',
    jobTitle: 'DJ & Sound Engineer',
    companyOrSchool: 'Lot Radio / NYU Clive Davis',
    relationshipGoal: 'Short-term fun',
    bio: 'Bumping disco edits and ambient dub. Probably digging through crate bins at Academy Records or perfecting homemade pasta. Teach me your secret karaoke weapon.',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=80'
    ],
    interests: ['Vinyl Records', 'Electronic Music', 'Pasta Making', 'Vintage Fashion', 'Roller Skating'],
    prompts: [
      {
        question: 'My simple pleasures...',
        answer: 'Golden hour rooftop DJ sets when the warm breeze kicks in and nobody is checking their phone.'
      },
      {
        question: 'Dating me is like...',
        answer: 'Unlocking backstage passes, discovering underground ramen spots, and laughing till 3 AM.'
      }
    ],
    anthem: {
      song: 'Music Sounds Better With You',
      artist: 'Stardust'
    },
    vibes: ['Night Owls', 'Creative Minds', 'Foodies & Chefs'],
    height: "5'6\"",
    zodiac: 'Leo',
    drinking: 'Regularly',
    smoking: 'Socially',
    pets: 'Has 2 black cats 🐈‍⬛',
    languages: ['English', 'Japanese']
  },
  {
    id: 'p4',
    name: 'Julian Vance',
    age: 29,
    gender: 'man',
    verified: true,
    distanceMiles: 7,
    location: 'Greenpoint, NY',
    jobTitle: 'Wilderness Guide & Landscape Photographer',
    companyOrSchool: 'National Geographic Contributor',
    relationshipGoal: 'Long-term',
    bio: 'Spent the last month sleeping in a tent under the aurora borealis. Back in the city craving warm soup, good conversation, and someone who loves camping as much as sleeping in on Sundays.',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80'
    ],
    interests: ['Backpacking', 'Astrophotography', 'Trail Running', 'Campfire Cooking', 'Acoustic Guitar'],
    prompts: [
      {
        question: 'I geek out on...',
        answer: 'Identifying constellations and explaining why cedar wood smoke smells like pure comfort.'
      },
      {
        question: 'First round is on me if...',
        answer: 'You can guess which national park has the best sunrise in North America.'
      }
    ],
    anthem: {
      song: 'Holocene',
      artist: 'Bon Iver'
    },
    vibes: ['Outdoor Adventurers', 'Coffee Date', 'Creative Minds'],
    height: "6'2\"",
    zodiac: 'Sagittarius',
    drinking: 'Socially',
    smoking: 'Never',
    pets: 'Border Collie partner 🐕',
    languages: ['English', 'Spanish']
  },
  {
    id: 'p5',
    name: 'Sophia Laurent',
    age: 27,
    gender: 'woman',
    verified: true,
    distanceMiles: 4,
    location: 'SoHo, NY',
    jobTitle: 'Sommelier & Natural Wine Importer',
    companyOrSchool: 'Wine & Spirit Education Trust Level 4',
    relationshipGoal: 'Long-term',
    bio: 'Pouring pét-nats and orange wines from small Slovenian vineyards. Tell me your comfort meal and I will tell you the exact bottle that will change your life.',
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80'
    ],
    interests: ['Natural Wine', 'Tasting Menus', 'Travel', 'Art Galleries', 'Tennis', 'French Cinema'],
    prompts: [
      {
        question: 'The key to my heart is...',
        answer: 'A handwritten letter, a crisp dry Riesling, and laughing at dry British humor.'
      },
      {
        question: 'Sunday routine...',
        answer: 'Espresso in bed, strolling through galleries, followed by a 4-hour simmering cacio e pepe.'
      }
    ],
    anthem: {
      song: 'Midnight City',
      artist: 'M83'
    },
    vibes: ['Foodies & Chefs', 'Night Owls', 'Creative Minds'],
    height: "5'7\"",
    zodiac: 'Taurus',
    drinking: 'Regularly',
    smoking: 'Never',
    pets: 'Loves dogs, allergic to cats',
    languages: ['English', 'French', 'Italian']
  },
  {
    id: 'p6',
    name: 'Tariq Al-Mansoor',
    age: 27,
    gender: 'man',
    verified: true,
    distanceMiles: 6,
    location: 'DUMBO, NY',
    jobTitle: 'Indie Game Developer & Synth Enthusiast',
    companyOrSchool: 'NYU Game Center',
    relationshipGoal: 'Long-term, open to short',
    bio: 'Coding cozy pixel art adventure games and hoarding modular synthesizers. Looking for a co-op partner in life, cooking, and exploring obscure museum exhibits.',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1000&q=80'
    ],
    interests: ['Game Dev', 'Synthesizers', 'Sci-Fi Books', 'Matcha', 'Arcades', 'Anime'],
    prompts: [
      {
        question: 'A shower thought I recently had...',
        answer: 'If video game characters had smart phones, what notification would they stress about most?'
      },
      {
        question: 'We will get along if...',
        answer: 'You have a healthy appreciation for Studio Ghibli sound tracks and late-night noodle runs.'
      }
    ],
    anthem: {
      song: 'Resonance',
      artist: 'HOME'
    },
    vibes: ['Gamers & Geeks', 'Night Owls', 'Coffee Date'],
    height: "5'11\"",
    zodiac: 'Aquarius',
    drinking: 'Rarely',
    smoking: 'Never',
    languages: ['English', 'Arabic']
  }
];

export const VIBE_CATEGORIES = [
  { id: 'all', label: 'All Vibes', icon: '✨', count: 12 },
  { id: 'Coffee Date', label: 'Coffee Date', icon: '☕', count: 6 },
  { id: 'Night Owls', label: 'Night Owls', icon: '🌙', count: 5 },
  { id: 'Foodies & Chefs', label: 'Foodies', icon: '🍜', count: 4 },
  { id: 'Creative Minds', label: 'Creative', icon: '🎨', count: 7 },
  { id: 'Outdoor Adventurers', label: 'Outdoors', icon: '🌲', count: 5 },
  { id: 'Gamers & Geeks', label: 'Gamers', icon: '👾', count: 3 },
];

export const DEFAULT_USER_PROFILE = {
  name: 'Alex Rivera',
  age: 26,
  gender: 'non-binary' as const,
  bio: 'Visual designer & urban cyclist. Curious about everything, fond of cortados, contemporary art, and finding the best taco trucks in town.',
  photos: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80'
  ],
  jobTitle: 'Lead UX Designer',
  companyOrSchool: 'Design Collective NYC',
  location: 'Manhattan, NY',
  interests: ['Design', 'Specialty Coffee', 'Cycling', 'Art Galleries', 'Vinyl Records', 'Tacos'],
  relationshipGoal: 'Long-term' as const,
  prompts: [
    {
      question: 'A random fact I love is...',
      answer: 'Honey never spoils. Archaeologists have found 3,000-year-old pots of honey in Egyptian tombs that are still edible.'
    },
    {
      question: 'My ideal Sunday...',
      answer: 'Morning bike ride along the river, cold brew, sketching in the park, and cooking dinner with friends.'
    }
  ]
};
