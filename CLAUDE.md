# Hallow LMS — Claude Code Context

## What this project is
A B2B Learning Management System for Hallow's parish/partner program. Partners log in to access courses, webinars, and downloadable resources. The team manages all content through a Sanity Studio (no code deploys needed for content changes).

## Repo structure
```
HallowLMS/
├── astro-app/               # The LMS site (Astro 6, Tailwind v4, static output)
├── sanity-hallow-lms/       # Sanity Studio + schema definitions (source of truth)
└── sanity-studio/           # Legacy schema copy — do not edit, use sanity-hallow-lms/
```

## Tech stack
- **Astro 6** — static output (`output: 'static'`, no SSR adapter)
- **Tailwind v4** — configured via `@theme` in `src/styles/global.css`, **no `tailwind.config.mjs`**
- **Sanity** — project ID `z8077dy6`, dataset `production`
- **Vercel** — hosts the Astro site (root directory: `astro-app`)
- **sanity.studio** — hosts the Studio at `https://hallow-lms.sanity.studio`

## Brand tokens (Tailwind v4)
Defined in `astro-app/src/styles/global.css` via `@theme { ... }`:
- Primary: `--color-hallow-purple: #6D0EC1`
- Font: Inter (Google Fonts)
- Fade-up animation utilities defined there too

## Sanity schemas (in `sanity-hallow-lms/schemaTypes/`)
| Document type | File | Key fields |
|---|---|---|
| `course` | `course.ts` | `title`, `slug`, `thumbnail`, `category`, `featured`, `spotlight`, `blocks[]` |
| `webinar` | `webinar.ts` | `title`, `slug`, `thumbnail`, `presenter`, `scheduledAt`, `status`, `featured`, `spotlight` |
| `resource` | `resource.ts` | `title`, `slug`, `category`, `resourceType`, `file`, `externalUrl`, `featured` |
| `videoBlock` | `blocks.ts` | `slug`, `title`, `videoProvider`, `videoId`, `duration`, `downloadableAssets[]` |
| `fileBlock` | `blocks.ts` | `slug`, `title`, `file`, `fileType`, `fileSize` |
| `quizBlock` | `blocks.ts` | `slug`, `title`, `questions[]`, `passingScore` |

Courses have `blocks[]` (array of videoBlock/fileBlock/quizBlock) — **not** `lessons[]`.

## Sanity client (`astro-app/src/lib/sanity.ts`)
```ts
import { sanityClient, urlFor } from '../lib/sanity';
```
- `sanityClient.fetch(QUERY, params)` — runs GROQ queries
- `urlFor(imageSource).width(800).url()` — builds CDN image URLs from Sanity image references

## GROQ queries (`astro-app/src/lib/queries.ts`)
All queries live here. Key exports:
- `ALL_COURSES_QUERY` — full course list with blocks
- `COURSE_BY_SLUG_QUERY` — single course by slug (accepts `$slug` param)
- `ALL_WEBINARS_QUERY` — all webinars ordered by scheduledAt
- `ALL_RESOURCES_QUERY` — all resources
- `HOME_QUERY` — single batched query for homepage (featured + spotlight items)

**GROQ note:** `BLOCK_FRAGMENT` normalizes Sanity's `_type`/`_key` to TypeScript field names (`blockType`, `_id`). Don't inline block projections — extend the fragment.

## Environment variables
```
PUBLIC_SANITY_PROJECT_ID=z8077dy6
PUBLIC_SANITY_DATASET=production
```
- Stored in `astro-app/.env` locally (gitignored)
- Set in Vercel dashboard for production
- Template in `astro-app/.env.example`

## Pages
- `/` — Home hub (hero, stats, featured courses/webinars/resources, CTA)
- `/courses` — Course catalog grid
- `/courses/[slug]` — Redirects to first block
- `/courses/[slug]/[lessonSlug]` — CourseLayout: sidebar + video/file/quiz block
- `/webinars` — Tabbed upcoming/past (vanilla JS tab switching)
- `/resources` — Filterable library (vanilla JS, updates URL params)

## Development commands
```bash
# Frontend
cd astro-app && npm run dev       # dev server on :4321
cd astro-app && npm run build     # static build to dist/

# Sanity Studio
cd sanity-hallow-lms && npx sanity dev    # studio dev on :3333
cd sanity-hallow-lms && npx sanity deploy # deploy to hallow-lms.sanity.studio
```

## Deployment
- **Astro → Vercel**: auto-deploys on push to `main`. Root directory = `astro-app`.
- **Studio → sanity.studio**: run `npx sanity deploy` from `sanity-hallow-lms/`. Hostname (`hallow-lms`) is set in `sanity.cli.ts`.
- **Webhook**: Sanity publish events → Vercel deploy hook → site rebuilds within ~30s.

---

## Known gotchas

### Clear Astro cache after data restructuring
After renaming fields or restructuring data types, stale compiled output in `astro-app/.astro/` causes TypeErrors at runtime even though source is correct.
```bash
rm -rf astro-app/.astro
```

### Stop Astro dev server before Sanity CLI auth
`sanity login` and `npm create sanity@latest` start a local OAuth callback server. If Astro is running on `:4321`, there's a port conflict and the login 404s. Stop Astro first, then run Sanity CLI commands, then restart Astro.

### Unsplash image URLs
Always use `urls.regular` from the API response. Never construct `images.unsplash.com/photo-{id}` URLs from short alphanumeric IDs — those only work with old numeric IDs. Also avoid `plus.unsplash.com` URLs (paid tier, won't load publicly).
```python
url = r['urls']['regular'].split('?')[0] + '?w=800&q=80'
```

### Tailwind v4 — no config file
This project uses Tailwind v4 syntax. Do **not** create `tailwind.config.mjs` or use `theme.extend`. All custom tokens go in `src/styles/global.css` under `@theme { ... }`.
