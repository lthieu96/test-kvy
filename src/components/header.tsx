import { Icon } from '@iconify/react';
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardHeader,
	Navbar,
	NavbarBrand,
	NavbarContent,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@nextui-org/react';

const Header = () => {
	return (
		<Navbar height="60px">
			<NavbarBrand>
				<Icon icon="solar:home-2-bold-duotone" style={{ fontSize: '32px' }} />
				<span className="ml-2 text-small font-medium">KVY STORE</span>
			</NavbarBrand>
			<NavbarContent justify="end">
				<Popover offset={12} placement="bottom-end">
					<PopoverTrigger>
						<Button
							disableRipple
							isIconOnly
							className="overflow-visible"
							radius="full"
							variant="light"
						>
							<Badge
								color="danger"
								content={50}
								isInvisible={false}
								shape="circle"
							>
								<Icon
									icon="solar:cart-large-2-bold-duotone"
									style={{ fontSize: '28px' }}
								/>
							</Badge>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[90vw] p-0 sm:max-w-[380px]">
						<Card className="w-full max-w-[420px]">
							<CardHeader>
								<h4 className="text-medium font-bold">Shopping Cart</h4>
							</CardHeader>
							<CardBody>No products selected yet</CardBody>
						</Card>
					</PopoverContent>
				</Popover>
			</NavbarContent>
		</Navbar>
	);
};

export default Header;
