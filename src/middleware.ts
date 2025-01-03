import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const protectedRoutes = [
    "/pages/categories/AllCategory",
    "/pages/categories/CreateCategory",
    "/pages/categories/EditCategory/",
    "/pages/subCategories/AllSubCategory",
    "/pages/subCategories/CreateSubCategory",
    "/pages/subCategories/EditSubCategory/",
    "/pages/posts/AllPost",
    "/pages/posts/CreatePost",
    "/pages/posts/EditPost/",
    "/pages/sponsors/AllSponsor",
    "/pages/sponsors/CreateSponsor",
    "/pages/sponsors/EditSponsor/",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/pages/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/:path*"],
};
