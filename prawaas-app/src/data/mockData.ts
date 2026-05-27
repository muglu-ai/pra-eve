import { AgendaDay, CommunityPost, Person, Exhibitor, QuickAction, FilterChip } from '../types';

export const quickActions: QuickAction[] = [
  { id: 'myqr', label: 'My QR', icon: 'qr-code-outline', variant: 'filled' },
  { id: 'scanqr', label: 'Scan QR', icon: 'scan-outline', variant: 'filled' },
  { id: 'resources', label: 'Resources', icon: 'information-circle-outline', variant: 'outlined' },
  { id: 'contact', label: 'Contact Us', icon: 'call-outline', variant: 'outlined' },
];

export const agendaDays: AgendaDay[] = [
  {
    id: 'day1',
    date: '9 July 2026',
    title: 'Inauguration & BOCI Annual Meeting',
    description:
      'The grand opening of Prawaas 5.0 begins with the inauguration of the Exhibition, followed by the BOCI Annual General Meeting. The day culminates with the Inaugural Ceremony and the prestigious BOCI Industry Leadership Reception Dinner.',
    images: [],
    sessions: [
      {
        id: 's1',
        time: '11:00 - 11:30',
        title: 'Inauguration of Prawaas 5.0 Exhibition',
        type: 'ceremony',
      },
      { id: 's2', time: '13:00 - 14:00', title: 'Lunch Break', type: 'break' },
      {
        id: 's3',
        time: '14:00 - 16:00',
        title: 'BOCI Annual General Meeting',
        type: 'plenary',
      },
      {
        id: 's4',
        time: '17:00 - 18:30',
        title: 'Inaugural Ceremony of Prawaas 5.0',
        type: 'ceremony',
      },
      {
        id: 's5',
        time: '19:00 onwards',
        title: 'BOCI Industry Leadership Reception Dinner',
        type: 'networking',
      },
    ],
  },
  {
    id: 'day2',
    date: '10 July 2026',
    title: 'Conferences, Panels & Awards',
    description:
      'A power-packed day featuring vision talks, plenary panels on powering India\'s public transport transformation, parallel sessions on EV, policy reforms, smart mobility, and passenger experience. The day ends with the Prawaas 5.0 Excellence Awards.',
    images: [],
    sessions: [
      {
        id: 's6',
        time: '10:00 - 10:30',
        title: 'Vision Talk: Why Public Transport Matters More Than Ever',
        type: 'plenary',
      },
      {
        id: 's7',
        time: '10:30 - 11:30',
        title: 'Plenary Panel | Desh Ki Raftaar: Powering India\'s Public Transport Transformation',
        type: 'plenary',
      },
      {
        id: 's8',
        time: '11:30 - 12:30',
        title: 'Public–Private Partnerships in Public Transport',
        hall: 'Hall 1 | EV',
        type: 'parallel',
      },
      {
        id: 's9',
        time: '11:30 - 12:30',
        title: 'Policy Reforms to Accelerate the Growth of Bus Transport in India',
        hall: 'Hall 2',
        type: 'parallel',
      },
      {
        id: 's10',
        time: '12:30 - 13:30',
        title: 'Smarter & Greener Mobility Solutions',
        hall: 'Hall 1',
        type: 'parallel',
      },
      {
        id: 's11',
        time: '12:30 - 13:30',
        title: 'Navigating Toll Policies and Insurance Frameworks for Bus Operators',
        hall: 'Hall 2',
        type: 'parallel',
      },
      { id: 's12', time: '13:30 - 14:30', title: 'Lunch Break', type: 'break' },
      {
        id: 's13',
        time: '14:30 - 15:30',
        title: 'Technology and Data for Efficient Bus Operations',
        hall: 'Hall 1',
        type: 'parallel',
      },
      {
        id: 's14',
        time: '14:30 - 15:30',
        title: 'Enhancing AITP for Intercity and Tourism Connectivity',
        hall: 'Hall 2',
        type: 'parallel',
      },
      {
        id: 's15',
        time: '15:30 - 16:30',
        title: 'Enriching Passenger Experience in Stage Carriage Transport',
        hall: 'Hall 1',
        type: 'parallel',
      },
      {
        id: 's16',
        time: '15:30 - 16:30',
        title: 'Car Segment Session',
        hall: 'Hall 2',
        type: 'parallel',
      },
      {
        id: 's17',
        time: '16:30 - 17:15',
        title: 'Plenary Session: EV Captains Roundtable',
        type: 'plenary',
      },
      {
        id: 's18',
        time: '18:00 onwards',
        title: 'PRAWAAS 5.0 Excellence Awards',
        type: 'ceremony',
      },
    ],
  },
  {
    id: 'day3',
    date: '11 July 2026',
    title: 'Innovation, Startups & Valedictory',
    description:
      'The final day focuses on integrated transport systems, future of school bus mobility, startup showcases, and the grand valedictory session wrapping up Prawaas 5.0.',
    images: [],
    sessions: [
      {
        id: 's19',
        time: '11:00 - 12:00',
        title: 'Integrated Transport Systems for Last-mile Connectivity',
        hall: 'Hall 1',
        type: 'parallel',
      },
      {
        id: 's20',
        time: '11:00 - 12:00',
        title: 'Fueling the Future of Transport',
        hall: 'Hall 2',
        type: 'parallel',
      },
      {
        id: 's21',
        time: '12:00 - 13:00',
        title: 'The Future of School Bus Mobility in India',
        hall: 'Hall 1',
        type: 'parallel',
      },
      {
        id: 's22',
        time: '12:00 - 13:00',
        title: 'BOCI Yuva / Startup Showcase',
        hall: 'Hall 2',
        type: 'parallel',
      },
      { id: 's23', time: '13:00 - 14:00', title: 'Lunch Break', type: 'break' },
      { id: 's24', time: '14:00 - 15:30', title: 'Valedictory', type: 'ceremony' },
    ],
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: 'p1',
    author: {
      name: 'Prawaas 5.0',
      avatar: '',
    },
    content:
      'Curtain Raiser — Lucknow Edition! Join us on June 3rd, 2026 for an exciting preview of Prawaas 5.0. Network with key stakeholders and get a glimpse of what\'s coming at the main event in Gandhinagar.',
    images: [],
    timestamp: '2026-05-25T10:00:00Z',
    reactions: [
      { emoji: '❤️', count: 45 },
      { emoji: '👍', count: 32 },
      { emoji: '😊', count: 18 },
    ],
    commentCount: 28,
    type: 'post',
  },
  {
    id: 'p2',
    author: {
      name: 'Prawaas 5.0',
      avatar: '',
    },
    content:
      'Registrations are now open for Prawaas 5.0! India\'s flagship multimodal transport show is coming to Gandhinagar, Gujarat from 9-11 July 2026. Secure your spot now!',
    images: [],
    timestamp: '2026-05-20T14:30:00Z',
    reactions: [
      { emoji: '❤️', count: 67 },
      { emoji: '👍', count: 41 },
      { emoji: '🎉', count: 29 },
    ],
    commentCount: 52,
    type: 'post',
  },
  {
    id: 'p3',
    author: {
      name: 'Prawaas 5.0',
      avatar: '',
    },
    content: 'What excites you most about Prawaas 5.0?',
    images: [],
    timestamp: '2026-05-18T09:00:00Z',
    reactions: [
      { emoji: '🤔', count: 15 },
      { emoji: '👍', count: 22 },
    ],
    commentCount: 34,
    type: 'poll',
    pollOptions: [
      { id: 'po1', text: 'Exhibition & Technology Showcase', votes: 145 },
      { id: 'po2', text: 'Conference & Panel Discussions', votes: 98 },
      { id: 'po3', text: 'Networking & B2B Meetings', votes: 112 },
      { id: 'po4', text: 'Startup Pitches & Innovation', votes: 87 },
      { id: 'po5', text: 'Awards Ceremony', votes: 56 },
    ],
  },
];

export const people: Person[] = [
  { id: 'n1', name: 'Rajesh Sharma', avatar: '', category: 'DELEGATE', designation: 'Director', organization: 'Gujarat SRTU' },
  { id: 'n2', name: 'Priya Menon', avatar: '', category: 'SPEAKER', designation: 'Chief Mobility Officer', organization: 'NITI Aayog' },
  { id: 'n3', name: 'Vikram Singh', avatar: '', category: 'EXHIBITOR', designation: 'CEO', organization: 'GreenBus Technologies' },
  { id: 'n4', name: 'Anita Desai', avatar: '', category: 'STARTUP', designation: 'Founder', organization: 'MetroLink AI' },
  { id: 'n5', name: 'Suresh Patel', avatar: '', category: 'DELEGATE', designation: 'Fleet Manager', organization: 'BOCI Member' },
  { id: 'n6', name: 'Kavitha Nair', avatar: '', category: 'MEDIA', designation: 'Transport Editor', organization: 'Mobility Today' },
  { id: 'n7', name: 'Amit Kumar', avatar: '', category: 'SERVICES', designation: 'VP Operations', organization: 'TransitTech Solutions' },
  { id: 'n8', name: 'Deepa Iyer', avatar: '', category: 'ACADEMIA', designation: 'Professor', organization: 'IIT Delhi' },
  { id: 'n9', name: 'Mohammad Ali', avatar: '', category: 'INVESTOR', designation: 'Partner', organization: 'Mobility Ventures Fund' },
  { id: 'n10', name: 'Sunita Rao', avatar: '', category: 'ORGANIZER', designation: 'Event Director', organization: 'MM Activ' },
  { id: 'n11', name: 'Ravi Teja', avatar: '', category: 'VIP', designation: 'Secretary', organization: 'Ministry of Road Transport' },
  { id: 'n12', name: 'Neha Gupta', avatar: '', category: 'DELEGATE', designation: 'Transport Planner', organization: 'DMRC' },
];

export const networkingFilters: FilterChip[] = [
  { key: 'all', label: 'All' },
  { key: 'academia', label: 'Academia' },
  { key: 'admin', label: 'Admin' },
  { key: 'delegate', label: 'Delegate' },
  { key: 'exhibitor', label: 'Exhibitor' },
  { key: 'investor', label: 'Investor' },
  { key: 'media', label: 'Media' },
  { key: 'organizer', label: 'Organizer' },
  { key: 'services', label: 'Services' },
  { key: 'speaker', label: 'Speaker' },
  { key: 'startup', label: 'Startup' },
  { key: 'vip', label: 'VIP' },
];

export const exhibitors: Exhibitor[] = [
  { id: 'e1', name: 'Tata Motors', logo: '', hall: 'Hall 1', booth: '1.01', category: 'OEM', description: 'Leading commercial vehicle manufacturer' },
  { id: 'e2', name: 'Ashok Leyland', logo: '', hall: 'Hall 1', booth: '1.15', category: 'OEM', description: 'India\'s leading bus manufacturer' },
  { id: 'e3', name: 'Olectra Greentech', logo: '', hall: 'Hall 2', booth: '2.08', category: 'EV', description: 'Electric bus manufacturer' },
  { id: 'e4', name: 'BYD India', logo: '', hall: 'Hall 2', booth: '2.12', category: 'EV', description: 'Global EV solutions provider' },
  { id: 'e5', name: 'Volvo Buses', logo: '', hall: 'Hall 1', booth: '1.22', category: 'OEM', description: 'Premium bus manufacturer' },
  { id: 'e6', name: 'KPIT Technologies', logo: '', hall: 'Hall 3', booth: '3.05', category: 'Technology', description: 'Mobility software solutions' },
  { id: 'e7', name: 'Chalo', logo: '', hall: 'Hall 3', booth: '3.10', category: 'Technology', description: 'Bus tracking & ticketing platform' },
  { id: 'e8', name: 'RedBus', logo: '', hall: 'Hall 3', booth: '3.15', category: 'Technology', description: 'Online bus ticketing platform' },
  { id: 'e9', name: 'Switch Mobility', logo: '', hall: 'Hall 2', booth: '2.20', category: 'EV', description: 'Electric bus & LCV solutions' },
  { id: 'e10', name: 'JBM Auto', logo: '', hall: 'Hall 1', booth: '1.30', category: 'OEM', description: 'Electric bus manufacturer' },
  { id: 'e11', name: 'PMI Electro Mobility', logo: '', hall: 'Hall 2', booth: '2.25', category: 'EV', description: 'Electric bus solutions' },
  { id: 'e12', name: 'Triton Electric', logo: '', hall: 'Hall 2', booth: '2.28', category: 'EV', description: 'EV solutions provider' },
];
