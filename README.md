# Yeezy Store

Yeezy is a Next.js 15 e-commerce storefront for browsing fashion products by category, viewing product details, and managing a client-side shopping cart. Products and categories are read from PostgreSQL through Drizzle ORM, while product images are served from `public/images/products`.

## Project structure

- `app/` — Next.js App Router pages and API routes.
  - `app/page.tsx` — home page; groups products into category sections.
  - `app/[category]/page.tsx` — category listing page.
  - `app/[category]/[product]/page.tsx` — product detail page with quantity controls, cart actions, description, and recommendations.
  - `app/product/[id]/page.tsx` — reserved product route currently containing no implementation.
  - `app/layout.tsx` — shared document layout, providers, and site-wide UI.
  - `app/globals.css` — global styles.
  - `app/api/prefetch-images/[...rest]/route.ts` — image prefetch API route.
- `components/` — reusable React UI.
  - `header.tsx` — navigation menu and cart drawer.
  - `productgrid.tsx` — responsive product-card grid.
  - `product/` — product quantity and cart summary/action components.
  - `ui/` — reusable Radix/shadcn-style primitives such as buttons, dialogs, forms, menus, tabs, and inputs.
- `actions/` — server-side product and category data access (`getproduct.ts`, `getproduct-db.ts`).
- `db/` — Drizzle database connection, schema, queries, and session helpers. Main tables are `users`, `products`, and `categories`.
- `providers/` — application context providers; `cart-context.tsx` stores cart state in the browser.
- `hooks/` — custom hooks including `use-cart.ts` and mobile detection.
- `lib/` — shared data and utilities.
- `public/` — static assets and categorized product images.
- `migrations/` — generated Drizzle SQL migrations.
- `products-bulk.csv`, `seed.ts`, `import-csv.ts` — product data and database seeding/import scripts.
- `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json` — framework and build configuration.

## Main flow

The home and category pages fetch products from the database, `ProductGrid` links each item to `/{category}/{id}`, and the detail page uses the cart provider to add or update quantities. The header exposes the current cart and subtotal in a drawer.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
