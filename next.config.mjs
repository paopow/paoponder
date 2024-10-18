// import createMDX from '@next/mdx';
// const withMDX = createMDX();

/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    // basePath: "/paoponder",
    images: {
        unoptimized: true,
    },
    transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
