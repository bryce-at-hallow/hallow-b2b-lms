export const resource = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string',  title: 'Title',       validation: (R: any) => R.required() },
    { name: 'slug',        type: 'slug',    title: 'Slug',        options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description', type: 'text',    title: 'Description', rows: 3, validation: (R: any) => R.required() },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: { list: [
        { title: 'Documentation',        value: 'documentation' },
        { title: 'Teacher Planning',     value: 'teacher-planning' },
        { title: 'Educational Content',  value: 'educational-content' },
        { title: 'Marketing Materials',  value: 'marketing-materials' },
        { title: 'Technical Guides',     value: 'technical-guides' },
      ]},
      validation: (R: any) => R.required(),
    },
    {
      name: 'resourceType',
      type: 'string',
      title: 'Resource Type',
      options: { list: [
        { title: 'File (upload)',    value: 'file' },
        { title: 'External Link',   value: 'link' },
      ], layout: 'radio' },
      validation: (R: any) => R.required(),
    },
    { name: 'file',        type: 'file',   title: 'File',          description: 'Required when Resource Type is File' },
    { name: 'externalUrl', type: 'url',    title: 'External URL',  description: 'Required when Resource Type is Link' },
    { name: 'thumbnail',   type: 'image',  title: 'Thumbnail',     options: { hotspot: true } },
    {
      name: 'fileType',
      type: 'string',
      title: 'File Type Badge',
      description: 'Label shown on the card (e.g. PDF, DOCX, ZIP, LINK)',
      options: { list: ['PDF', 'DOCX', 'XLSX', 'ZIP', 'PPTX', 'MP3', 'LINK'] },
      validation: (R: any) => R.required(),
    },
    { name: 'featured',    type: 'boolean',  title: 'Featured',    initialValue: false },
    { name: 'publishedAt', type: 'datetime', title: 'Published At', validation: (R: any) => R.required() },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
  orderings: [
    { title: 'Published (newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
};
