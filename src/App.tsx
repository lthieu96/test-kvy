import ProductsGrid from './components/product-grid';
import Header from './components/header';
import {
	CheckboxGroup,
	Input,
	Pagination,
	Select,
	SelectItem,
	Spinner,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import PopoverFilterWrapper from './components/popover-filter-wrapper';
import TagItem from './components/tag-item';
import RatingRadioGroup from './components/rating-group';
import PriceSlider from './components/price-slider';
import { useCategories, useProducts } from './service/queries';
import { useMemo, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

const PRICE_RANGE = {
	MIN: 0,
	MAX: 5000,
	STEP: 1,
};

const SORT_OPTIONS = [
	{ key: 'most_popular', label: 'Most Popular' },
	{ key: 'name_asc', label: 'Name: A to Z' },
	{ key: 'name_desc', label: 'Name: Z to A' },
	{ key: 'price_asc', label: 'Price: Low to High' },
	{ key: 'price_desc', label: 'Price: High to Low' },
	{ key: 'rating', label: 'Top Rated' },
] as const;

function App() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedRating, setSelectedRating] = useState<string>('');
	const [sortBy, setSortBy] = useState<string>('most_popular');
	const [priceRange, setPriceRange] = useState<[number, number]>([
		PRICE_RANGE.MIN,
		PRICE_RANGE.MAX,
	]);
	const [page, setPage] = useState(1);

	const queryString = useMemo(() => {
		const params = new URLSearchParams();

		if (searchQuery) params.set('search', searchQuery);
		if (selectedCategories.length)
			params.set('categories', selectedCategories.join(','));
		if (selectedRating) params.set('rating', selectedRating);
		if (sortBy) params.set('sort', sortBy);
		params.set('min_price', String(priceRange[0]));
		params.set('max_price', String(priceRange[1]));
		setPage(1);

		return params.toString();
	}, [searchQuery, selectedCategories, selectedRating, sortBy, priceRange]);

	const { data, isLoading: productsLoading } = useProducts(
		`${queryString}&page=${page}`,
	);

	const { data: categories, isLoading: categoriesLoading } = useCategories();

	const debouncedSetPriceRange = useDebounceCallback(setPriceRange, 500);
	const debouncedSetSearchQuery = useDebounceCallback(setSearchQuery, 300);

	return (
		<>
			<Header />

			<div className="mx-auto my-4 flex h-full w-full max-w-7xl flex-col gap-4 px-2 lg:px-24">
				<div className="relative flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:flex-row md:justify-between md:pt-3">
					<Input
						isClearable
						radius="lg"
						variant="bordered"
						placeholder="Search..."
						startContent={<Icon icon="solar:magnifer-broken" />}
						className="md:max-w-xs"
						onChange={(e) => debouncedSetSearchQuery(e.target.value)}
					/>
					<div className="flex flex-wrap gap-2">
						<PopoverFilterWrapper title="Pricing Range" hideActions>
							<PriceSlider
								range={{
									min: 0,
									max: 5000,
									step: 1,
									defaultValue: priceRange,
								}}
								onValueChange={debouncedSetPriceRange}
							/>
						</PopoverFilterWrapper>

						<PopoverFilterWrapper title="Rating" hideActions>
							<RatingRadioGroup
								isDisabled={productsLoading}
								className="w-72"
								color="warning"
								value={selectedRating}
								onValueChange={setSelectedRating}
							/>
						</PopoverFilterWrapper>

						<PopoverFilterWrapper title="Categories" hideActions>
							<CheckboxGroup
								aria-label="Select category"
								className="gap-1"
								orientation="horizontal"
								value={selectedCategories}
								onChange={setSelectedCategories}
							>
								{categoriesLoading && (
									<Spinner size="sm" className="my-4 w-full" />
								)}

								{categories?.map((category) => (
									<TagItem key={category} value={category}>
										{category}
									</TagItem>
								))}

								{categories?.length === 0 && 'No categories found'}
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
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							{SORT_OPTIONS.map(({ key, label }) => (
								<SelectItem key={key} value={key}>
									{label}
								</SelectItem>
							))}
						</Select>
					</div>
				</div>
				<main className="h-full w-full overflow-visible px-1">
					{productsLoading && <Spinner size="md" className="mt-4 w-full" />}

					{data?.items?.length ? (
						<div className="flex min-h-full flex-col items-center justify-between gap-4">
							<ProductsGrid
								products={data.items}
								className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
							/>
							<Pagination
								total={data.pagination.totalPages}
								initialPage={page}
								onChange={(v) => {
									window.scrollTo(0, 0);
									setPage(v);
								}}
							/>
						</div>
					) : null}

					{data?.items?.length === 0 && 'No products found'}
				</main>
			</div>
		</>
	);
}

export default App;
