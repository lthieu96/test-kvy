import ProductsGrid from './components/product-grid';
import Header from './components/header';
import { CheckboxGroup, Input, Select, SelectItem } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import PopoverFilterWrapper from './components/popover-filter-wrapper';
import TagItem from './components/tag-item';
import RatingRadioGroup from './components/rating-group';
import PriceSlider from './components/price-slider';

function App() {
	return (
		<>
			<Header />
			<div className="mx-auto my-4 flex h-full w-full max-w-7xl flex-col gap-4 px-2 lg:px-24">
				<div className="relative flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:flex-row md:justify-between md:gap-0 md:pt-3">
					<Input
						isClearable
						radius="lg"
						variant="bordered"
						placeholder="Search..."
						startContent={<Icon icon="solar:magnifer-broken" />}
						className="md:max-w-sm"
					/>
					<div className="flex flex-wrap gap-2">
						<PopoverFilterWrapper title="Pricing Range">
							<PriceSlider
								range={{ min: 0, max: 5000, step: 1, defaultValue: [0, 5000] }}
							/>
						</PopoverFilterWrapper>

						<PopoverFilterWrapper title="Rating">
							<RatingRadioGroup className="w-72" color="warning" />
						</PopoverFilterWrapper>

						<PopoverFilterWrapper title="Categories">
							<CheckboxGroup
								aria-label="Select category"
								className="gap-1"
								orientation="horizontal"
							>
								<TagItem value="sneakers">Sneakers</TagItem>
								<TagItem value="boots">Boots</TagItem>
								<TagItem value="sandals">Sandals</TagItem>
								<TagItem value="slippers">Slippers</TagItem>
							</CheckboxGroup>
						</PopoverFilterWrapper>

						<Select
							aria-label="Sort by"
							classNames={{
								base: 'items-center justify-end max-w-fit',
								value: 'w-[112px]',
							}}
							defaultSelectedKeys={['most_popular']}
							labelPlacement="outside-left"
							placeholder="Select an option"
							variant="bordered"
						>
							<SelectItem key="price_low_to_high" value="price_low_to_high">
								Price: Low to High
							</SelectItem>
							<SelectItem key="price_high_to_low" value="price_high_to_low">
								Price: High to Low
							</SelectItem>
							<SelectItem key="top_rated" value="top_rated">
								Top Rated
							</SelectItem>
							<SelectItem key="most_popular" value="most_popular">
								Most Popular
							</SelectItem>
						</Select>
					</div>
				</div>
				<main className="h-full w-full overflow-visible px-1">
					<ProductsGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
				</main>
			</div>
		</>
	);
}

export default App;
