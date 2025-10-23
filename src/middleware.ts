import { NextRequest } from "next/server";

const protectedRoutes = ['/profile','/post/create','/post/edit']


export async function middleware(request:NextRequest) {
    const pathName = request.nextUrl.pathname
}