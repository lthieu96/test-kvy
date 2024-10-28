import { useQueries, useQuery } from '@tanstack/react-query';
import { getCategories, getProduct, getProducts } from './fetchers';

export const useProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});
};

export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
	});
};

export const useProductsByIds = (productIds: number[]) => {
	const queries = useQueries({
		queries: productIds.map(
			(id) => ({
				queryKey: ['product', id],
				queryFn: () => getProduct(id),
			}),
			{
				enabled: productIds.length > 0,
			},
		),
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.some((result) => result.isPending),
			};
		},
	});
	return queries;
};
