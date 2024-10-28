import { Icon } from '@iconify/react';
import { Button, cn, Image, Input, Tooltip } from '@nextui-org/react';
import React from 'react';
import { CartItemWithProduct } from '../types/cart';
import { useCartStore } from '../store/cart-store';

export type CartItemProps = React.HTMLAttributes<HTMLLIElement> & {
	data: CartItemWithProduct;
};

const CartItem = React.forwardRef<HTMLLIElement, CartItemProps>(
	(
		{ children, data: { quantity, product: productInfo }, className, ...props },
		ref,
	) => {
		const { removeItem, updateQuantity } = useCartStore();

		return (
			<li
				ref={ref}
				className={cn(
					'flex items-center gap-x-4 border-b-small border-divider py-4',
					className,
				)}
				{...props}
			>
				<div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
					<Image
						alt={productInfo.title}
						src={productInfo.image}
						height={'80%'}
					/>
				</div>
				<div className="flex flex-1 flex-col">
					<h4 className="text-small">
						<div className="font-medium text-foreground">
							{productInfo.title || children}
						</div>
					</h4>
					<div className="mt-2 flex w-[fit-content] items-center gap-2">
						<span className="text-small font-semibold text-default-700">
							${productInfo.price}
						</span>
						<span className="text-small text-default-500">x </span>
						<Input
							type="number"
							size="sm"
							min={1}
							max={50}
							value={quantity.toString()}
							onChange={(e) =>
								updateQuantity(productInfo.id, Number(e.target.value))
							}
						/>
					</div>
				</div>
				<Tooltip content="Remove" placement="top">
					<Button
						isIconOnly
						className="h-7 w-7 min-w-[1.5rem]"
						radius="full"
						variant="flat"
						onClick={() => removeItem(productInfo.id)}
					>
						<Icon icon="lucide:x" width={14} />
					</Button>
				</Tooltip>
			</li>
		);
	},
);

export default CartItem;
