export interface Lesson {
  _id: string;
  title: string;
  slug: string;
  description: string;
  videoProvider: 'vimeo' | 'youtube' | 'wistia' | 'direct';
  videoId: string;
  duration: number; // seconds
  transcript?: string;
  downloadableAssets?: { title: string; url: string; fileType: string }[];
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  lessons: Lesson[];
  featured: boolean;
  spotlight?: boolean;
  publishedAt: string;
}

export interface Webinar {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  presenter: string;
  scheduledAt: string;
  status: 'upcoming' | 'past';
  registrationUrl?: string;
  recordingUrl?: string;
  duration?: number; // minutes
  tags: string[];
  featured: boolean;
  spotlight?: boolean;
}

export interface LastWatched {
  courseSlug: string;
  lessonSlug: string;
  courseTitle: string;
  lessonTitle: string;
  lessonIndex: number;
  totalLessons: number;
  thumbnail: string;
  coursePath: string;
}

export interface Resource {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: 'documentation' | 'teacher-planning' | 'educational-content' | 'marketing-materials' | 'technical-guides';
  resourceType: 'file' | 'link' | 'inline';
  file?: string;
  externalUrl?: string;
  thumbnail?: string;
  featured: boolean;
  publishedAt: string;
  fileType?: string; // e.g. "PDF", "DOCX"
}
