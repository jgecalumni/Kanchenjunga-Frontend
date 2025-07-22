"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, Formik } from "formik";
import {
  Bed,
  Calendar,
  Users,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Wifi,
  Car,
  Coffee,
  Shield,
} from "lucide-react";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRouter } from "next/navigation";

const images = [
  { id: 1, link: "/images/Kanchenjunga1.jpeg" },
  { id: 2, link: "/images/Kanchenjunga2.jpeg" },
  { id: 3, link: "/images/Kanchenjunga3.jpeg" },
  { id: 4, link: "/images/Kanchenjunga4.jpg" },
  { id: 5, link: "/images/Kanchenjunga5.jpeg" },
];

const reviews = [
  {
    name: "Shayan Kundu",
    department: "Computer Science",
    year: 2022,
    review:
      "Staying at the Alumni House brought back so many memories! The comfort, hospitality, and location were just perfect.",
    rating: 5,
  },
  {
    name: "Aarav Mehta",
    department: "Mechanical Engineering",
    year: 2020,
    review:
      "It felt amazing to be back on campus. The Alumni House was cozy and had everything I needed for a comfortable stay.",
    rating: 4,
  },
  {
    name: "Sneha Roy",
    department: "Biotechnology",
    year: 2019,
    review:
      "Loved the peaceful environment and how welcoming the staff were. Definitely a must-stay place for visiting alumni.",
    rating: 5,
  },
];

const features = [
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "High-speed internet throughout",
  },
  { icon: Car, title: "Parking", description: "Complimentary parking space" },
  { icon: Coffee, title: "Dining", description: "On-campus dining facilities" },
  { icon: Shield, title: "Security", description: "24/7 campus security" },
];

const stats = [
  { number: "500+", label: "Happy Alumni" },
  { number: "4", label: "Comfortable Rooms" },
  { number: "4.8", label: "Average Rating" },
  { number: "24/7", label: "Support" },
];

const Page: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-indigo-900/90" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <MapPin className="w-5 h-5 mr-2 text-blue-300" />
              <span className="text-white font-medium">
                Return to Where It All Began
              </span>
            </div>

            {/* Heading */}
            <h1 className="jakarta-font text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to Kanchenjunga {" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                convention
              </span>{" "}
              centre
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Your home away from home on campus. Book your stay and rekindle
              the memories at our Alumni House.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button onClick={()=>router.replace("/rooms")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                Book Your Stay <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
              onClick={()=>router.replace("/about")}
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-full text-lg font-semibold"
              >
                Virtual Tour
              </Button>
            </div>
          </div>

          {/* <div className="max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-luxury p-8 border border-white/20">
              <Formik
                initialValues={{
                  type: "",
                  startDate: "",
                  endDate: "",
                  guests: "",
                }}
                onSubmit={(values) => console.log(values)}
              >
                {({ handleChange, setFieldValue }) => (
                  <Form>
                    <div className="flex gap-6 justify-between items-end">
                      <div className="space-y-3 w-1/2">
                        <Label className="flex items-center text-gray-700 font-semibold">
                          <Bed className="w-4 h-4 mr-2 text-purple-600" />
                          Room Type
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setFieldValue("type", value)
                          }
                        >
                          <SelectTrigger className="h-12 w-full rounded-xl border-gray-200 focus:border-purple-500">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="AC">AC</SelectItem>
                              <SelectItem value="NonAC">Non AC</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center text-gray-700 font-semibold">
                          <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                          Check-in
                        </Label>
                        <Input
                          name="startDate"
                          type="date"
                          onChange={handleChange}
                          className="h-14 rounded-xl border-gray-200 focus:border-purple-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center text-gray-700 font-semibold">
                          <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                          Check-out
                        </Label>
                        <Input
                          name="endDate"
                          type="date"
                          onChange={handleChange}
                          className="h-14 rounded-xl border-gray-200 focus:border-purple-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Search Rooms
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div> */}
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
          <div className="flex space-x-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-luxury p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-12">
                <h2 className="jakarta-font text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  About Kanchenjunga
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-justify text-gray-700 leading-relaxed">
                    Kanchenjunga is the brainchild of our own Alumni - the
                    Engineers of JGEC, who drive the Industry today. It is meant
                    to facilitate students and act as a convention centre.
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Purpose of Kanchenjunga
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Management & Technical Development programs, Seminars, Workshops",
                        "Industry Achievers interaction with students",
                        "Alumni lecture programs on specialized subjects",
                        "Transit house facility during holidays",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-200"
                      >
                        <IconComponent className="w-8 h-8 text-purple-600 mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="jakarta-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our beautiful facilities and comfortable accommodations
            </p>
          </div>

          <Carousel
            className="w-full max-w-7xl mx-auto"
            opts={{ align: "start", loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-4">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative md:h-80 h-60 rounded-2xl overflow-hidden group">
                    <Image
                      src={image.link}
                      alt="Gallery image"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-6 bg-white shadow-lg border-0 hover:bg-gray-50" />
            <CarouselNext className="hidden md:flex -right-6 bg-white shadow-lg border-0 hover:bg-gray-50" />
          </Carousel>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="jakarta-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear firsthand from alumni who've stayed with us — their stories
              of comfort, connection, and memorable experiences.
            </p>
          </div>

          <Carousel
            className="w-full max-w-6xl mx-auto"
            opts={{ align: "start", loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-6">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <ReviewCard {...review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-6 bg-white shadow-lg border-0 hover:bg-gray-50" />
            <CarouselNext className="hidden md:flex -right-6 bg-white shadow-lg border-0 hover:bg-gray-50" />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

interface Review {
  name: string;
  department: string;
  year: number;
  review: string;
  rating: number;
}

const ReviewCard: React.FC<Review> = ({
  name,
  department,
  year,
  review,
  rating,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 p-8 border border-gray-100 h-full">
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
          {initials}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">
            {department} • Batch of {year}
          </p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed">{review}</p>
    </div>
  );
};

export default Page;
