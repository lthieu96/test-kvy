import type { PopoverProps } from '@nextui-org/react';

import React from 'react';
import {
	Button,
	cn,
	Divider,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';

export type PopoverFilterWrapperProps = Omit<PopoverProps, 'children'> & {
	title?: string;
	children: React.ReactNode;
	hideActions?: boolean;
	onApply?: () => void;
	onCancel?: () => void;
};

const PopoverFilterWrapper = React.forwardRef<
	HTMLDivElement,
	PopoverFilterWrapperProps
>(
	(
		{ title, children, hideActions = false, onApply, onCancel, ...props },
		ref,
	) => {
		const { isOpen, onClose, onOpenChange } = useDisclosure();

		const handleApply = () => {
			typeof onApply === 'function' && onApply();
			onClose();
		};

		const handleCancel = () => {
			typeof onCancel === 'function' && onCancel();
			onClose();
		};

		return (
			<Popover ref={ref} isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
				<PopoverTrigger>
					<Button
						className="border-default-200 text-default-700"
						endContent={<Icon icon="solar:alt-arrow-down-linear" />}
						variant="bordered"
					>
						{title}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="flex max-w-xs flex-col items-start gap-2 px-4 pt-4">
					<span className="mb-2 text-medium font-medium text-default-600">
						{title}
					</span>
					<div className={cn('w-full px-2', hideActions && 'pb-4')}>
						{children}
					</div>

					{!hideActions && (
						<>
							<Divider className="mt-3 bg-default-100" />
							<div className="flex w-full justify-end gap-2 py-2">
								<Button size="sm" variant="flat" onPress={handleCancel}>
									Cancel
								</Button>
								<Button
									color="primary"
									size="sm"
									variant="flat"
									onPress={handleApply}
								>
									Apply
								</Button>
							</div>
						</>
					)}
				</PopoverContent>
			</Popover>
		);
	},
);

export default PopoverFilterWrapper;
