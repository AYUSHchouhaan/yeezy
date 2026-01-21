import { db } from './db';
import { products } from './db/schema';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface ProductCSV {
  name: string;
  description: string;
  price: string;
  category: string;
  image1: string;
  alt1: string;
}

async function importProductsFromCSV(csvFilePath: string) {
  try {
    console.log('📥 Reading CSV file...');

    // Read CSV file
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');

    // Parse CSV
    const records: ProductCSV[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log(` Found ${records.length} products to import\n`);

    let successCount = 0;
    let errorCount = 0;

    // Process each product
    for (const record of records) {
      try {
        // Skip empty rows
        if (!record.name || !record.category) {
          console.log('⏭️  Skipping empty row');
          continue;
        }

        const images = [];

        // Add image
        if (record.image1) {
          images.push({ src: record.image1, alt: record.alt1 || record.name });
        }

        // Convert price to cents
        const priceInCents = Math.round(parseFloat(record.price) * 100);

        await db.insert(products).values({
          name: record.name,
          description: record.description,
          price: priceInCents,
          category: record.category.toLowerCase().trim(),
          images: images,
        });

        console.log(`✓ Imported: ${record.name} ($${record.price})`);
        successCount++;
      } catch (error) {
        console.error(`✗ Error importing ${record.name}:`, error);
        errorCount++;
      }
    }

    console.log(`\n📊 Import Summary:`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`\n🎉 CSV import completed!`);
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Usage: bun run import-csv.ts products-bulk.csv
const csvFile = process.argv[2];
if (!csvFile) {
  console.error('❌ Please provide a CSV file path as an argument');
  console.error('📝 Example: bun run import-csv.ts products-bulk.csv');
  process.exit(1);
}

const csvPath = path.resolve(csvFile);
if (!fs.existsSync(csvPath)) {
  console.error(`❌ File not found: ${csvPath}`);
  process.exit(1);
}

importProductsFromCSV(csvPath);