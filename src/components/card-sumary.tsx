import { Button, Spinner } from '@nextui-org/react';
import { useProductsByIds } from '../service/queries';
import { useCartStore } from '../store/cart-store';
import { CartItemWithProduct } from '../types/cart';
import CartItem from './cart-item';

const CartSummary = () => {
	const { items, removeAll } = useCartStore();

	const { data: products, pending } = useProductsByIds(
		items.map((item) => item.productId),
	);

	const cartItems: CartItemWithProduct[] = [];
	items.forEach((item) => {
		const product = products.find((p) => p?.id === item.productId);
		if (!product) return;
		cartItems.push({
			...item,
			product,
		});
	});

	const total = cartItems.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0,
	);

	if (pending) {
		return <Spinner size="sm" />;
	}

	return (
		<div className="flex flex-col gap-4">
			{items.length === 0 && (
				<h5 className="w-full text-center text-medium">Your cart is empty</h5>
			)}
			<ul>
				{cartItems?.map((item) => (
					<CartItem key={item.productId} data={item} />
				))}
			</ul>

			<div className="flex justify-between">
				<div className="text-small font-semibold text-default-500">Total</div>
				<div className="text-small font-semibold text-default-700">
					${total}
				</div>
			</div>

			<Button isDisabled={!cartItems.length} color="primary">
				Checkout
			</Button>
		</div>
	);
};

export default CartSummary;
