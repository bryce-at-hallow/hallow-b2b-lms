export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

export function formatDurationMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

export function isUpcoming(dateString: string): boolean {
  return new Date(dateString) > new Date();
}

export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'documentation': 'Documentation',
    'teacher-planning': 'Teacher Planning',
    'educational-content': 'Educational Content',
    'marketing-materials': 'Marketing Materials',
    'technical-guides': 'Technical Guides',
  };
  return labels[category] ?? category;
}
