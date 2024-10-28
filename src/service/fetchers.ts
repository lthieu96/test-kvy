import { Product } from '../types/product';
import { apiClient } from './api-client';

export const getProducts = async () => {
	const response = await apiClient.get<Product[]>('/products');
	return response.data;
};

export const getProduct = async (id: number) => {
	const response = await apiClient.get<Product>(`/products/${id}`);
	return response.data;
};

export const getCategories = async () => {
	const response = await apiClient.get<string[]>('/products/categories');
	return response.data;
};
