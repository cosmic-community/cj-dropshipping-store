/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cjdropshipping.com',
      'cjdropshipping-syd.oss-ap-southeast-2.aliyuncs.com',
      'cjdropshipping-us.oss-us-west-1.aliyuncs.com',
    ],
  },
  env: {
    CJ_API_KEY: process.env.CJ_API_KEY,
    CJ_API_BASE_URL: process.env.CJ_API_BASE_URL,
  },
}

module.exports = nextConfig