import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("nextauth.token")?.value;

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
    "/pages/users/Dashboard",
    "/pages/users/EditUser",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if ((request.nextUrl.pathname === "/" && token) || (request.nextUrl.pathname === "/pages/Login" && token)) {
    return NextResponse.redirect(
      new URL("/pages/users/Dashboard", request.url)
    );
  }

  // Verificar rotas protegidas
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/pages/Login", request.url));
  }

  return NextResponse.next();
}
