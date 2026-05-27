import { EventConfig } from '../types';
import { defaultTheme } from './theme';

export const eventConfig: EventConfig = {
  id: 'prawaas-5',
  name: 'Prawaas 5.0',
  tagline: 'Towards Safe, Smart & Sustainable Public Transport',
  description:
    'India\'s flagship multimodal transport show bringing stakeholders together to expand services, modernise infrastructure, and enable inclusive access through a truly multimodal approach integrating buses, metro, taxis, and last-mile solutions.',
  startDate: '2026-07-09',
  endDate: '2026-07-11',
  venue: {
    name: 'Helipad Exhibition Centre (HEC)',
    address: 'Swarnim Park, Sector 17',
    city: 'Gandhinagar',
    state: 'Gujarat',
    country: 'India',
    pincode: '382010',
    mapUrl: 'https://maps.app.goo.gl/eXpHnFhYEz44VSaB6',
  },
  organizer: 'Bus and Car Operators Confederation of India (BOCI)',
  logo: 'https://prawaas.com/assets/img/logo.png',
  bannerImages: [
    'https://prawaas.com/assets/img/banner/prawaas-banner.jpg',
  ],
  socialLinks: {
    facebook: 'https://facebook.com/prawaas',
    instagram: 'https://instagram.com/prawaas',
    linkedin: 'https://linkedin.com/company/prawaas',
    youtube: 'https://youtube.com/prawaas',
    twitter: 'https://x.com/prawaas',
    website: 'https://prawaas.com',
  },
  contactInfo: {
    organization: 'MM Activ Sci-Tech Communications',
    address: "Ashirwad, 1st Floor, 36/A/2, Pallod Farms Baner Road, Pune - 411045, India",
    phone: '+91 80 4113 1912/13',
    email: 'info@prawaas.com',
  },
  features: {
    enableQR: true,
    enableScanQR: true,
    enableResources: true,
    enableContactUs: true,
    enableDigiyatra: false,
    enablePolls: true,
    enableMyWallet: true,
    enableMyMeetings: true,
    enableChatBot: true,
  },
  theme: defaultTheme,
};
