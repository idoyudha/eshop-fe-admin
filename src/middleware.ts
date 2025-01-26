import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./lib/auth-config";
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { signOut } from 'aws-amplify/auth';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { request, response },
        operation: async (contextSpec) => {
            try {
                const session = await fetchAuthSession(contextSpec)
                const userAttributes = session.tokens?.idToken?.payload;
                const isAdmin = userAttributes?.['custom:role'] === 'admin';
                if (!isAdmin) {
                    await signOut();
                    return NextResponse.rewrite(new URL('/auth/unauuthorized', request.url));
                }

                return (
                    session.tokens?.accessToken !== undefined &&
                    session.tokens?.idToken !== undefined
                )
            } catch (error) {
                console.log(error);
                return false
            }
        }
    })
    
    const isAuthPath = request.nextUrl.pathname.startsWith('/auth')

    // if user is not authenticated and try to access non-auth path, redirect to login page
    if (!authenticated && !isAuthPath) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // if user is authenticated and trying to access auth pages (like login)
    if (authenticated && isAuthPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ]
};