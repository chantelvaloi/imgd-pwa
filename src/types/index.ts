export interface ChurchInfo {
  name: string;
  tagline: string;
  about: string;
  address: string;
  mapUrl: string;
  phone: string;
  email: string;
  serviceTimes: { day: string; time: string; label: string }[];
  socials: { platform: string; url: string }[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO date
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  durationMinutes: number;
  scripture: string;
  videoUrl: string; // youtube embed url
  thumbnail: string;
  description: string;
}

export interface ShortVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  durationSeconds: number;
}

export interface LiveStatus {
  isLive: boolean;
  title: string;
  startsAt: string; // ISO datetime, next scheduled service
  streamUrl: string;
  replayUrl: string | null;
}

export interface UpdatePost {
  id: string;
  title: string;
  date: string;
  body: string;
  image?: string;
}
