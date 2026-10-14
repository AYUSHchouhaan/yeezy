# Yeezy

A Next.js storefront for browsing and purchasing clothing products. The app uses the Next.js App Router, a Drizzle/PostgreSQL data layer, local product imagery, and a client-side cart provider.

## What is included

- Homepage with products grouped by category
- Category listing pages at `/<category>`
- Product detail pages at `/<category>/<product-id>`
- Product quantity and cart actions
- Related-product recommendations on product pages
- Shared header and cart state through `CartProvider`
- Image-prefetch API at `/api/prefetch-images/<path>`
- Database scripts for generating, migrating, pushing, seeding, and inspecting data
- Product images in `public/images/products` for hoodies, jeans, shirts, and shoes

## Tech stack

- Next.js 15 with React 19 and the App Router
- TypeScript
- Tailwind CSS 4
- Drizzle ORM with PostgreSQL
- Radix UI, Lucide React, React Hook Form, and Zod

## Getting started

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The database must be configured for the Drizzle files before using database-backed pages or seed commands. Available database scripts are:

```bash
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:seed
npm run db:studio
```

## Other commands

```bash
npm run build
npm run start
npm run lint
```

The application metadata identifies the project as **yeezy** and uses the DM Mono font globally.
