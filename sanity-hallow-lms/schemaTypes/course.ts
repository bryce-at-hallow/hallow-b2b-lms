export const course = {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string',   title: 'Title',       validation: (R: any) => R.required() },
    { name: 'slug',        type: 'slug',     title: 'Slug',        options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description', type: 'text',     title: 'Description', rows: 4, validation: (R: any) => R.required() },
    { name: 'thumbnail',   type: 'image',    title: 'Thumbnail',   options: { hotspot: true }, validation: (R: any) => R.required() },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: { list: [
        { title: 'Onboarding',            value: 'Onboarding' },
        { title: 'Community Leadership',  value: 'Community Leadership' },
        { title: 'Education',             value: 'Education' },
        { title: 'Advanced',              value: 'Advanced' },
      ]},
      validation: (R: any) => R.required(),
    },
    { name: 'featured',     type: 'boolean', title: 'Featured',        initialValue: false, description: 'Show in featured sections on the home page' },
    { name: 'spotlight',    type: 'boolean', title: 'Spotlight',       initialValue: false, description: 'Use as the primary hero carousel item' },
    { name: 'publishedAt',  type: 'datetime', title: 'Published At',   validation: (R: any) => R.required() },
    {
      name: 'blocks',
      type: 'array',
      title: 'Course Content',
      description: 'Add videos, files, and quizzes in order. Drag to reorder.',
      of: [
        { type: 'videoBlock' },
        { type: 'fileBlock' },
        { type: 'quizBlock' },
      ],
      validation: (R: any) => R.required().min(1),
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
  orderings: [
    { title: 'Published (newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Title A–Z',          name: 'titleAsc',        by: [{ field: 'title',       direction: 'asc'  }] },
  ],
};
