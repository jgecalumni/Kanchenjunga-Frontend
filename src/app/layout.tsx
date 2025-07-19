import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "../store/provider";
import ReactQueryProvider from "../store/query-client";
import { AuthProvider } from "@/store/AuthContext";

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-outfit",
	weight: "400",
});

export const metadata: Metadata = {
	title: "Kanchenjunga - The alumni house of Jalpaiguri Government Engineering College.",
	description:
		"Experience comfort, connection, and nostalgia.",
	keywords:
		"Jalpaiguri Government Engineering College, JGEC, Alumni Association, JGEC Alumni Association, Jalpaiguri, Alumni House, Alumni",
	openGraph: {
		title: "Kanchenjunga - The alumni house of Jalpaiguri Government Engineering College.",
		description:
			"Experience comfort, connection, and nostalgia.",
		url: 'https://kanchenjunga.jgecalumni.in',
		type: "website",
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${outfit.className}`}>
				<Providers>
					<ReactQueryProvider>
						<AuthProvider>
							{children}
							<Toaster
								richColors
								position="top-center"
								theme="light"
							/>
						</AuthProvider>
					</ReactQueryProvider>
				</Providers>
			</body>
		</html>
	);
}
