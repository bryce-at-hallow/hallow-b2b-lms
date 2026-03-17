// ── Courses ───────────────────────────────────────────────────

export const ALL_COURSES_QUERY = `
  *[_type == "course"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "thumbnail": thumbnail.asset->url,
    category,
    featured,
    spotlight,
    publishedAt,
    blocks[] {
      _type,
      _key,
      title,
      "slug": slug.current,
      description,
      // VideoBlock fields
      videoProvider,
      videoId,
      duration,
      transcript,
      downloadableAssets[] { title, "url": asset->url, fileType },
      // FileBlock fields
      "fileUrl": file.asset->url,
      fileType,
      fileSize,
      // QuizBlock fields
      passingScore,
      questions[] {
        _key,
        question,
        options,
        correctIndex,
        explanation,
      },
    }
  }
`;

export const COURSE_BY_SLUG_QUERY = `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "thumbnail": thumbnail.asset->url,
    category,
    featured,
    spotlight,
    publishedAt,
    blocks[] {
      _type,
      _key,
      title,
      "slug": slug.current,
      description,
      videoProvider,
      videoId,
      duration,
      transcript,
      downloadableAssets[] { title, "url": asset->url, fileType },
      "fileUrl": file.asset->url,
      fileType,
      fileSize,
      passingScore,
      questions[] {
        _key,
        question,
        options,
        correctIndex,
        explanation,
      },
    }
  }
`;

// ── Webinars ──────────────────────────────────────────────────

export const ALL_WEBINARS_QUERY = `
  *[_type == "webinar"] | order(scheduledAt asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "thumbnail": thumbnail.asset->url,
    presenter,
    scheduledAt,
    status,
    registrationUrl,
    recordingUrl,
    duration,
    tags,
    featured,
    spotlight,
  }
`;

// ── Resources ─────────────────────────────────────────────────

export const ALL_RESOURCES_QUERY = `
  *[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    resourceType,
    "file": file.asset->url,
    externalUrl,
    "thumbnail": thumbnail.asset->url,
    featured,
    publishedAt,
    fileType,
  }
`;

// ── Home ──────────────────────────────────────────────────────

export const HOME_QUERY = `
  {
    "featuredCourses": *[_type == "course" && featured == true] | order(publishedAt desc) [0..2] {
      _id, title, "slug": slug.current, "thumbnail": thumbnail.asset->url,
      category, featured, spotlight,
      "firstBlockSlug": blocks[0].slug.current,
      "blockCount": count(blocks),
    },
    "spotlightCourse": *[_type == "course" && spotlight == true] | order(publishedAt desc) [0] {
      _id, title, "slug": slug.current, description, "thumbnail": thumbnail.asset->url,
      "firstBlockSlug": blocks[0].slug.current,
    },
    "upcomingWebinars": *[_type == "webinar" && status == "upcoming"] | order(scheduledAt asc) [0..2] {
      _id, title, "slug": slug.current, "thumbnail": thumbnail.asset->url,
      scheduledAt, presenter, registrationUrl, featured, spotlight,
    },
    "spotlightWebinar": *[_type == "webinar" && spotlight == true] | order(scheduledAt asc) [0] {
      _id, title, "slug": slug.current, description, "thumbnail": thumbnail.asset->url,
      scheduledAt, status, registrationUrl, recordingUrl,
    },
    "featuredResources": *[_type == "resource" && featured == true] | order(publishedAt desc) [0..3] {
      _id, title, "slug": slug.current, category, resourceType, fileType, "file": file.asset->url, externalUrl,
    },
  }
`;
