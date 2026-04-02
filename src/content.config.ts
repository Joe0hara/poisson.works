import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    thumbnail: z.string().optional(),
    role: z.string().optional(),
    venue: z.string().optional(),
    officialUrl: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const tutorial = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutorial' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    thumbnail: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const prototype = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prototype' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    thumbnail: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    thumbnail: z.string().optional(),
    url: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, tutorial, prototype, tools };
