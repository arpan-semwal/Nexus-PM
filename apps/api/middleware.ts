import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Ye headers frontend (3000) ko data access karne ki permission dete hain
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}

// Ye sirf API routes par chalega
export const config = {
  matcher: "/api/:path*",
};