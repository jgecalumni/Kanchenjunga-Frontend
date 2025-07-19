"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full">
			<NavBar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
