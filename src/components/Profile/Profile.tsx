"use client";
import { useAuth } from "@/store/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ErrorMessage, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Eye,
	EyeOffIcon,
	Loader2,
	User,
	Hotel,
	Settings,
	LogOut,
	Star,
	Calendar,
	MapPin,
	Edit3,
	Mail,
	Phone,
	UserCheck,
	Award,
	Clock,
	CheckCircle,
	Shield,
} from "lucide-react";
import { useLogoutMutation, useUpdateProfileMutation } from "@/store/baseApi";
import { toast } from "sonner";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useDeleteBookingMutation } from "@/store/features/rooms";
import { ReviewModal } from "@/components/Modals/ReviewModal";
import { ResetPassword } from "@/components/Modals/ResetPassword";
import { useRouter } from "next/navigation";

const tabs = [
	{
		id: 1,
		name: "My Profile",
		icon: <User size={20} />,
		description: "Personal information and settings",
	},
	{
		id: 2,
		name: "My Bookings",
		icon: <Hotel size={20} />,
		description: "View and manage your reservations",
	},
];

interface Listing {
	id: number;
	images: [{ id: number; url: string }];
	description: string;
	doubleOccupancy: number;
	singleOccupancy: number;
	title: string;
	reviews: [
		{
			id: number;
			content: string;
			rating: number;
		}
	];
	type: "AC" | "NonAC" | "Both";
}

interface BookingData {
	id: number;
	startDate: string;
	endDate: string; // End date
	numberOfGuests: number;
	purpose: "Personal" | "Campus_Recruitment";
	type: "AC" | "NonAC";
	total: number;
	listing: Listing;
}

const Profile = () => {
	const { data, refetch } = useAuth();
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();
	const [
		update,
		{ isError: isUpdateError, error: updateError, isLoading: isUpdateLoading },
	] = useUpdateProfileMutation();
	const [activeTab, setActiveTab] = useState(1);
	const [open, setOpen] = useState<boolean>(false);
	const [logout, { isError, error }] = useLogoutMutation();
	const [reviewModal, setReviewModal] = useState<{
		open: boolean;
		booking: BookingData | null;
	}>({ open: false, booking: null });

	const handleLogout = async () => {
		const res = await logout();
		if (res.data?.success) {
			toast.success(res.data.message);
			router.refresh();
			router.push("/");
		}
	};

	const handleSubmit = async (values: any) => {
		const res = await update(values);
		if (res.data?.success) {
			toast.success(res.data.message);
			refetch();
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(
				(error as { data?: { message?: string } })?.data?.message ||
					"Failed to Logout"
			);
		}
	}, [error, isError]);

	const plugin = React.useRef(
		Autoplay({ delay: 3000, stopOnInteraction: true })
	);

	const bookings = data?.data.bookings || [];
	const myReviews = data?.data.reviews || [];
	const userStats = {
		totalBookings: bookings.length,
		totalStays: 12,
		memberSince: data?.data.createdAt
			? new Date(data.data.createdAt).toLocaleDateString("en-IN", {
					month: "long",
					year: "numeric",
			  })
			: "",
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20">
			<div className="container mx-auto px-6 py-8">
				{/* Header */}
				<div className="mb-8 fade-in">
					<h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 jakarta-font">
						My Account
					</h1>
					<p className="text-gray-600 text-lg">
						Manage your profile, bookings, and account settings
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Sidebar */}
					<div className="lg:col-span-1">
						<Card className="shadow-soft border border-gray-200 sticky top-24">
							<CardContent className="p-6">
								{/* User Profile Summary */}
								<div className="text-center mb-6 pb-6 border-b border-gray-100">
									<Avatar className="w-20 h-20 mx-auto mb-4">
										<AvatarImage
											src="/images/user-avatar.jpg"
											alt={data?.data.name}
										/>
										<AvatarFallback className="text-xl font-bold bg-blue-100 text-blue-600">
											{data?.data.name
												?.split(" ")
												.map((n: string) => n[0])
												.join("")
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<h3 className="text-lg font-semibold text-gray-900 mb-1">
										{data?.data.name}
									</h3>
									<p className="text-gray-600 text-sm">{data?.data.email}</p>
									<Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
										<UserCheck className="w-3 h-3 mr-1" />
										Verified{" "}
										{data?.data.role
											? data.data.role.charAt(0).toUpperCase() +
											  data.data.role.slice(1).toLowerCase()
											: ""}
									</Badge>
								</div>

								{/* Navigation Tabs */}
								<nav className="space-y-2 mb-6">
									{tabs.map((tab) => (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
												tab.id === activeTab
													? "bg-blue-100 text-blue-700 border border-blue-200"
													: "text-gray-700 hover:bg-gray-50"
											}`}>
											{tab.icon}
											<div>
												<div className="font-medium">{tab.name}</div>
												<div className="text-xs text-gray-500">
													{tab.description}
												</div>
											</div>
										</button>
									))}
								</nav>

								{/* Quick Stats */}
								<div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
									<h4 className="font-semibold text-gray-900 text-sm">
										Quick Stats
									</h4>
									<div className="grid grid-cols-2 gap-3 text-sm">
										<div>
											<div className="text-gray-500">Total Bookings</div>
											<div className="font-semibold text-gray-900">
												{userStats.totalBookings}
											</div>
										</div>
										<div>
											<div className="text-gray-500">Member Since</div>
											<div className="font-semibold text-gray-900">
												{userStats.memberSince}
											</div>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="space-y-3">
									<Button
										onClick={() => setOpen(true)}
										variant="outline"
										className="w-full justify-start">
										<Settings className="w-4 h-4 mr-2" />
										Reset Password
									</Button>
									<Button
										onClick={handleLogout}
										variant="outline"
										className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
										<LogOut className="w-4 h-4 mr-2" />
										Logout
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3">
						<Card className="shadow-soft border border-gray-200 min-h-[600px]">
							{/* Profile Tab */}
							<div className={`${activeTab === 1 ? "block" : "hidden"}`}>
								<CardHeader className="border-b border-gray-100">
									<div className="flex items-center justify-between">
										<div>
											<h2 className="text-xl font-bold text-gray-900">
												Personal Information
											</h2>
											<p className="text-gray-600">
												Update your account details and preferences
											</p>
										</div>
										<Button
											type="submit"
											onClick={() => formRef.current?.requestSubmit()}
											className="gradient-secondary text-white px-6"
											disabled={isUpdateLoading}>
											{isUpdateLoading ? (
												<>
													<Loader2 className="w-4 h-4 mr-2 animate-spin" />
													Saving...
												</>
											) : (
												<>
													<CheckCircle className="w-4 h-4 mr-2" />
													Save Changes
												</>
											)}
										</Button>
									</div>
								</CardHeader>

								<CardContent className="p-6">
									{/* Welcome Message */}
									<div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
										<h3 className="text-lg font-semibold text-gray-900 mb-2">
											Welcome back, {data?.data.name}! 👋
										</h3>
										<p className="text-gray-600">
											Thank you for being a valued member of our alumni
											community. Your account has been active since{" "}
											{userStats.memberSince}.
										</p>
									</div>

									{/* Profile Form */}
									<Formik
										enableReinitialize={true}
										initialValues={{
											email: data?.data.email || "",
											phone: data?.data.phone || "",
											name: data?.data.name || "",
										}}
										validateOnChange={true}
										onSubmit={(values: any) => {
											handleSubmit(values);
										}}>
										{({ handleChange, values }) => (
											<Form ref={formRef}>
												<div className="space-y-6">
													<div className="grid md:grid-cols-2 gap-6">
														<div className="space-y-2">
															<Label
																htmlFor="name"
																className="flex items-center space-x-2">
																<User className="w-4 h-4" />
																<span>Full Name</span>
															</Label>
															<Input
																id="name"
																name="name"
																onChange={handleChange}
																value={values.name}
																type="text"
																placeholder="Enter your full name"
																className="focus:border-blue-500 focus:ring-blue-500"
															/>
															<ErrorMessage
																className="text-red-500 text-sm"
																component={"div"}
																name={"name"}
															/>
														</div>

														<div className="space-y-2">
															<Label
																htmlFor="email"
																className="flex items-center space-x-2">
																<Mail className="w-4 h-4" />
																<span>Email Address</span>
															</Label>
															<Input
																id="email"
																name="email"
																onChange={handleChange}
																value={values.email}
																type="email"
																placeholder="your.email@example.com"
																className="focus:border-blue-500 focus:ring-blue-500"
															/>
															<ErrorMessage
																className="text-red-500 text-sm"
																component={"div"}
																name={"email"}
															/>
														</div>

														<div className="space-y-2">
															<Label
																htmlFor="phone"
																className="flex items-center space-x-2">
																<Phone className="w-4 h-4" />
																<span>Phone Number</span>
															</Label>
															<Input
																id="phone"
																name="phone"
																onChange={handleChange}
																value={values.phone}
																type="tel"
																placeholder="+91 XXXXX XXXXX"
																className="focus:border-blue-500 focus:ring-blue-500"
															/>
															<ErrorMessage
																className="text-red-500 text-sm"
																component={"div"}
																name={"phone"}
															/>
														</div>
													</div>

													{/* Account Information */}
													<div className="pt-6 border-t border-gray-100">
														<h4 className="text-lg font-semibold text-gray-900 mb-4">
															Account Information
														</h4>
														<div className="grid md:grid-cols-3 gap-4">
															<div className="p-4 bg-gray-50 rounded-lg">
																<div className="text-sm text-gray-500 mb-1">
																	Member Since
																</div>
																<div className="font-semibold text-gray-900">
																	{userStats.memberSince}
																</div>
															</div>
															<div className="p-4 bg-gray-50 rounded-lg">
																<div className="text-sm text-gray-500 mb-1">
																	Total Bookings
																</div>
																<div className="font-semibold text-gray-900">
																	{userStats.totalBookings}
																</div>
															</div>
														</div>
													</div>
												</div>
											</Form>
										)}
									</Formik>

									{/* Reviews Section */}
									<div className="mt-8 pt-8 border-t border-gray-100">
										<div className="flex items-center justify-between mb-6">
											<h4 className="text-lg font-semibold text-gray-900">
												My Reviews
											</h4>
											<Badge className="bg-blue-100 text-blue-700">
												{myReviews.length} Reviews
											</Badge>
										</div>

										<Carousel
											className="w-full"
											opts={{
												align: "start",
												loop: true,
											}}
											plugins={[plugin.current]}
											onMouseEnter={plugin.current.stop}
											onMouseLeave={plugin.current.reset}>
											<CarouselContent className="-ml-1">
												{myReviews.map((review: any, index: any) => (
													<CarouselItem
														key={index}
														className="pl-1 md:basis-1/2 lg:basis-1/2">
														<div className="p-1">
															<ReviewCard
																{...review}
																name={data?.data.name}
																role={data?.data.role}
																roomName={review?.listing.title}
															/>
														</div>
													</CarouselItem>
												))}
											</CarouselContent>
											<CarouselPrevious className="hidden md:flex" />
											<CarouselNext className="hidden md:flex" />
										</Carousel>
									</div>
								</CardContent>
							</div>

							{/* Bookings Tab */}
							<div className={`${activeTab === 2 ? "block" : "hidden"}`}>
								<CardHeader className="border-b border-gray-100">
									<div>
										<h2 className="text-xl font-bold text-gray-900">
											My Bookings
										</h2>
										<p className="text-gray-600">
											View and manage your room reservations
										</p>
									</div>
								</CardHeader>

								<CardContent className="p-6">
									{/* Booking Stats */}
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
										<div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
											<div className="flex items-center space-x-3">
												<Calendar className="w-8 h-8 text-blue-600" />
												<div>
													<div className="text-sm text-blue-600">Upcoming</div>
													<div className="text-xl font-bold text-blue-900">
														{
															bookings.filter(
																(room: BookingData) =>
																	new Date(room.startDate) > new Date()
															).length
														}
													</div>
												</div>
											</div>
										</div>
										<div className="p-4 bg-green-50 rounded-lg border border-green-100">
											<div className="flex items-center space-x-3">
												<CheckCircle className="w-8 h-8 text-green-600" />
												<div>
													<div className="text-sm text-green-600">
														Completed
													</div>
													<div className="text-xl font-bold text-green-900">
														{
															bookings.filter(
																(room: BookingData) =>
																	new Date() > new Date(room.endDate)
															).length
														}
													</div>
												</div>
											</div>
										</div>
										<div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
											<div className="flex items-center space-x-3">
												<Clock className="w-8 h-8 text-yellow-600" />
												<div>
													<div className="text-sm text-yellow-600">Ongoing</div>
													<div className="text-xl font-bold text-yellow-900">
														{
															bookings.filter(
																(room: BookingData) =>
																	new Date() >= new Date(room.startDate) &&
																	new Date() <= new Date(room.endDate)
															).length
														}
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Bookings List */}
									<div className="space-y-6">
										{bookings.map((room: BookingData, index: any) => (
											<div
												key={index}
												className="slide-up"
												style={{ animationDelay: `${index * 100}ms` }}>
												<BookingCard
													{...room}
													name={data?.data.name}
													email={data?.data.email}
													role={data?.data.role}
												/>
											</div>
										))}
									</div>
								</CardContent>
							</div>
						</Card>
					</div>
				</div>
			</div>

			<ResetPassword
				open={open}
				closed={() => setOpen(false)}
			/>
		</div>
	);
};

interface Review {
	name: string;
	department: string;
	year: number;
	content: string;
	rating: number;
	avatar: string;
	roomName: string;
	role: string;
}

export const ReviewCard: React.FC<Review> = ({
	name,
	role,
	content,
	rating,
	avatar,
	roomName,
}) => {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	return (
		<Card className="glass-card hover-lift border border-gray-200 h-full">
			<CardContent className="p-6">
				<div className="flex items-center mb-4">
					<Avatar className="w-12 h-12">
						<AvatarImage
							src={avatar}
							alt={name}
						/>
						<AvatarFallback className="text-blue-600 bg-blue-100 font-bold">
							{initials}
						</AvatarFallback>
					</Avatar>
					<div className="ml-4 flex-1">
						<h3 className="text-base font-semibold text-gray-900">{name}</h3>
						<Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
							<UserCheck className="w-3 h-3 mr-1" />
							{role
								? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
								: ""}
						</Badge>
						{/* <p className="text-xs text-gray-500 mt-1">{stayDate}</p> */}
					</div>
				</div>

				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-4 h-4 ${
									i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
								}`}
							/>
						))}
					</div>
					<Badge className="bg-blue-100 text-blue-700 text-xs">
						{roomName}
					</Badge>
				</div>

				<p className="text-gray-700 text-sm leading-relaxed">{content}</p>
			</CardContent>
		</Card>
	);
};

interface BookingCardProps {
	id: number;
	total: number;
	startDate: string;
	endDate: string;
	listing: Listing;
	type: string;
	purpose: string;
	numberOfGuests: number;
	name: string;
	email: string;
	role: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
	id,
	name,
	email,
	role,
	startDate,
	endDate,
	numberOfGuests,
	total,
	listing,
	type,
	purpose,
}) => {
	const [mainImage, setMainImage] = useState(0);
	const [reviewModal, setReviewModal] = useState<{
		open: boolean;
		booking: BookingData | null;
	}>({ open: false, booking: null });

	const getStatusConfig = (status: string) => {
		switch (status) {
			case "upcoming":
				return {
					badge: "bg-blue-100 text-blue-700 border-blue-200",
					text: "Upcoming",
					icon: <Calendar className="w-4 h-4" />,
				};
			case "completed":
				return {
					badge: "bg-green-100 text-green-700 border-green-200",
					text: "Completed",
					icon: <CheckCircle className="w-4 h-4" />,
				};
			case "ongoing":
				return {
					badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
					text: "Ongoing",
					icon: <Clock className="w-4 h-4" />,
				};
			default:
				return {
					badge: "bg-gray-100 text-gray-700 border-gray-200",
					text: "Unknown",
					icon: <Clock className="w-4 h-4" />,
				};
		}
	};

	const getStatus = (
		startDate: string,
		endDate: string
	): "upcoming" | "ongoing" | "completed" => {
		const today = new Date();
		const start = new Date(startDate);
		const end = new Date(endDate);

		if (today < start) return "upcoming";
		if (today >= start && today <= end) return "ongoing";
		return "completed";
	};

	const status = getStatus(startDate, endDate);

	const statusConfig = getStatusConfig(status);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const calculateNights = () => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	};

	const [
		deleteBooking,
		{
			isError: isDeleteBookingError,
			error: DeleteBookingError,
			isLoading: isDeleteBookingLoading,
		},
	] = useDeleteBookingMutation();

	const { refetch } = useAuth();

	const handleDelete = async (id: any) => {
		const res = await deleteBooking(id).unwrap();
		if (res.success) {
			toast.success(res.message);
			refetch();
		}
	};

	useEffect(() => {
		if (isDeleteBookingError) {
			toast.error(
				(DeleteBookingError as any).data.message || "Failed to Delete Booking."
			);
		}
	}, [isDeleteBookingError, DeleteBookingError]);

	const ratings = listing.reviews.map((reviews) => reviews.rating);
	const avgRating =
		ratings.length > 0
			? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
			: "N/A";

	return (
		<Card className="hover-lift border border-gray-200 overflow-hidden">
			<CardContent className="p-6">
				<div className="flex flex-col lg:flex-row gap-6">
					{/* Image Section */}
					<div className="lg:w-80 flex-shrink-0">
						<div className="relative h-48 lg:h-56 rounded-xl overflow-hidden mb-3">
							<Image
								src={`${process.env.NEXT_PUBLIC_BASE_URL}${listing.images[0].url}`}
								alt={listing.title}
								fill
								className="object-cover"
							/>

							{/* Status Badge Overlay */}
							<div className="absolute top-3 left-3">
								<Badge
									className={`${statusConfig.badge} border font-medium px-3 py-1.5 shadow-sm`}>
									{statusConfig.icon}
									<span className="ml-1">{statusConfig.text}</span>
								</Badge>
							</div>
						</div>

						{/* Image Thumbnails */}
						{/* <div className="flex gap-2">
              {images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === index
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Room view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div> */}
					</div>

					{/* Content Section */}
					<div className="flex-1 space-y-4">
						{/* Header */}
						<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
							<div>
								<Link href={`/rooms/${listing.id}`}>
									<h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-2">
										{listing.title}
									</h3>
								</Link>
								<div className="flex items-center text-gray-600 mb-2">
									<MapPin className="w-4 h-4 mr-1" />
									<span className="text-sm">Kanchenjunga, JGEC</span>
								</div>
								<div className="text-sm text-gray-500">
									Booking ID:{" "}
									<span className="font-medium text-gray-700">{id}</span>
								</div>
							</div>

							<div className="text-right">
								<div className="text-2xl font-bold text-gray-900">
									₹{total.toLocaleString()}
								</div>
								<div className="text-sm text-gray-500">
									{calculateNights()} night{calculateNights() > 1 ? "s" : ""}
								</div>
							</div>
						</div>

						{/* Dates and Details */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
							<div>
								<div className="text-xs text-gray-500 mb-1">Check-in</div>
								<div className="font-semibold text-gray-900">
									{formatDate(startDate)}
								</div>
							</div>
							<div>
								<div className="text-xs text-gray-500 mb-1">Check-out</div>
								<div className="font-semibold text-gray-900">
									{formatDate(endDate)}
								</div>
							</div>
							<div>
								<div className="text-xs text-gray-500 mb-1">Guests</div>
								<div className="font-semibold text-gray-900">
									{numberOfGuests} guest{numberOfGuests > 1 ? "s" : ""}
								</div>
							</div>
						</div>

						{/* Rating and Actions */}
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
							<div className="flex items-center space-x-4">
								<div className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
									<Star className="w-4 h-4 mr-1 fill-current" />
									{avgRating}
								</div>
								<span className="text-sm text-gray-600">
									({listing.reviews.length.toLocaleString()} reviews)
								</span>
							</div>

							<div className="flex space-x-3">
								<Link href={`/rooms/${listing.id}`}>
									<Button
										variant="outline"
										size="sm">
										View Details
									</Button>
								</Link>
								{status === "completed" && (
									<Button
										size="sm"
										className="gradient-secondary text-white"
										onClick={() =>
											setReviewModal({
												open: true,
												booking: {
													id,
													startDate,
													endDate,
													numberOfGuests,
													total,
													listing,
													type,
													purpose,
												} as BookingData,
											})
										}>
										<Edit3 className="w-4 h-4 mr-2" />
										Write Review
									</Button>
								)}
								{status === "upcoming" && (
									// <Button
									// 	size="sm"
									// 	variant="outline"
									// 	disabled={isDeleteBookingLoading}
									// 	onClick={() => handleDelete(id)}
									// 	className="text-red-600 border-red-200 hover:bg-red-50">
									// 	{isDeleteBookingLoading ? (
									// 		<>
									// 			<Loader2 className="animate-spin" /> Cancelling
									// 		</>
									// 	) : (
									// 		<>Cancel Booking</>
									// 	)}
									// </Button>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant="outline"
												size="sm"
												className="text-red-600 border-red-200 hover:bg-red-50">
												Cancel Booking
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you absolutely sure?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action is irreversible. Deleting your booking is
													permanent and no refund will be issued.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel className="cursor-pointer">
													Cancel
												</AlertDialogCancel>
												<AlertDialogAction
													className="text-red-600 border-red-300 border cursor-pointer hover:bg-red-50 bg-white"
													onClick={() => handleDelete(id)}>
													Continue
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								)}
							</div>
						</div>
					</div>
				</div>
			</CardContent>
			<ReviewModal
				open={reviewModal.open}
				onClose={() => setReviewModal({ open: false, booking: null })}
				booking={
					reviewModal.booking
						? {
								id: reviewModal.booking.id,
								listing: {
									id: reviewModal.booking.listing.id,
									title: reviewModal.booking.listing.title,
									images: reviewModal.booking.listing.images,
								},
								startDate: reviewModal.booking.startDate,
								endDate: reviewModal.booking.endDate,
								numberOfGuests: reviewModal.booking.numberOfGuests,
						  }
						: undefined
				}
				userInfo={{
					name: name || "",
					email: email || "",
					role: role || "",
				}}
			/>
		</Card>
	);
};

export default Profile;
