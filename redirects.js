const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const aboutToServices = {
    source: '/about',
    destination: '/services',
    permanent: true,
  }

  // 301 rather than `permanent: true`, which Next serves as a 308. Both are
  // permanent; 301 is the one search engines and old bookmarks handle most
  // predictably for a page that moved.
  const contactToServices = {
    source: '/contact',
    destination: '/services#contact',
    statusCode: 301,
  }

  const redirects = [internetExplorerRedirect, aboutToServices, contactToServices]

  return redirects
}

export default redirects
