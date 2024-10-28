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
	onValueChange?: (value: RangeValue) => void;
};

function clampValue(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

const PriceSlider = React.forwardRef<HTMLDivElement, PriceSliderProps>(
	({ range, onValueChange, className, ...props }, ref) => {
		const defaultRange = React.useMemo(
			() => ({
				min: range?.min ?? 0,
				max: range?.max ?? 1000,
				defaultValue: range?.defaultValue ?? [0, 1000],
				step: range?.step ?? 1,
			}),
			[range],
		);

		const [value, setValue] = React.useState<RangeValue>(
			defaultRange.defaultValue,
		);

		const handleValueChange = React.useCallback(
			(newValue: RangeValue) => {
				setValue(newValue);
				typeof onValueChange === 'function' && onValueChange(newValue);
			},
			[onValueChange],
		);

		const onMinInputValueChange = React.useCallback(
			(inputValue: string) => {
				const newValue = Number(inputValue);

				if (!isNaN(newValue)) {
					const clampedValue = clampValue(newValue, defaultRange.min, value[1]);

					handleValueChange([clampedValue, value[1]]);
				}
			},
			[value, range?.min, defaultRange],
		);

		const onMaxInputValueChange = React.useCallback(
			(inputValue: string) => {
				const newValue = Number(inputValue);

				if (!isNaN(newValue) && newValue <= defaultRange.max) {
					handleValueChange([value[0], newValue]);
				}
			},
			[value, range?.max, defaultRange],
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
							handleValueChange(value as RangeValue);
						}}
						aria-label="Price Range"
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
