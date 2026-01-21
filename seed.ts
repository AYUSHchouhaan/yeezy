import { db } from './db';
import {categories } from './db/schema';

async function seed() {
  try {
    console.log('Seeding database...');

    // Insert categories
    await db.insert(categories).values([
      { name: 'Hoodies', slug: 'hoodies' },
      { name: 'Shoes', slug: 'shoes' },
      { name: 'Shirts', slug: 'shirts' },
      { name: 'Jeans', slug: 'jeans' },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
