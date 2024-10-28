import type { RadioGroupProps } from '@nextui-org/react';

import React from 'react';
import { RadioGroup } from '@nextui-org/react';
import { cn } from '@nextui-org/react';

import RatingRadioItem from './rating-item';

export type RatingRadioGroupProps = RadioGroupProps & {
	hideStarsText?: boolean;
	onValueChange?: (value: string) => void;
};

const RatingRadioGroup = React.forwardRef<
	HTMLDivElement,
	RatingRadioGroupProps
>(({ className, label, hideStarsText, onValueChange, ...props }, ref) => {
	const [value, setValue] = React.useState('1');
	const starsText = React.useMemo(() => {
		if (value === '5') {
			return '5 stars';
		}

		return `${value} stars & up`;
	}, [value]);

	return (
		<div className={cn('flex items-center gap-3', className)}>
			<RadioGroup
				ref={ref}
				value={value}
				{...props}
				defaultValue="1"
				orientation="horizontal"
				onValueChange={(v) => {
					setValue(v);
					typeof onValueChange === 'function' && onValueChange(v);
				}}
			>
				<RatingRadioItem value="1" />
				<RatingRadioItem value="2" />
				<RatingRadioItem value="3" />
				<RatingRadioItem value="4" />
				<RatingRadioItem value="5" />
			</RadioGroup>
			{label ? label : null}
			{!hideStarsText && (
				<p className="text-medium text-default-400">{starsText}</p>
			)}
		</div>
	);
});

export default RatingRadioGroup;
