import React from 'react';
import { cn } from '@nextui-org/react';

import ProductItem from './product-item';
import { Product } from '../types/product';

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
	itemClassName?: string;
	products: Product[];
};

const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
	({ products, itemClassName, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
					className,
				)}
				{...props}
			>
				{products.map((product) => (
					<ProductItem
						key={product.id}
						product={product}
						className={cn('w-full', itemClassName)}
					/>
				))}
			</div>
		);
	},
);

export default ProductsGrid;
