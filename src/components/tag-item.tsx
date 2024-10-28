import type { CheckboxProps } from '@nextui-org/react';

import React from 'react';
import { Chip, VisuallyHidden, useCheckbox } from '@nextui-org/react';
import { cn } from '@nextui-org/react';

export type TagItemProps = CheckboxProps;

const TagItem = React.forwardRef<HTMLLabelElement, TagItemProps>(
	({ icon, size = 'md', ...props }, ref) => {
		const {
			children,
			isSelected,
			isFocusVisible,
			getBaseProps,
			getLabelProps,
			getInputProps,
		} = useCheckbox({
			...props,
		});

		return (
			<label {...getBaseProps()} ref={ref}>
				<VisuallyHidden>
					<input {...getInputProps()} />
				</VisuallyHidden>
				{/* @ts-ignore */}
				<Chip
					classNames={{
						base: cn({
							'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background':
								isFocusVisible,
							'bg-primary': isSelected,
						}),
						content: cn('!text-small text-default-400', {
							'text-primary-foreground': isSelected,
						}),
					}}
					radius="sm"
					size={size}
					variant="flat"
					{...getLabelProps()}
				>
					{children}
				</Chip>
			</label>
		);
	},
);

export default TagItem;
