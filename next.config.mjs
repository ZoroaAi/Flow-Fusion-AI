/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/api/:path',
                has: [
                    {
                        type: 'header',
                        key: 'x-secret-token',
                        value: '(?<token>.*)', // capture the token
                    }
                ],
                destination: '/',
                permanent: false,
            }
        ]
    }
};

export default nextConfig;
