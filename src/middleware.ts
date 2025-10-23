import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import path from "path";
import {getSessionCookie} from "better-auth/cookies"


const protectedRoutes = ['/profile','/post/create','/post/edit']


export async function middleware(request:NextRequest) {
    const pathName = request.nextUrl.pathname

    const session = getSessionCookie(request)
    const isProtectedRoute = protectedRoutes.some(route=>pathName.startsWith(route));

    if(isProtectedRoute == !session){
        return NextResponse.redirect(new URL('/auth',request.url));


    }
    if(pathName === 'auth' && session){
        return NextResponse.redirect(new URL('/',request.url))
    }
    
   
}
 export const config ={
        matcher:['/profile/:path*','/postcreate','/post/edit/:path','/auth']
    }
   
  

