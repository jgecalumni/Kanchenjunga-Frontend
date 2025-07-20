"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import Link from "next/link";
import { useAuth } from "@/store/AuthContext";
import { AuthModal } from "../Modals/AuthModal";
import {
	Star,
	MapPin,
	Wifi,
	Coffee,
	Users,
	Heart,
	ArrowRight,
	AirVent,
	Eye,
	Award,
	Filter,
	SortDesc,
	CheckCircle,
	Clock,
	Search,
} from "lucide-react";
import { useGetListingsQuery } from "@/store/features/rooms";

interface RoomCardProps {
	id: number;
	title: string;
	reviews: [
		{
			id: number;
			content: string;
			rating: number;
		}
	];
	singleOccupancy: number;
	doubleOccupancy: number;
	images: [
		{
			id: number;
			url: string;
		}
	];
	user: {
		id: number;
		name: string;
		email: string;
	};
	bookings: [];
	type: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
	id,
	title,
	reviews,
	singleOccupancy,
	doubleOccupancy,
	images,
	type,
}) => {
	const { data } = useAuth();
	const [open, setOpen] = useState(false);
	const amenities = [
		"Free Wi-Fi",
		"AC",
		"Breakfast",
		"Room Service",
		"Balcony",
	];
	const getAmenityIcon = (amenity: string) => {
		const iconMap: { [key: string]: React.ReactNode } = {
			"Free Wi-Fi": <Wifi className="w-3 h-3" />,
			AC: <AirVent className="w-3 h-3" />,
			Breakfast: <Coffee className="w-3 h-3" />,
			"Room Service": <CheckCircle className="w-3 h-3" />,
			Balcony: <CheckCircle className="w-3 h-3" />,
			Fan: <AirVent className="w-3 h-3" />,
		};
		return iconMap[amenity] || <CheckCircle className="w-3 h-3" />;
	};

	const getAvailabilityColor = (available: number) => {
		if (available <= 2) return "text-red-500 bg-red-50";
		if (available <= 5) return "text-orange-500 bg-orange-50";
		return "text-green-600 bg-green-50";
	};
	const ratings = reviews.map((reviews) => reviews.rating);
	const avgRating =
		ratings.length > 0
			? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
			: "N/A";
	console.log(reviews);

	return (
		<>
			<Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-lg bg-white">
				<div className="flex flex-col md:flex-row">
					{/* Simplified Image Section */}
					<div className="relative w-full md:w-80 h-48 md:h-56 shrink-0">
						<Image
							src={`${process.env.NEXT_PUBLIC_BASE_URL}${images[0].url}` || ""}
							alt={title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>

						{/* Heart Icon */}

						{/* Room Type Badge */}
						<div className="absolute bottom-3 left-3">
							<Badge className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-sm">
								{type === "Both" ? "AC/Non-AC" : type}
							</Badge>
						</div>
					</div>

					{/* Content Section */}
					<div className="flex-1 p-4">
						<div className="flex flex-col md:flex-row h-full justify-between">
							<div className="space-y-3">
								{/* Title and Location */}
								<div>
									<div>
										<h3 className="text-lg md:text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-1">
											{title}
										</h3>
									</div>
									<div className="flex items-center text-gray-500 text-sm">
										<MapPin className="w-3 h-3 mr-1" />
										<span>Kanchenjunga,JGEC</span>
									</div>
								</div>

								{/* Rating and Reviews */}
								<div className="flex items-center space-x-2">
									<div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
										<Star className="w-3 h-3 mr-1 fill-current" />
										{avgRating}
									</div>
									<span className="text-sm text-gray-500">
										({reviews.length} reviews)
									</span>
								</div>

								{/* Amenities */}
								<div className="flex flex-wrap gap-1">
									{amenities.slice(0, 3).map((amenity, index) => (
										<div
											key={index}
											className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
											{getAmenityIcon(amenity)}
											<span>{amenity}</span>
										</div>
									))}
									{amenities.length > 3 && (
										<span className="text-xs text-blue-600 font-medium">
											+{amenities.length - 3} more
										</span>
									)}
								</div>

								{/* Capacity */}
								<div className="flex items-center text-sm text-gray-600">
									<Users className="w-4 h-4 mr-1" />
									<span>Up to 2 guests</span>
								</div>
							</div>

							{/* Pricing and Actions */}
							<div className="flex md:w-1/4 p-4 gap-4 justify-between flex-col mt-4 pt-4 md:border-l border-t border-gray-100">
								<div className="md:text-right">
									<div className="text-2xl font-bold text-gray-900">
										₹{singleOccupancy.toLocaleString()}
									</div>
									<div className="text-sm text-gray-500">per night</div>
									<div className="text-xs text-gray-400">
										Double: ₹{doubleOccupancy.toLocaleString()}
									</div>
								</div>

								<div className="flex flex-col space-y-2">
									<Link href={`/rooms/${id}`}>
										<Button
											variant="outline"
											size="sm"
											className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
											<Eye className="w-4 h-4 mr-1" />
											View Details
										</Button>
									</Link>

									{data ? (
										<Link href={`/rooms/${id}`}>
											<Button
												size="sm"
												className="w-full bg-blue-600 hover:bg-blue-700 text-white">
												Book Now
												<ArrowRight className="w-4 h-4 ml-1" />
											</Button>
										</Link>
									) : (
										<Button
											onClick={() => setOpen(true)}
											size="sm"
											className="w-full bg-blue-600 hover:bg-blue-700 text-white">
											Sign In to Book
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>

			{open && (
				<AuthModal
					open={open}
					closed={() => setOpen(false)}
				/>
			)}
		</>
	);
};

const Rooms: React.FC = () => {
	const { data } = useGetListingsQuery({ search: "" });
	const rooms = data?.data || []; // Use fetched data or dummy data if not available

	const [selectedType, setSelectedType] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("featured");
	const [searchQuery, setSearchQuery] = useState<string>("");

	const roomTypes = ["all", "AC", "NonAC", "Both"];
	const sortOptions = [
		{ value: "price", label: "Price: Low to High" },
		// { value: "rating", label: "Rating: High to Low" },
		// { value: "reviews", label: "Most Reviewed" },
	];

	const filteredAndSortedRooms = rooms.filter((room) => {
		const matchesType = selectedType === "all" || room.type === selectedType;
		const matchesSearch = room.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		// room.location.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesType && matchesSearch;
	});
	// .sort((a, b) => {
	//   switch (sortBy) {
	//     // case "featured":
	//     //   return Number(b.featured) - Number(a.featured);
	//     case "price":
	//       return b.singleOccupancy - a.singleOccupancy;
	//     // case "rating":
	//     //   return b.rating - a.rating;
	//     // case "reviews":
	//     //   return b.reviews - a.reviews;
	//     default:
	//       return 0;
	//   }
	// });

	return (
		<div className="min-h-screen bg-gray-50 pt-20">
			{/* Header */}
			<div className="bg-white border-b border-gray-200 py-8">
				<div className="container mx-auto px-6">
					<div className="max-w-4xl">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Kanchenjunga Rooms
						</h1>
						<p className="text-gray-600">
							Premium alumni accommodation with modern amenities and comfortable
							stays
						</p>
					</div>
				</div>
			</div>

			<div className="container mx-auto md:px-24 py-8">
				{/* Simplified Filters */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
					<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
						{/* Search Bar */}
						<div className="relative flex-1 max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								placeholder="Search rooms..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 focus:border-blue-500 focus:ring-blue-500"
							/>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
							{/* Room Type Filter */}
							<div className="flex items-center gap-3">
								<div className="flex items-center text-gray-700 font-medium">
									<Filter className="w-4 h-4 mr-2" />
									Filter:
								</div>
								<div className="flex flex-wrap gap-2">
									{roomTypes.map((type) => (
										<button
											key={type}
											onClick={() => setSelectedType(type)}
											className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
												selectedType === type
													? "bg-blue-600 text-white"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											}`}>
											{type === "all"
												? "All Rooms"
												: type === "Both"
												? "AC/Non-AC"
												: type}
										</button>
									))}
								</div>
							</div>

							{/* Sort Dropdown */}
							{/* <div className="flex items-center gap-2">
                <SortDesc className="w-4 h-4 text-gray-700" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div> */}
						</div>
					</div>
				</div>

				{/* Rooms List */}
				<div className="space-y-4 mb-8">
					{filteredAndSortedRooms.map((room, index) => (
						<div
							key={room.id}
							className="fade-in"
							style={{ animationDelay: `${index * 100}ms` }}>
							<RoomCard {...room} />
						</div>
					))}
				</div>

				{/* Load More */}
				{/* {filteredAndSortedRooms.length > 0 && (
          <div className="text-center">
            <Button
              variant="outline"
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Load More Rooms
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )} */}

				{/* No Results */}
				{filteredAndSortedRooms.length === 0 && (
					<div className="text-center py-16">
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							No rooms found
						</h3>
						<p className="text-gray-600 mb-6">
							Try adjusting your search criteria
						</p>
						<Button
							onClick={() => {
								setSearchQuery("");
								setSelectedType("all");
							}}
							variant="outline">
							Clear Filters
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Rooms;
