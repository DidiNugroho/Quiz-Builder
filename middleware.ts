// make me a middleware logic to handle user session and authentication
// The middleware should be able to:
// - Check if the user is authenticated
// - Redirect the user to the login page if they are not authenticated
// - Redirect the user to the home page if they are authenticated

// Solution
// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import supabase from "@/db/supabase";

// export async function middleware(req: NextRequest) {
//   const cookieStore = await cookies(req);

//   const token = cookieStore.get("Authorization");

//   if (!token) {
//     return NextResponse.redirect("/login");
//   }

//   try {
//     const { data, error } = await supabase.auth.getUser(token);

//     if (error) {
//       throw new Error("Invalid token");
//     }

//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect("/login");
//   }
// }

import { updateSession } from '@/db/middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
