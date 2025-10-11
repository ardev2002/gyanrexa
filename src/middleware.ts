import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAdmin = session?.user?.email === "dekalasit@gmail.com" || session?.user?.email === "manabendra847@gmail.com";
  if (!session || !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/crud"]
}
