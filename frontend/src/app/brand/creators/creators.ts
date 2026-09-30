export type Creator = {
  id: string;
  displayName: string;
  profileImage: string | null;
  category: string;
  country: string;
  verified: boolean;
  active: boolean;
  creatorTypes: ('Creator' | 'Influencer')[];
  combinedFollowers: number;
  engagementRate: number;
  lastActiveAt: string;
  platforms: { name: string; followers: number }[];
  tags: string[];
};

export const creators: Creator[] = [
  { id: 'amina-k', displayName: 'Amina K.', profileImage: null, category: 'Finance', country: 'Kenya', verified: true, active: true, creatorTypes: ['Creator', 'Influencer'], combinedFollowers: 244000, engagementRate: 5.8, lastActiveAt: '2026-09-28', platforms: [{ name: 'Instagram', followers: 84000 }, { name: 'TikTok', followers: 132000 }, { name: 'YouTube', followers: 28000 }], tags: ['Personal finance', 'Small business'] },
  { id: 'daniel-o', displayName: 'Daniel O.', profileImage: null, category: 'Technology', country: 'Nigeria', verified: true, active: true, creatorTypes: ['Creator'], combinedFollowers: 118000, engagementRate: 6.2, lastActiveAt: '2026-09-27', platforms: [{ name: 'YouTube', followers: 76000 }, { name: 'LinkedIn', followers: 42000 }], tags: ['Product reviews', 'Software'] },
  { id: 'esi-a', displayName: 'Esi A.', profileImage: null, category: 'Education', country: 'Ghana', verified: true, active: true, creatorTypes: ['Creator'], combinedFollowers: 48500, engagementRate: 7.4, lastActiveAt: '2026-09-26', platforms: [{ name: 'YouTube', followers: 31500 }, { name: 'Instagram', followers: 17000 }], tags: ['Learning', 'Careers'] },
  { id: 'zanele-m', displayName: 'Zanele M.', profileImage: null, category: 'Fashion', country: 'South Africa', verified: true, active: true, creatorTypes: ['Influencer'], combinedFollowers: 380000, engagementRate: 4.1, lastActiveAt: '2026-09-25', platforms: [{ name: 'Instagram', followers: 260000 }, { name: 'TikTok', followers: 120000 }], tags: ['Sustainable fashion', 'Design'] },
  { id: 'kwame-b', displayName: 'Kwame B.', profileImage: null, category: 'Music', country: 'Ghana', verified: true, active: false, creatorTypes: ['Creator', 'Influencer'], combinedFollowers: 620000, engagementRate: 3.8, lastActiveAt: '2026-08-10', platforms: [{ name: 'YouTube', followers: 350000 }, { name: 'Instagram', followers: 270000 }], tags: ['Music production', 'Live performance'] },
  { id: 'grace-n', displayName: 'Grace N.', profileImage: null, category: 'Agriculture', country: 'Kenya', verified: true, active: true, creatorTypes: ['Creator'], combinedFollowers: 36000, engagementRate: 8.2, lastActiveAt: '2026-09-24', platforms: [{ name: 'Facebook', followers: 24000 }, { name: 'YouTube', followers: 12000 }], tags: ['Sustainable farming', 'Food systems'] },
  { id: 'neema-j', displayName: 'Neema J.', profileImage: null, category: 'Lifestyle', country: 'Tanzania', verified: false, active: true, creatorTypes: ['Influencer'], combinedFollowers: 97000, engagementRate: 4.9, lastActiveAt: '2026-09-23', platforms: [{ name: 'Instagram', followers: 58000 }, { name: 'TikTok', followers: 39000 }], tags: ['Home', 'Travel'] },
  { id: 'patrick-r', displayName: 'Patrick R.', profileImage: null, category: 'Business', country: 'Rwanda', verified: true, active: false, creatorTypes: ['Creator', 'Influencer'], combinedFollowers: 155000, engagementRate: 5.1, lastActiveAt: '2026-08-20', platforms: [{ name: 'LinkedIn', followers: 93000 }, { name: 'YouTube', followers: 62000 }], tags: ['Entrepreneurship', 'Leadership'] },
];

export const formatFollowerCount = (value: number) => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
