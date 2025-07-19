"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Formik, Form, ErrorMessage } from "formik";
import {
	Star,
	Loader2,
	MapPin,
	Calendar,
	Users,
	CheckCircle,
	Send,
} from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "sonner";
import Image from "next/image";
import { useCreateReviewMutation } from "@/store/features/rooms";
import { useAuth } from "@/store/AuthContext";

interface ReviewModalProps {
	open: boolean;
	onClose: () => void;
	booking?: {
		id: number;
		listing: {
			id: number;
			title: string;
			images: { id: number; url: string }[];
		};
		startDate: string;
		endDate: string;
		numberOfGuests: number;
	};
	userInfo?: {
		name: string;
		email: string;
		role: string;
	};
}

const reviewSchema = Yup.object().shape({
	rating: Yup.number()
		.min(1, "Please select a rating")
		.max(5, "Rating cannot exceed 5 stars")
		.required("Rating is required"),
	content: Yup.string()
		.min(20, "Review must be at least 20 characters")
		.max(1000, "Review must be less than 1000 characters")
		.required("Review content is required"),
});

export const ReviewModal: React.FC<ReviewModalProps> = ({
	open,
	onClose,
	booking,
	userInfo,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [createReview, { isError, error }] = useCreateReviewMutation();
	const { refetch } = useAuth();
	const handleSubmit = async (values: any) => {
		setIsSubmitting(true);
		console.log(values);

		try {
			const id: number = booking?.listing.id || 0;
			const res = await createReview({ id, data: values }).unwrap();
			if (res.success) {
				toast.success(res.message);
				onClose();
				refetch();
			}
		} catch (error) {
			toast.error("Failed to submit review. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const calculateNights = () => {
		if (!booking) return 0;
		const start = new Date(booking.startDate);
		const end = new Date(booking.endDate);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	};

	const StarRating = ({
		rating,
		onRatingChange,
	}: {
		rating: number;
		onRatingChange: (rating: number) => void;
	}) => {
		const [hoverRating, setHoverRating] = useState(0);

		return (
			<div className="flex items-center gap-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<button
						key={star}
						type="button"
						onClick={() => onRatingChange(star)}
						onMouseEnter={() => setHoverRating(star)}
						onMouseLeave={() => setHoverRating(0)}
						className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
						<Star
							className={`w-8 h-8 transition-all duration-200 ${
								star <= (hoverRating || rating)
									? "text-yellow-400 fill-current"
									: "text-gray-300 hover:text-yellow-200"
							}`}
						/>
					</button>
				))}
			</div>
		);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass-card">
				<DialogHeader className="space-y-3">
					<DialogTitle className="text-center text-2xl font-bold text-gray-900 jakarta-font">
						Share Your Experience
					</DialogTitle>
					<DialogDescription className="text-center text-gray-600">
						Help other guests by sharing your honest review about your stay
					</DialogDescription>
				</DialogHeader>

				{/* Booking Summary Card */}
				{booking && (
					<Card className="border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
						<CardContent className="p-4">
							<div className="flex gap-4">
								<div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
									<Image
										src={`${process.env.NEXT_PUBLIC_BASE_URL}${booking.listing.images[0]?.url}`}
										alt={booking.listing.title}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex-1 space-y-2">
									<h4 className="font-semibold text-gray-900 text-lg">
										{booking.listing.title}
									</h4>
									<div className="flex items-center text-gray-600 text-sm">
										<MapPin className="w-4 h-4 mr-1" />
										<span>Kanchenjunga, JGEC</span>
									</div>
									<div className="flex flex-wrap gap-4 text-sm">
										<div className="flex items-center text-gray-600">
											<Calendar className="w-4 h-4 mr-1" />
											<span>
												{formatDate(booking.startDate)} -{" "}
												{formatDate(booking.endDate)}
											</span>
										</div>
										<div className="flex items-center text-gray-600">
											<Users className="w-4 h-4 mr-1" />
											<span>
												{booking.numberOfGuests} guest
												{booking.numberOfGuests > 1 ? "s" : ""}
											</span>
										</div>
									</div>
									<Badge className="bg-green-100 text-green-700 border-green-200 w-fit">
										<CheckCircle className="w-3 h-3 mr-1" />
										Stay Completed • {calculateNights()} night
										{calculateNights() > 1 ? "s" : ""}
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				<Formik
					initialValues={{
						rating: 0,
						content: "",
					}}
					validationSchema={reviewSchema}
					onSubmit={handleSubmit}>
					{({ values, setFieldValue, errors, touched }) => (
						<Form className="space-y-6">
							{/* Rating Section */}
							<div className="space-y-3">
								<Label className="text-base font-semibold text-gray-900">
									Overall Rating
								</Label>
								<div className="flex flex-col items-center space-y-3 p-6 bg-gray-50 rounded-xl">
									<StarRating
										rating={values.rating}
										onRatingChange={(rating) => setFieldValue("rating", rating)}
									/>
									<div className="text-center">
										{values.rating > 0 && (
											<p className="text-sm text-gray-600">
												{values.rating === 1 &&
													"Poor - Needs significant improvement"}
												{values.rating === 2 && "Fair - Below expectations"}
												{values.rating === 3 && "Good - Met expectations"}
												{values.rating === 4 &&
													"Very Good - Exceeded expectations"}
												{values.rating === 5 &&
													"Excellent - Outstanding experience"}
											</p>
										)}
									</div>
								</div>
								{errors.rating && touched.rating && (
									<div className="text-red-500 text-sm">{errors.rating}</div>
								)}
							</div>

							{/* Review Content */}
							<div className="space-y-2">
								<Label
									htmlFor="content"
									className="text-base font-semibold text-gray-900">
									Detailed Review
								</Label>
								<Textarea
									id="content"
									name="content"
									placeholder="Share details about your stay, what you liked most, and any suggestions for improvement..."
									className="min-h-[120px] focus:border-blue-500 focus:ring-blue-500 resize-none"
									onChange={(e: any) =>
										setFieldValue("content", e.target.value)
									}
									value={values.content}
								/>
								<div className="flex justify-between text-xs text-gray-500">
									<ErrorMessage
										name="content"
										component="div"
										className="text-red-500"
									/>
									<span>{values.content.length}/1000</span>
								</div>
							</div>

							{/* User Info Display */}
							{userInfo && (
								<div className="p-4 bg-gray-50 rounded-lg">
									<div className="flex items-center space-x-3">
										<Avatar className="w-10 h-10">
											<AvatarFallback className="text-blue-600 bg-blue-100 font-bold">
												{userInfo.name
													?.split(" ")
													.map((n: string) => n[0])
													.join("")
													.toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium text-gray-900">
												{userInfo.name}
											</p>
											<p className="text-sm text-gray-600">
												Verified{" "}
												{userInfo.role
													? userInfo.role.charAt(0).toLocaleUpperCase() +
													  userInfo.role.slice(1).toLocaleLowerCase()
													: ""}
											</p>
										</div>
									</div>
								</div>
							)}

							<DialogFooter className="gap-3">
								<Button
									type="button"
									variant="outline"
									onClick={onClose}
									disabled={isSubmitting}
									className="px-6">
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting || values.rating === 0}
									className="gradient-secondary text-white px-6 flex items-center space-x-2">
									{isSubmitting ? (
										<>
											<Loader2 className="w-4 h-4 animate-spin" />
											<span>Submitting...</span>
										</>
									) : (
										<>
											<Send className="w-4 h-4" />
											<span>Submit Review</span>
										</>
									)}
								</Button>
							</DialogFooter>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};
