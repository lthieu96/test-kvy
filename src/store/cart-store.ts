import { create } from 'zustand';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartStore {
	items: CartItem[];
	addItem: (product: Product) => void;
	removeItem: (productId: number) => void;
	removeAll: () => void;
	updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			items: [],
			addItem: (product) =>
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.productId === product.id,
					);

					if (existingItem) {
						return {
							items: state.items.map((item) => {
								if (item.productId === product.id) {
									return {
										...item,
										quantity: item.quantity + 1,
									};
								}
								return item;
							}),
						};
					} else {
						return {
							items: [...state.items, { productId: product.id, quantity: 1 }],
						};
					}
				}),
			removeItem: (productId) =>
				set((state) => ({
					items: state.items.filter((item) => item.productId !== productId),
				})),
			removeAll: () => set(() => ({ items: [] })),
			updateQuantity: (productId, quantity) =>
				set((state) => ({
					items: state.items.map((item) => {
						if (item.productId === productId) {
							return { ...item, quantity };
						}
						return item;
					}),
				})),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
