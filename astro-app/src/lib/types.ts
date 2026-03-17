// ── Course content blocks ─────────────────────────────────────

interface BlockBase {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface VideoBlock extends BlockBase {
  blockType: 'video';
  videoProvider: 'vimeo' | 'youtube' | 'wistia' | 'direct';
  videoId: string;
  duration: number; // seconds
  transcript?: string;
  downloadableAssets?: { title: string; url: string; fileType: string }[];
}

export interface FileBlock extends BlockBase {
  blockType: 'file';
  fileUrl: string;
  fileType: string; // 'PDF', 'DOCX', 'ZIP', etc.
  fileSize?: string; // e.g. '2.4 MB'
}

export interface QuizQuestion {
  _id: string;
  question: string;
  options: string[];
  correctIndex: number;       // 0-based index of the correct option
  explanation?: string;       // shown after answering
}

export interface QuizBlock extends BlockBase {
  blockType: 'quiz';
  questions: QuizQuestion[];
  passingScore?: number;      // percentage required to pass, default 80
}

export type CourseBlock = VideoBlock | FileBlock | QuizBlock;

// ── Course ────────────────────────────────────────────────────

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  blocks: CourseBlock[];
  featured: boolean;
  spotlight?: boolean;
  publishedAt: string;
}

// ── Webinar ───────────────────────────────────────────────────

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

// ── Resource ──────────────────────────────────────────────────

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
  fileType?: string;
}

// ── localStorage ──────────────────────────────────────────────

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
