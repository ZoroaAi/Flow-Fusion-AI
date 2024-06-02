
export function middleware(req){
    const { pathname } = req.nextUrl;

    if(pathname.startsWith('/api/')){
        const token = req.headers.get('x-secret-token');
        if(token!== process.env.SECRET_TOKEN){
            return new Response('Forbidden', {status: 403});
        }
    }
}

export const config = {
    matcher: '/api/:path'
}