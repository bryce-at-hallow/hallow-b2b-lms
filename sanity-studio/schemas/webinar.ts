export const webinar = {
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  fields: [
    { name: 'title',         type: 'string',   title: 'Title',       validation: (R: any) => R.required() },
    { name: 'slug',          type: 'slug',     title: 'Slug',        options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description',   type: 'text',     title: 'Description', rows: 4, validation: (R: any) => R.required() },
    { name: 'thumbnail',     type: 'image',    title: 'Thumbnail',   options: { hotspot: true }, validation: (R: any) => R.required() },
    { name: 'presenter',     type: 'string',   title: 'Presenter',   validation: (R: any) => R.required() },
    { name: 'scheduledAt',   type: 'datetime', title: 'Date & Time', validation: (R: any) => R.required() },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: { list: [
        { title: 'Upcoming', value: 'upcoming' },
        { title: 'Past',     value: 'past' },
      ], layout: 'radio' },
      validation: (R: any) => R.required(),
    },
    { name: 'registrationUrl', type: 'url',    title: 'Registration URL', description: 'Required for upcoming webinars' },
    { name: 'recordingUrl',    type: 'url',    title: 'Recording URL',    description: 'Required for past webinars' },
    { name: 'duration',        type: 'number', title: 'Duration (minutes)' },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    { name: 'featured',  type: 'boolean', title: 'Featured',  initialValue: false },
    { name: 'spotlight', type: 'boolean', title: 'Spotlight', initialValue: false, description: 'Use as the primary hero carousel item' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'thumbnail' },
    prepare: ({ title, subtitle, media }: any) => ({
      title,
      subtitle: subtitle === 'upcoming' ? '🟢 Upcoming' : '⏺ Past',
      media,
    }),
  },
  orderings: [
    { title: 'Date (soonest)', name: 'scheduledAtAsc', by: [{ field: 'scheduledAt', direction: 'asc' }] },
  ],
};
