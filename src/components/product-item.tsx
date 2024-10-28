import React from 'react';
import { Button, Image } from '@nextui-org/react';
import { cn } from '@nextui-org/react';

import RatingRadioGroup from './rating-group';
import { Product } from '../types/product';

export type ProductItemProps = React.HTMLAttributes<HTMLDivElement> & {
	product: Product;
};

const ProductItem = React.forwardRef<HTMLDivElement, ProductItemProps>(
	({ product, className, ...props }, ref) => {
		const { title, price, rating, description, image } = product;

		return (
			<div
				ref={ref}
				className={cn(
					'relative flex w-64 max-w-full flex-none scroll-ml-6 flex-col gap-3 rounded-large bg-content1 p-4 shadow-small',
					className,
				)}
				{...props}
			>
				<div
					className={
						'relative flex h-52 max-h-full w-full items-center justify-center overflow-visible'
					}
				>
					<Image
						removeWrapper
						alt={title}
						className={cn(
							'z-0 h-full max-h-full w-full max-w-[80%] scale-90 overflow-visible object-contain object-center hover:scale-100',
						)}
						src={image}
					/>
				</div>
				<div className="flex flex-col gap-3 px-1">
					<div className="flex items-center justify-between">
						<h3 className="line-clamp-1 text-medium font-medium text-default-700">
							{title}
						</h3>
						<p className="text-medium font-medium text-default-500">${price}</p>
					</div>
					<p className="line-clamp-3 text-small text-default-500">
						{description}
					</p>
					<RatingRadioGroup
						isReadOnly
						hideStarsText
						className="gap-1"
						label={
							<p className="text-small text-default-400">({rating.count})</p>
						}
						size="sm"
						color="warning"
						value={`${rating.rate}`}
					/>
					<div className="flex gap-2">
						<Button
							fullWidth
							className="font-medium"
							color="primary"
							radius="lg"
						>
							Add to cart
						</Button>
					</div>
				</div>
			</div>
		);
	},
);

export default ProductItem;
