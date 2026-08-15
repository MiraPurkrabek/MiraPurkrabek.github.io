// Typed content collections for every fact the site shows about Mira.
// See docs/redesign_15-08-2026_PRs/PR-03-content-model.md for the schema spec and
// docs/redesign_15-08-2026_PRs/PR-00-OVERVIEW.md §8 for the source-of-truth fact sheet.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Controlled tag vocabulary — reuse only these, do not add new ones ad hoc.
const TAGS = [
  'Human Pose Estimation',
  'Segmentation',
  'Detection',
  '3D Reconstruction',
  'Robustness',
  'Probabilistic Modeling',
  'Synthetic Data',
  'Tracking',
  'Video Systems',
  'Deployment',
  'Tooling',
  'Embedded / C++',
] as const;

const linksSchema = z.object({
  project: z.url().optional(),
  paper: z.url().optional(),
  code: z.url().optional(),
  demo: z.url().optional(),
  models: z.url().optional(),
  dataset: z.url().optional(),
  grant: z.url().optional(),
  article: z.url().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string().max(90),
      kind: z.enum(['research', 'applied', 'tool']),
      years: z.string(),
      role: z.string(),
      org: z.string().optional(),
      featured: z.boolean(),
      featuredOrder: z.number().int().min(1).max(4).optional(),
      order: z.number(),
      summary: z.string(),
      highlights: z.array(z.string()).max(3),
      tags: z.array(z.enum(TAGS)).max(3),
      links: linksSchema.optional(),
      image: z.object({ src: image(), alt: z.string() }).optional(),
      status: z.enum(['active', 'completed', 'internal']).optional(),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      authors: z.array(z.string()),
      venue: z.string(),
      venueLong: z.string(),
      year: z.number(),
      type: z.enum(['conference', 'workshop', 'preprint', 'thesis']),
      role: z.enum(['first-author', 'co-author', 'supervised']),
      awards: z.array(z.string()),
      selected: z.boolean(),
      summary: z.string(),
      abstract: z.string(),
      links: z
        .object({
          project: z.url().optional(),
          paper: z.url().optional(),
          arxiv: z.url().optional(),
          code: z.url().optional(),
          demo: z.url().optional(),
          models: z.url().optional(),
          dataset: z.url().optional(),
          bibtex: z.string().optional(),
        })
        .optional(),
      thumbnail: z.object({ src: image(), alt: z.string() }),
      bibtex: z.string().optional(),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/experience' }),
  schema: z.object({
    org: z.string(),
    orgUrl: z.url().optional(),
    role: z.string(),
    location: z.string(),
    start: z.string(),
    end: z.string().nullable(),
    displayPeriod: z.string(),
    kind: z.enum(['research', 'industry', 'internship', 'visit', 'leadership']),
    summary: z.string(),
    details: z.array(z.string()).optional(),
    logo: z.string().optional(),
    inStrip: z.boolean(),
    order: z.number(),
  }),
});

const recognition = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/recognition' }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    year: z.number(),
    month: z.number().min(1).max(12).optional(),
    kind: z.enum(['award', 'competition', 'service', 'selection', 'talk']),
    description: z.string().optional(),
    link: z.url().optional(),
    selected: z.boolean(),
    order: z.number(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/education' }),
  schema: z.object({
    degree: z.string(),
    field: z.string(),
    institution: z.string(),
    period: z.string(),
    note: z.string().optional(),
    thesisLink: z.url().optional(),
    order: z.number(),
  }),
});

export const collections = {
  projects,
  publications,
  experience,
  recognition,
  education,
};
