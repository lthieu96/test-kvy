import { Product } from '../types/product';
import { apiClient } from './api-client';

export const getProducts = async (query?: string) => {
	const response = await apiClient.get<Product[]>('/products');

	if (!query) {
		return response.data;
	}

	const queryObject = new URLSearchParams(query);
	const search = queryObject.get('search');
	const maxPrice = parseInt(queryObject.get('max_price') || '5000', 10);
	const minPrice = parseInt(queryObject.get('min_price') || '0', 10);
	const categories = queryObject.get('categories')?.split(',');
	const rating = parseInt(queryObject.get('rating') || '1', 10);
	const sort = queryObject.get('sort');

	const filteredProducts = response.data.filter((product) => {
		if (search && !product.title.toLowerCase().includes(search.toLowerCase())) {
			return false;
		}
		if (categories && !categories.includes(product.category)) {
			return false;
		}
		if (maxPrice && product.price > maxPrice) {
			return false;
		}
		if (minPrice && product.price < minPrice) {
			return false;
		}
		if (rating && product.rating.rate < rating) {
			return false;
		}
		return true;
	});

	if (sort && sort !== 'most_popular') {
		filteredProducts.sort((a, b) => {
			switch (sort) {
				case 'price_asc':
					return a.price - b.price;
				case 'price_desc':
					return b.price - a.price;
				case 'name_asc':
					return a.title.localeCompare(b.title);
				case 'name_desc':
					return b.title.localeCompare(a.title);
				case 'rating':
					return b.rating.rate - a.rating.rate;
				default:
					return 0;
			}
		});
	}

	return filteredProducts;
};

export const getProduct = async (id: number) => {
	const response = await apiClient.get<Product>(`/products/${id}`);
	return response.data;
};

export const getCategories = async () => {
	const response = await apiClient.get<string[]>('/products/categories');
	return response.data;
};
