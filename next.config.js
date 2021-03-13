const path = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  sassOption: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  poweredByHeader: false,
  images: {
    domains: ['books.google.com']
  },
  pwa:{
    dest: 'public',
    runtimeCaching,
    register: true,
    sw: 'service-worker.js',
  },
})
