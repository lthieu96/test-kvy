import { cn, Divider, Input, Slider, SliderProps } from '@nextui-org/react';
import React from 'react';

export type RangeValue = [number, number];

export type RangeFilter = {
	min: number;
	max: number;
	step: number;
	defaultValue: RangeValue;
};

export type PriceSliderProps = Omit<SliderProps, 'ref'> & {
	range?: RangeFilter;
};

function clampValue(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

const PriceSlider = React.forwardRef<HTMLDivElement, PriceSliderProps>(
	({ range, className, ...props }, ref) => {
		const defaultValue = React.useMemo<RangeValue>(
			() => range?.defaultValue || [0, 1000],
			[range?.defaultValue],
		);

		const [value, setValue] = React.useState<RangeValue>(defaultValue);

		const onMinInputValueChange = React.useCallback(
			(inputValue: string) => {
				const newValue = Number(inputValue);
				const minValue = range?.min ?? defaultValue[0];

				if (!isNaN(newValue)) {
					const clampedValue = clampValue(newValue, minValue, value[1]);

					setValue([clampedValue, value[1]]);
				}
			},
			[value, range?.min, defaultValue],
		);

		const onMaxInputValueChange = React.useCallback(
			(inputValue: string) => {
				const newValue = Number(inputValue);
				const maxValue = range?.max ?? defaultValue[1];

				if (!isNaN(newValue) && newValue <= maxValue) {
					setValue([value[0], newValue]);
				}
			},
			[value, range?.max, defaultValue],
		);

		return (
			<div className={cn('flex flex-col gap-3', className)}>
				<div className="flex flex-col gap-1">
					<Slider
						{...props}
						ref={ref}
						formatOptions={{ style: 'currency', currency: 'USD' }}
						maxValue={range?.max}
						minValue={range?.min}
						size="sm"
						step={range?.step}
						value={value}
						onChange={(value) => {
							setValue(value as RangeValue);
						}}
					/>
				</div>
				<div className="flex items-center">
					<Input
						aria-label="Min price"
						labelPlacement="outside"
						startContent={<p className="text-default-400">$</p>}
						type="number"
						value={`${value[0]}`}
						onValueChange={onMinInputValueChange}
					/>
					<Divider className="mx-2 w-2" />
					<Input
						aria-label="Max price"
						labelPlacement="outside"
						startContent={<p className="text-default-400">$</p>}
						type="number"
						value={`${value[1]}`}
						onValueChange={onMaxInputValueChange}
					/>
				</div>
			</div>
		);
	},
);

export default PriceSlider;
