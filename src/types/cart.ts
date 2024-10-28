import { Product } from './product';

export type CartItem = {
	quantity: number;
	productId: number;
};

export type CartItemWithProduct = CartItem & {
	product: Product;
};
