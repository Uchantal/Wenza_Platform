export const creator = {
  id: 'amina-k',
  displayName: 'Amina',
  country: 'Kenya',
  category: 'Finance',
  profileCompletion: 75,
  contactComplete: true,
  verificationStatus: 'Pending',
  mediaKitComplete: true,
  payoutConfigured: false,
  activeApplications: 4,
  availableEarnings: 45000,
  profileViews: 128,
};

export const opportunities = [
  { id: 'nova-awareness', brand: 'Nova Telecom', initials: 'NT', title: 'Digital Awareness Campaign', category: 'Technology', location: 'Kenya', budget: 80000, deadline: '2026-10-15', type: 'Sponsored content' },
  { id: 'imara-learning', brand: 'Imara Learning', initials: 'IL', title: 'Career Skills Series', category: 'Education', location: 'Remote · East Africa', budget: 60000, deadline: '2026-10-18', type: 'Content production' },
  { id: 'kijani-growers', brand: 'Kijani Growers', initials: 'KG', title: 'Smallholder Stories', category: 'Agriculture', location: 'Kenya', budget: 55000, deadline: '2026-10-22', type: 'Brand partnership' },
];

export const brands = [
  { id: 'nova-telecom', name: 'Nova Telecom', initials: 'NT', industry: 'Telecommunications', verified: true, activeOpportunities: 3 },
  { id: 'imara-learning', name: 'Imara Learning', initials: 'IL', industry: 'Education', verified: true, activeOpportunities: 2 },
  { id: 'kijani-growers', name: 'Kijani Growers', initials: 'KG', industry: 'Agriculture', verified: true, activeOpportunities: 2 },
];

export const applications = [
  { id: 'financial-education', title: 'Financial Education Series', brand: 'Horizon Finance', status: 'Shortlisted' },
  { id: 'product-launch', title: 'Product Launch Campaign', brand: 'Nova Telecom', status: 'Applied' },
  { id: 'career-series', title: 'Career Stories', brand: 'Imara Learning', status: 'Applied' },
  { id: 'growing-business', title: 'Growing a Business', brand: 'Kijani Growers', status: 'Shortlisted' },
];

export const campaigns = [
  { id: 'product-awareness', title: 'Product Awareness Campaign', brand: 'Nova Telecom', status: 'In progress', nextDeliverable: 'Video draft', deadline: '2026-10-12' },
  { id: 'money-basics', title: 'Money Basics Series', brand: 'Horizon Finance', status: 'Awaiting approval', nextDeliverable: 'Final captions', deadline: '2026-10-14' },
];

export const socialAccounts = [
  { platform: 'Instagram', connected: true },
  { platform: 'TikTok', connected: true },
  { platform: 'YouTube', connected: true },
  { platform: 'Facebook', connected: false },
];

export const activities = [
  { id: 'shortlisted', text: 'Horizon Finance shortlisted your application.', date: '2026-09-28' },
  { id: 'invite', text: 'Nova Telecom invited you to a campaign.', date: '2026-09-28' },
  { id: 'metrics', text: 'Your Instagram metrics were refreshed.', date: '2026-09-27' },
  { id: 'media-kit', text: 'A brand viewed your media kit.', date: '2026-09-27' },
  { id: 'payment', text: 'Your campaign payment became available.', date: '2026-09-26' },
];

export function formatMoney(amount: number) {
  return `KES ${new Intl.NumberFormat('en-KE').format(amount)}`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
