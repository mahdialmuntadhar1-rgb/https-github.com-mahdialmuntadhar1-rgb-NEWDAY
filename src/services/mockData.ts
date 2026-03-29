import { Business, Post, Story, Event, Deal, BusinessPostcard, Governorate } from '../types';

const GOVERNORATES: Governorate[] = [
  'Baghdad', 'Erbil', 'Basra', 'Nineveh', 'Duhok', 'Sulaymaniyah', 
  'Kirkuk', 'Diyala', 'Anbar', 'Babil', 'Karbala', 'Najaf', 
  'Qadisiyah', 'Muthanna', 'Dhi Qar', 'Maysan', 'Wasit', 'Salah al-Din'
];

export const mockStories = (gov: Governorate): Story[] => {
  const stories: Story[] = [
    {
      id: `s1-${gov}`,
      userId: 'u1',
      userName: 'Ahmed Al-Iraqi',
      userAvatar: 'https://picsum.photos/seed/ahmed/100',
      image: `https://picsum.photos/seed/${gov}-story1/1080/1920`,
      createdAt: new Date().toISOString(),
      governorate: gov
    },
    {
      id: `s2-${gov}`,
      userId: 'u2',
      userName: 'Sara Baghdad',
      userAvatar: 'https://picsum.photos/seed/sara/100',
      image: `https://picsum.photos/seed/${gov}-story2/1080/1920`,
      createdAt: new Date().toISOString(),
      governorate: gov
    }
  ];

  if (['Baghdad', 'Erbil', 'Basra', 'Nineveh'].includes(gov)) {
    stories.push({
      id: `s3-${gov}`,
      userId: 'u3',
      userName: 'Zaid Al-Hassan',
      userAvatar: 'https://picsum.photos/seed/zaid/100',
      image: `https://picsum.photos/seed/${gov}-story3/1080/1920`,
      createdAt: new Date().toISOString(),
      governorate: gov
    });
  }

  return stories;
};

export const mockPosts = (gov: Governorate): Post[] => [
  {
    id: `p1-${gov}`,
    userId: 'u1',
    userName: 'Ali Hassan',
    userAvatar: 'https://picsum.photos/seed/ali/100',
    content: `Exploring the beautiful streets of ${gov} today! The atmosphere is incredible. #Iraq #Travel`,
    image: `https://picsum.photos/seed/${gov}-post1/800/600`,
    likes: 124,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    governorate: gov
  },
  {
    id: `p2-${gov}`,
    userId: 'u2',
    userName: 'Mona Kareem',
    userAvatar: 'https://picsum.photos/seed/mona/100',
    content: `Just found the best coffee spot in ${gov}. Highly recommend checking it out! #HiddenGem`,
    likes: 89,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    governorate: gov
  },
  {
    id: `p3-${gov}`,
    userId: 'u3',
    userName: 'Omar Al-Faris',
    userAvatar: 'https://picsum.photos/seed/omar/100',
    content: `The sunset over ${gov} is something else. Truly a land of history and beauty.`,
    likes: 256,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    governorate: gov
  }
];

export const mockBusinesses = (gov: Governorate): Business[] => {
  const base: Business[] = [
    {
      id: `b1-${gov}`,
      name: `${gov} Grand Hotel`,
      category: 'Hotels',
      city: gov,
      governorate: gov,
      isVerified: true,
      image: `https://picsum.photos/seed/${gov}-hotel/800/600`,
      description: `The most luxurious stay in ${gov} with stunning views and world-class service.`,
      rating: 4.8,
      featured: true,
      phone: '+964 770 123 4567'
    },
    {
      id: `b2-${gov}`,
      name: 'Tigris Riverside Cafe',
      category: 'Cafes',
      city: gov,
      governorate: gov,
      isVerified: true,
      image: `https://picsum.photos/seed/${gov}-cafe/800/600`,
      description: 'Enjoy traditional Iraqi tea and modern coffee right by the river.',
      rating: 4.5,
      featured: true,
      phone: '+964 780 987 6543'
    }
  ];

  // Add specific businesses for top governorates
  if (gov === 'Baghdad') {
    base.push({
      id: 'b-bag-1',
      name: 'Al-Mansour Mall',
      category: 'Shops',
      city: 'Baghdad',
      governorate: 'Baghdad',
      isVerified: true,
      image: 'https://picsum.photos/seed/mansour-mall/800/600',
      description: 'One of the largest shopping malls in Iraq, featuring international brands.',
      rating: 4.7,
      phone: '+964 790 111 2222'
    });
  } else if (gov === 'Erbil') {
    base.push({
      id: 'b-erb-1',
      name: 'Citadel View Restaurant',
      category: 'Restaurants',
      city: 'Erbil',
      governorate: 'Erbil',
      isVerified: true,
      image: 'https://picsum.photos/seed/citadel-rest/800/600',
      description: 'Dine with a breathtaking view of the historic Erbil Citadel.',
      rating: 4.9,
      phone: '+964 750 333 4444'
    });
  }

  return base;
};

export const mockEvents = (gov: Governorate): Event[] => [
  {
    id: `e1-${gov}`,
    title: `${gov} Cultural Festival`,
    description: 'A celebration of local art, music, and food. Don\'t miss out!',
    date: '2024-05-15',
    location: `${gov} Central Park`,
    governorate: gov,
    image: `https://picsum.photos/seed/${gov}-event1/800/600`,
    attendees: 1250
  },
  {
    id: `e2-${gov}`,
    title: 'Tech Meetup Iraq',
    description: 'Connecting developers and entrepreneurs in the region.',
    date: '2024-06-20',
    location: 'Innovation Hub',
    governorate: gov,
    image: `https://picsum.photos/seed/${gov}-event2/800/600`,
    attendees: 450
  }
];

export const mockDeals = (gov: Governorate): Deal[] => [
  {
    id: `d1-${gov}`,
    title: '20% Off Dinner',
    description: 'Get a discount on your next meal at Al-Zaitoun Restaurant.',
    business: 'Al-Zaitoun Restaurant',
    discount: '20%',
    expiry: '2024-04-30',
    image: `https://picsum.photos/seed/${gov}-deal1/800/600`,
    governorate: gov
  },
  {
    id: `d2-${gov}`,
    title: 'Buy 1 Get 1 Free Coffee',
    description: 'Morning special at Star Cafe. Valid until 11 AM.',
    business: 'Star Cafe',
    discount: 'BOGO',
    expiry: '2024-05-10',
    image: `https://picsum.photos/seed/${gov}-deal2/800/600`,
    governorate: gov
  }
];

export const mockPostcards = (gov: Governorate): BusinessPostcard[] => [
  {
    id: `pc1-${gov}`,
    title: `${gov} Heritage House`,
    description: `A vintage look at the historic landmarks of ${gov}. We preserve the soul of our city.`,
    image: `https://picsum.photos/seed/${gov}-postcard1/800/600`,
    city: gov,
    governorate: gov,
    isVerified: true,
    rating: 4.9
  },
  {
    id: `pc2-${gov}`,
    title: `Modern ${gov} Skyline`,
    description: 'Capturing the vibrant night life and modern architecture. The future is here.',
    image: `https://picsum.photos/seed/${gov}-postcard2/800/600`,
    city: gov,
    governorate: gov,
    isVerified: true,
    rating: 4.7
  }
];
