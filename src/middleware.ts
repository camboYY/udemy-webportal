import { NextResponse } from "next/server";
import React from "react";

export default function middleware(request: Request) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = { matcher: ["/"] };
//"/dashboard/:path*"
