"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AuthModal } from "./Modals/AuthModal";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	AlignJustify,
	Loader2,
	Home,
	Building2,
	Info,
	Settings,
} from "lucide-react";
import { Drawer, DrawerContent } from "./ui/drawer";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "@/store/AuthContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CgProfile } from "react-icons/cg";
import { IoExitOutline } from "react-icons/io5";
import { useLogoutMutation } from "@/store/baseApi";
import { toast } from "sonner";

const NavBar: React.FC = () => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const [changeBack, setChangeBack] = useState(pathname !== "/");
	const [openDrawer, setOpenDrawer] = useState(false);
	const { token, data, refreshTokenFromCookie } = useAuth();
	const [logout, { isLoading }] = useLogoutMutation();

	const NavLinks = [
		{ name: "Home", link: "/", icon: Home },
		{ name: "Rooms", link: "/rooms", icon: Building2 },
		{ name: "About", link: "/about", icon: Info },
	];

	useEffect(() => {
		if (pathname === "/") {
			const change = () => {
				setChangeBack(window.scrollY > 50);
			};
			window.addEventListener("scroll", change);
			setChangeBack(window.scrollY > 50);
			return () => window.removeEventListener("scroll", change);
		} else {
			setChangeBack(true);
		}
	}, [pathname]);
	const router = useRouter();

	const handleLogout = async () => {
		const res = await logout();
		if (res) {
			toast.success("Logout Successful");
			router.replace("/");
		}
		refreshTokenFromCookie();
	};

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					changeBack
						? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
						: "bg-transparent"
				}`}>
				<div className="container mx-auto px-6 lg:px-8">
					<div className="flex justify-between items-center h-20">
						{/* Logo */}
						<Link
							href="/"
							className="flex items-center space-x-2">
							<div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
								<span className="text-white font-bold text-lg">K</span>
							</div>
							<span
								className={`jakarta-font text-2xl font-bold ${
									changeBack ? "text-gray-900" : "text-white"
								}`}>
								Kanchenjunga
							</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-8">
							{NavLinks.map((nav, index) => {
								const IconComponent = nav.icon;
								return (
									<Link
										key={index}
										href={nav.link}
										className={`relative group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
											pathname === nav.link
												? changeBack
													? "bg-purple-100 text-purple-700"
													: "bg-white/20 text-white"
												: changeBack
												? "text-gray-700 hover:text-purple-700 hover:bg-gray-100"
												: "text-white/80 hover:text-white hover:bg-white/10"
										}`}>
										<IconComponent size={18} />
										<span className="font-medium">{nav.name}</span>
									</Link>
								);
							})}
						</div>

						{/* Auth Section */}
						<div className="hidden md:flex items-center space-x-4">
							{data ? (
								<HoverCard>
									<HoverCardTrigger asChild>
										<Avatar className="cursor-pointer ring-2 ring-white/30 hover:ring-purple-400 transition-all duration-50 w-10 h-10">
											{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
											<AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
												{data?.data?.name?.charAt(0) || "U"}
											</AvatarFallback>
										</Avatar>
									</HoverCardTrigger>

									<HoverCardContent className="w-72 mr-4 mt-2 p-0 rounded-2xl shadow-luxury border-0 bg-white/95 backdrop-blur-md">
										<div className="p-6">
											{/* User Info */}
											<div className="flex items-center space-x-4 mb-4">
												<Avatar className="w-12 h-12">
													{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
													<AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-lg">
														{data?.data?.name?.charAt(0) || "U"}
													</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-semibold text-gray-900">
														{data?.data.name}
													</p>
													<p className="text-sm text-gray-600">
														{data?.data.email}
													</p>
												</div>
											</div>

											<div className="border-t border-gray-200 my-4" />

											{/* Action Links */}
											<div className="space-y-2">
												<Link
													href="/profile"
													className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
													<CgProfile className="text-lg text-purple-600" />
													<span className="text-gray-700">Profile</span>
												</Link>
												<button
													onClick={handleLogout}
													className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
													{isLoading ? (
														<Loader2
															className="animate-spin text-lg"
															size={18}
														/>
													) : (
														<IoExitOutline className="text-lg" />
													)}
													<span>Logout</span>
												</button>
											</div>
										</div>
									</HoverCardContent>
								</HoverCard>
							) : (
								<Button
									onClick={() => setOpen(true)}
									className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
									Sign In
								</Button>
							)}
						</div>

						{/* Mobile menu button */}
						<Button
							onClick={() => setOpenDrawer(true)}
							variant="ghost"
							size="icon"
							className={`md:hidden ${
								changeBack
									? "text-gray-700 hover:bg-gray-100"
									: "text-white hover:bg-white/10"
							}`}>
							<AlignJustify size={24} />
						</Button>
					</div>
				</div>
			</nav>

			{/* Auth Modal */}
			{open && (
				<AuthModal
					open={open}
					closed={() => setOpen(false)}
				/>
			)}

			{/* Mobile Drawer */}
			<Drawer
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				direction="left">
				<DrawerContent className="block lg:hidden p-0 bg-white h-full w-[85%] border-r border-gray-200">
					<div className="flex flex-col h-full">
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
									<span className="text-white font-bold">K</span>
								</div>
								<span className="jakarta-font text-xl font-bold text-gray-900">
									Kanchenjunga
								</span>
							</div>
							<Button
								onClick={() => setOpenDrawer(false)}
								variant="ghost"
								size="icon"
								className="text-gray-500 hover:bg-gray-100">
								<RxCross2 size={20} />
							</Button>
						</div>

						{/* Navigation Links */}
						<div className="flex-1 px-6 py-8 space-y-4">
							{NavLinks.map((nav, index) => {
								const IconComponent = nav.icon;
								return (
									<Link
										key={index}
										href={nav.link}
										onClick={() => setOpenDrawer(false)}
										className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
											pathname === nav.link
												? "bg-purple-100 text-purple-700"
												: "text-gray-700 hover:bg-gray-100"
										}`}>
										<IconComponent size={20} />
										<span className="font-medium">{nav.name}</span>
									</Link>
								);
							})}
						</div>

						{/* Footer */}
						<div className="p-6 border-t border-gray-200">
							{data ? (
								<div className="space-y-4">
									<div className="flex items-center space-x-3">
										<Avatar className="w-10 h-10">
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
												{data?.data?.name?.charAt(0) || "U"}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold text-gray-900">
												{data?.data.name}
											</p>
											<p className="text-sm text-gray-600">
												{data?.data.email}
											</p>
										</div>
									</div>
									<Button
										onClick={handleLogout}
										variant="ghost"
										className="w-full justify-start text-red-600 hover:bg-red-50">
										{isLoading ? (
											<Loader2
												className="animate-spin mr-2"
												size={18}
											/>
										) : (
											<IoExitOutline
												className="mr-2"
												size={18}
											/>
										)}
										Logout
									</Button>
								</div>
							) : (
								<Button
									onClick={() => {
										setOpen(true);
										setOpenDrawer(false);
									}}
									className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl">
									Sign In
								</Button>
							)}
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default NavBar;
