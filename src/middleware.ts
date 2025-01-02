import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authenticate = false;

  // ROTAS CATEGORIA
  if (
    request.nextUrl.pathname.startsWith("/pages/categories/CreateCategory") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/categories/AllCategory") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/categories/EditCategory/") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  // ROTAS SUB-CATEGORIAS
  if (
    request.nextUrl.pathname.startsWith("/pages/subCategories/CreateSubCategory") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/subCategories/AllSubCategory") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/subCategories/EditSubCategory/") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  // ROTAS PUBLICAÇÕES
  if (
    request.nextUrl.pathname.startsWith("/pages/posts/CreatePost") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/posts/AllPost") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/posts/EditPost/") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  // ROTAS PATROCINADORES
  if (
    request.nextUrl.pathname.startsWith("/pages/sponsors/CreateSponsor") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/sponsors/AllSponsor") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  if (
    request.nextUrl.pathname.startsWith("/pages/sponsors/EditSponsor/") &&
    !authenticate
  )
    return NextResponse.redirect(new URL("/pages/Login", request.url));

  return NextResponse.next();
}
