import { db } from './db';
import { products, categories } from './db/schema';

async function deleteAllData() {
  try {
    console.log('🗑️  Deleting all data from database...\n');
    const deletedProducts = await db.delete(products);
    console.log('✓ Deleted all products');

    // Delete all categories
    const deletedCategories = await db.delete(categories);
    console.log('✓ Deleted all categories');

    console.log('\n✅ Database cleared successfully!');
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
}

deleteAllData();
