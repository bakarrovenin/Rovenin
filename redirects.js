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

  const redirects = [internetExplorerRedirect, aboutToServices]

  return redirects
}

export default redirects
