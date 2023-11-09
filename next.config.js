/** @type {import('next').NextConfig} */
const nextConfig = {}

const path = require('path')
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['drive.google.com'], // Add your domain here
  },
}

module.exports = nextConfig
