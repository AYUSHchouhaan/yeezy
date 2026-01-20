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

    // // Insert sample products
    // await db.insert(products).values([
    //   {
    //     name: 'Classic Hoodie',
    //     description: 'A comfortable and stylish hoodie perfect for everyday wear.',
    //     price: 7999, // $79.99 in cents
    //     category: 'hoodies',
    //     images: [
    //       { src: 'https://via.placeholder.com/600x600/333/fff?text=Classic+Hoodie', alt: 'Classic Hoodie' }
    //     ]
    //   },
    //   {
    //     name: 'Premium Sneakers',
    //     description: 'High-quality sneakers with superior comfort and style.',
    //     price: 12999, // $129.99 in cents
    //     category: 'shoes',
    //     images: [
    //       { src: 'https://via.placeholder.com/600x600/666/fff?text=Premium+Sneakers', alt: 'Premium Sneakers' }
    //     ]
    //   },
    //   {
    //     name: 'Cotton T-Shirt',
    //     description: 'Soft cotton t-shirt available in multiple colors.',
    //     price: 2999, // $29.99 in cents
    //     category: 'shirts',
    //     images: [
    //       { src: 'https://via.placeholder.com/600x600/999/fff?text=Cotton+T-Shirt', alt: 'Cotton T-Shirt' }
    //     ]
    //   },
    //   {
    //     name: 'Slim Fit Jeans',
    //     description: 'Modern slim fit jeans with premium denim fabric.',
    //     price: 8999, // $89.99 in cents
    //     category: 'jeans',
    //     images: [
    //       { src: 'https://via.placeholder.com/600x600/444/fff?text=Slim+Fit+Jeans', alt: 'Slim Fit Jeans' }
    //     ]
    //   },
    //   {
    //     name: 'Oversized Hoodie',
    //     description: 'Trendy oversized hoodie for a relaxed look.',
    //     price: 9499, // $94.99 in cents
    //     category: 'hoodies',
    //     images: [
    //       { src: 'https://via.placeholder.com/600x600/555/fff?text=Oversized+Hoodie', alt: 'Oversized Hoodie' }
    //     ]
    //   },
    //   {
    //     name: 'Running Shoes',
    //     description: 'Lightweight running shoes for active lifestyle.',
    //     price: 10999, // $109.99 in cents
    //     category: 'shoes',
    //     images: [
    //       { src: 'https://via.placeholder.com/600x600/777/fff?text=Running+Shoes', alt: 'Running Shoes' }
    //     ]
    //   }
    // ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
