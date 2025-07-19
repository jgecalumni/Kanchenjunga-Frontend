import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;
	const path = req.nextUrl.pathname
	const isPath = path === "/profile"
	if(!token && isPath){
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/rooms", "/rooms/:path*", "/about", "/profile"],
};
