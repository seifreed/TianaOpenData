#!/usr/bin/env node
// Self-contained validator for the public TianaOpenData dataset.
// Mirrors the schema contract consumed by the Tiana Viva app, but has no
// dependency on that (private) repo — CI can run it with just `zod`.
//
// Usage: node validate.mjs [dir]   (dir defaults to the repo root ".")

import fs from "node:fs/promises";
import path from "node:path";
import { URL } from "node:url";
import { z } from "zod";

const localizedTextSchema = z.object({
  ca: z.string(),
  es: z.string(),
  en: z.string(),
});
const optionalLocalizedTextSchema = z
  .object({ ca: z.string(), es: z.string(), en: z.string() })
  .nullable();
const lonLatSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);
const isoDateTimeSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Expected an ISO8601-compatible date string",
  });
const httpsUrlSchema = z
  .string()
  .url()
  .refine((value) => new URL(value).protocol === "https:", {
    message: "Expected an HTTPS URL",
  });
const citizenCategorySchema = z.enum([
  "parking",
  "pharmacy",
  "health",
  "procedures",
  "culture",
  "sports",
  "children",
  "seniors",
  "emergency",
  "recycling",
  "food",
  "commerce",
  "transport",
  "nature",
  "heritage",
]);
const sourceSchema = z.object({
  name: z.string().min(1),
  url: httpsUrlSchema.nullable(),
  updated_at: isoDateTimeSchema,
});

const placesSchema = z.array(
  z.object({
    id: z.string().min(1),
    type: z.enum([
      "monument",
      "nature",
      "commerce",
      "restaurant",
      "culture",
      "route-point",
      "other",
    ]),
    geometry: z.object({ type: z.literal("Point"), coordinates: lonLatSchema }),
    properties: z.object({
      name: localizedTextSchema,
      description: localizedTextSchema,
      tags: z.array(z.string()),
      accessibility: z.object({
        wheelchair: z.boolean(),
        baby_stroller: z.boolean(),
        low_vision: z.boolean(),
      }),
      images: z.array(httpsUrlSchema).default([]),
      citizen_categories: z.array(citizenCategorySchema).default([]),
      contact: z
        .object({
          address: z.string().trim().nullable().default(null),
          phone: z.string().trim().nullable().default(null),
          email: z.string().email().nullable().default(null),
          website: httpsUrlSchema.nullable().default(null),
        })
        .default({}),
      opening_hours: optionalLocalizedTextSchema.default(null),
      services: z.array(localizedTextSchema).default([]),
      cost: optionalLocalizedTextSchema.default(null),
      restrictions: optionalLocalizedTextSchema.default(null),
      source: sourceSchema.nullable().default(null),
      report_url: httpsUrlSchema.nullable().default(null),
      last_updated: isoDateTimeSchema,
    }),
  }),
);

const routesSchema = z.array(
  z.object({
    id: z.string().min(1),
    name: localizedTextSchema,
    description: localizedTextSchema,
    difficulty: z.enum(["easy", "medium", "hard"]),
    estimated_time_min: z.number().int().positive(),
    geometry: z.object({
      type: z.literal("LineString"),
      coordinates: z.array(lonLatSchema).min(2),
    }),
    related_pois: z.array(z.string()),
    distance_km: z.number().positive().nullable().default(null),
    elevation_gain_m: z.number().nonnegative().nullable().default(null),
    start_label: optionalLocalizedTextSchema.default(null),
    end_label: optionalLocalizedTextSchema.default(null),
    recommendations: z.array(localizedTextSchema).default([]),
    suitability: z
      .object({
        children: z.boolean().nullable().default(null),
        stroller: z.boolean().nullable().default(null),
      })
      .default({}),
    images: z.array(httpsUrlSchema).default([]),
    source: sourceSchema.nullable().default(null),
    report_url: httpsUrlSchema.nullable().default(null),
    last_updated: isoDateTimeSchema,
  }),
);

const metadataSchema = z.object({
  version: z.string().min(1),
  generated_by: z.string().min(1),
  language_support: z.array(z.enum(["ca", "es", "en"])).min(3),
  sources: z.array(httpsUrlSchema).default([]),
  places_count: z.number().int().nonnegative().optional(),
  routes_count: z.number().int().nonnegative().optional(),
  note: z.string().optional(),
  alerts: z
    .array(
      z.object({
        id: z.string().min(1),
        type: z.enum(["incident", "roadwork", "event", "notice"]),
        title: localizedTextSchema,
        description: localizedTextSchema,
        starts_at: isoDateTimeSchema.nullable(),
        ends_at: isoDateTimeSchema.nullable(),
        source_url: httpsUrlSchema.nullable(),
      }),
    )
    .default([]),
  last_checked_at: isoDateTimeSchema.optional(),
  report_url: httpsUrlSchema.nullable().default(null),
});

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function main() {
  const dir = process.argv[2] ?? ".";
  const places = placesSchema.parse(await readJson(path.join(dir, "places.json")));
  const routes = routesSchema.parse(await readJson(path.join(dir, "routes.json")));
  const metadata = metadataSchema.parse(
    await readJson(path.join(dir, "metadata.json")),
  );
  console.log(
    `OpenData valid: ${places.length} places, ${routes.length} routes, version ${metadata.version}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
