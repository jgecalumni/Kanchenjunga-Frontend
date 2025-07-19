import Image from "next/image";
import React from "react";
import {
  CheckCircle,
  Users,
  Building,
  BookOpen,
  Target,
  Lightbulb,
  Award,
  Clock,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Alumni Network",
      description:
        "Connected community of JGEC engineers driving industry innovation",
    },
    {
      icon: Building,
      title: "Modern Facilities",
      description:
        "State-of-the-art conference halls and comfortable accommodations",
    },
    {
      icon: BookOpen,
      title: "Learning Hub",
      description:
        "Advanced library with latest engineering books and journals",
    },
    {
      icon: Target,
      title: "Professional Events",
      description: "Workshops, seminars, and industry interaction programs",
    },
  ];

  const purposes = [
    "Management & Technical Development programs, Seminars, Workshops",
    "Industry Achievers interaction with students",
    "Alumni lecture programs on specialized subjects",
    "Transit house facility during holidays",
  ];

  const buildingFeatures = [
    "One 1044 sq. ft. conference/ seminar hall",
    "One 1044 sq. ft. development centre where each desk can be a work station as well",
    "Around 300 sq. ft. discussion room for small meetings and discussions",
    "Five/ six guest rooms for accommodation",
    "One library & reading room",
    "Two office rooms, etc in G+2 building",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-6xl mx-auto mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full px-6 py-3 mb-8">
            <Award className="w-5 h-5 mr-2 text-indigo-600" />
            <span className="text-indigo-700 font-semibold">
              Excellence in Alumni Relations
            </span>
          </div>

          <h1 className="jakarta-font text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Jalpaiguri Government Engineering College Alumni Build Multipurpose{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              "Kanchenjunga"
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            A Hub for Learning, Collaboration, and Community - Connecting past
            achievements with future innovations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 border border-gray-100 group hover-lift"
              >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Basic History Section */}
        <div className="bg-white rounded-3xl shadow-luxury p-12 border border-gray-100 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="jakarta-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl">
                Kanchenjunga is the brainchild of our own Alumni - the Engineers
                of JGEC, who drive the Industry today. It is meant to facilitate
                students and act as a convention centre.
              </p>

              <p>
                A perfect venue to conduct conferences and seminars, meetings,
                interviews and group discussions or to house a start-up. This
                Convention centre houses a Reading Corner - a state of the art
                library of fresh books of engineering with latest edition and
                many relevant journals.
              </p>

              <p>
                It also has a facility to lodge people who are associated with
                the facilitation of present students or their parents, Alumni or
                any company/institution representative who have arrived to
                train/interview our students.
              </p>
            </div>
          </div>
        </div>

        {/* Floor Plans Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="jakarta-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Floor Plans
            </h2>
            <p className="text-xl text-gray-600">
              Thoughtfully designed spaces for optimal functionality
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/Kanchenjunga-floor-plan-1.png"
                  alt="Kanchenjunga Floor Plan 1"
                  height={500}
                  width={500}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-6 text-center">
                Ground Floor Layout
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/Kanchenjunga-floor-plan-2.png"
                  alt="Kanchenjunga Floor Plan 2"
                  height={500}
                  width={500}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-6 text-center">
                Upper Floor Layout
              </h3>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="jakarta-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Purpose of Kanchenjunga
            </h2>
            <p className="text-xl text-gray-600">
              Fostering excellence through comprehensive educational programs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Lightbulb className="w-8 h-8 text-indigo-600 mr-3" />
                  Development Programs
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Kanchenjunga, a Knowledge & Development center shall offer
                  Management & Technical Development programs, Seminars,
                  Workshops for business houses both public & private
                  enterprises & to other non-profit organizations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The Industry Achievers shall be invited to address & interact
                  with our students, as well.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-8 h-8 text-purple-600 mr-3" />
                  Alumni Engagement
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Kanchenjunga shall provide challenges to the loyal ex-students
                  of JGEC to deliver lectures on their specialized subject on
                  regular basis to the students of their Alma Mater.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  During the lean days of the year when no program, seminar,
                  workshops are scheduled, specified rooms of Kanchenjunga shall
                  be offered as Transit house to the ex-students during their
                  holidays.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
                <Image
                  src="/images/kanchenjunga-pic-2.png"
                  alt="Kanchenjunga Interior"
                  height={400}
                  width={400}
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
                <Image
                  src="/images/kanchenjunga-pic-1.png"
                  alt="Kanchenjunga Facilities"
                  height={400}
                  width={400}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Purposes List */}
        <div className="bg-white rounded-3xl shadow-luxury p-12 border border-gray-100 mb-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Key Purposes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purposes.map((purpose, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">
                    {purpose}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promoters Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 border border-indigo-100 mb-20">
          <div className="text-center mb-12">
            <h2 className="jakarta-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Promoters of Kanchenjunga
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated alumni driving innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300">
              <Image
                src="/images/kanchenjunga-pic-3.png"
                alt="Alumni Achievement"
                height={300}
                width={300}
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Engineering Graduates
              </h3>
              <p className="text-lg text-gray-700 font-semibold bg-white rounded-2xl p-6 shadow-soft">
                JGEC Alumni from 1966 – Recently Graduated Engineers
              </p>
              <p className="text-gray-600">
                Spanning generations of engineering excellence and innovation
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300">
              <Image
                src="/images/kanchenjunga-pic-4.png"
                alt="Alumni Network"
                height={300}
                width={300}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Building Features Section */}
        <div className="bg-white rounded-3xl shadow-luxury p-12 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="jakarta-font text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Building Features
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {buildingFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-indigo-50 hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-700 leading-relaxed font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
