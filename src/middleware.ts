import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("nextauth.token")?.value;

  const protectedRoutes = [
    "/pages/categories/allcategory",
    "/pages/categories/createcategory",
    "/pages/categories/editcategory/",
    "/pages/subcategories/allsubcategory",
    "/pages/subcategories/createsubcategory",
    "/pages/subcategories/editsubcategory/",
    "/pages/posts/allpost",
    "/pages/posts/createpost",
    "/pages/posts/editpost/",
    "/pages/sponsors/allsponsor",
    "/pages/sponsors/createsponsor",
    "/pages/sponsors/editsponsor/",
    "/pages/users/dashboard",
    "/pages/users/edituser/",
    "/pages/users/userid/",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (request.nextUrl.pathname === "/pages/login" && token) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // Verificar rotas protegidas
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  return NextResponse.next();
}
