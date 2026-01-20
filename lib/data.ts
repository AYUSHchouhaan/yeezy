import { getCategories } from '@/actions/getproduct';

export const navBarData = [
  {
    idx: 1,
    title: 'Hoodies',
    link: '/hoodies',
  },
  {
    idx: 2,
    title: 'Shoes',
    link: '/shoes',
  },
  {
    idx: 3,
    title: 'Shirts',
    link: '/shirts',
  },
  {
    idx: 4,
    title: 'Jeans',
    link: '/jeans',
  },
];

// Dynamic navigation data from database
export async function getNavBarData() {
  try {
    const categories = await getCategories();
    return categories.map((category, index) => ({
      idx: index + 1,
      title: category.name,
      link: `/${category.slug}`,
    }));
  } catch (error) {
    console.error('Error fetching categories for navigation:', error);
    return navBarData; // Fallback to static data
  }
}