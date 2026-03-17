// ── Shared block objects (used inside course.blocks array) ────

export const videoBlock = {
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  icon: () => '▶️',
  fields: [
    { name: 'title',         type: 'string',  title: 'Title',           validation: (R: any) => R.required() },
    { name: 'slug',          type: 'slug',    title: 'Slug',            options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description',   type: 'text',    title: 'Description',     rows: 3 },
    {
      name: 'videoProvider',
      type: 'string',
      title: 'Video Provider',
      options: { list: [
        { title: 'YouTube',  value: 'youtube' },
        { title: 'Vimeo',   value: 'vimeo' },
        { title: 'Wistia',  value: 'wistia' },
        { title: 'Direct',  value: 'direct' },
      ]},
      validation: (R: any) => R.required(),
    },
    { name: 'videoId',  type: 'string', title: 'Video ID / URL',    validation: (R: any) => R.required() },
    { name: 'duration', type: 'number', title: 'Duration (seconds)', validation: (R: any) => R.required().min(1) },
    { name: 'transcript', type: 'text', title: 'Transcript', rows: 8 },
    {
      name: 'downloadableAssets',
      type: 'array',
      title: 'Downloadable Assets',
      of: [{
        type: 'object',
        fields: [
          { name: 'title',    type: 'string', title: 'Label' },
          { name: 'file',     type: 'file',   title: 'File' },
          { name: 'fileType', type: 'string', title: 'File Type (e.g. PDF)' },
        ],
        preview: { select: { title: 'title', subtitle: 'fileType' } },
      }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'videoProvider' },
    prepare: ({ title, subtitle }: any) => ({ title, subtitle: `Video · ${subtitle ?? ''}` }),
  },
};

export const fileBlock = {
  name: 'fileBlock',
  title: 'File / Document',
  type: 'object',
  icon: () => '📄',
  fields: [
    { name: 'title',       type: 'string', title: 'Title',             validation: (R: any) => R.required() },
    { name: 'slug',        type: 'slug',   title: 'Slug',              options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description', type: 'text',   title: 'Description',       rows: 3 },
    { name: 'file',        type: 'file',   title: 'File',              validation: (R: any) => R.required() },
    {
      name: 'fileType',
      type: 'string',
      title: 'File Type Label',
      description: 'Displayed as a badge (e.g. PDF, DOCX, ZIP)',
      options: { list: ['PDF', 'DOCX', 'XLSX', 'ZIP', 'PPTX', 'MP3'] },
      validation: (R: any) => R.required(),
    },
    { name: 'fileSize', type: 'string', title: 'File Size (optional)', description: 'e.g. 2.4 MB' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'fileType' },
    prepare: ({ title, subtitle }: any) => ({ title, subtitle: `File · ${subtitle ?? ''}` }),
  },
};

export const quizBlock = {
  name: 'quizBlock',
  title: 'Quiz',
  type: 'object',
  icon: () => '✅',
  fields: [
    { name: 'title',        type: 'string', title: 'Title',         validation: (R: any) => R.required() },
    { name: 'slug',         type: 'slug',   title: 'Slug',          options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'description',  type: 'text',   title: 'Description',   rows: 2 },
    {
      name: 'passingScore',
      type: 'number',
      title: 'Passing Score (%)',
      description: 'Minimum score to pass (default 80)',
      initialValue: 80,
      validation: (R: any) => R.min(1).max(100),
    },
    {
      name: 'questions',
      type: 'array',
      title: 'Questions',
      validation: (R: any) => R.required().min(1),
      of: [{
        type: 'object',
        fields: [
          { name: 'question',    type: 'string', title: 'Question',               validation: (R: any) => R.required() },
          {
            name: 'options',
            type: 'array',
            title: 'Answer Options',
            of: [{ type: 'string' }],
            validation: (R: any) => R.required().min(2).max(6),
          },
          {
            name: 'correctIndex',
            type: 'number',
            title: 'Correct Answer (0-based index)',
            description: '0 = first option, 1 = second option, etc.',
            validation: (R: any) => R.required().min(0),
          },
          { name: 'explanation', type: 'text', title: 'Explanation (shown after answer)', rows: 3 },
        ],
        preview: {
          select: { title: 'question' },
          prepare: ({ title }: any) => ({ title }),
        },
      }],
    },
  ],
  preview: {
    select: { title: 'title', questions: 'questions' },
    prepare: ({ title, questions }: any) => ({
      title,
      subtitle: `Quiz · ${questions?.length ?? 0} questions`,
    }),
  },
};
