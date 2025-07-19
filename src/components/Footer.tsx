import React from "react";
import { FaFacebookF, FaLinkedinIn, FaRegCopyright } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialIcons = [
  {
    icon: <FaFacebookF className="w-5 h-5" />,
    link: "https://www.facebook.com/groups/communicationcell.jgec/",
    name: "Facebook",
    color: "hover:bg-blue-600",
  },
  {
    icon: <FaLinkedinIn className="w-5 h-5" />,
    link: "https://www.linkedin.com/company/jgecaa/",
    name: "LinkedIn",
    color: "hover:bg-blue-700",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className={
          'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-50'
        }
      ></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Kanchenjunga</h3>
                  <p className="text-indigo-300 text-sm">Alumni House</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <Image
                  src="/images/Logo.webp"
                  width={120}
                  height={120}
                  alt="JGEC Logo"
                  className="drop-shadow-lg mb-4"
                />
                <div className="text-sm font-medium text-gray-300 leading-relaxed">
                  THE JALPAIGURI GOVT. ENGG. COLLEGE
                  <div>ALUMNI ASSOCIATION,</div>
                  <div>JALPAIGURI.</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-indigo-400" />
                Quick Links
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Rooms", href: "/rooms" },
                  { name: "About", href: "/about" },
                  { name: "Main Website", href: "#" },
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 group"
                  >
                    <MdOutlineKeyboardArrowRight className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6">Policies</h3>
              <div className="space-y-3">
                {[
                  "Privacy Policy",
                  "Terms & Conditions",
                  "Booking Policy",
                  "Cancellation Policy",
                ].map((policy, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer group"
                  >
                    <MdOutlineKeyboardArrowRight className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                    <span className="font-medium">{policy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-400" />
                Get In Touch
              </h3>

              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                    <div className="text-sm text-gray-300 leading-relaxed">
                      Jalpaiguri Government Engineering College Campus, P.O.:
                      Denguajhar, Dist.: Jalpaiguri, West Bengal - 735102,
                      India.
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm text-gray-300">
                      +91 7439428480
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm text-gray-300">
                      jgecalum@gmail.com
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialIcons.map((social, index) => (
                    <Link
                      key={index}
                      href={social.link}
                      target="_blank"
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                      aria-label={social.name}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {social.icon}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <FaRegCopyright className="w-4 h-4" />
                <span>2024 JGEC Alumni Association. All Rights Reserved.</span>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <span>Made with ❤️ for JGEC Alumni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
