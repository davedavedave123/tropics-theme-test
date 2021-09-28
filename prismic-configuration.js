import Prismic from '@prismicio/client';
import Link from 'next/link';

// import smConfig from './sm.json';

// if (!smConfig.apiEndpoint) {
//   console.warn(
//     "Looks like Slice Machine hasn't been bootstraped already.\nCheck the `Getting Started` section of the README file :)"
//   );
// }

// export const apiEndpoint = 'https://tropics-theme-test.cdn.prismic.io/api/v2';
export const apiEndpoint = 'https://your-repo-name.cdn.prismic.io/api/v2';

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = '';

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = doc => {
  if (doc.type === 'page') {
    return `/${doc.uid}`;
  }
  if (doc.type === 'home_page') {
    return `/`;
  }
  if (doc.type === 'blog_home') {
    return `/blog`;
  }
  if (doc.type === 'blog') {
    return `/blog/${doc.uid}`;
  }
  // if(doc.type === 'home')
  return '/';
};

// Additional helper function for Next/Link components
export const hrefResolver = doc => {
  if (doc.type === 'post') {
    return '/blog/[uid]';
  }
  return '/';
};

export const customLink = (type, element, content, children, index) => (
  <Link
    key={index}
    href={linkResolver(element.data)}
    as={linkResolver(element.data)}
  >
    <a>{content}</a>
  </Link>
);

export const Router = {
  routes: [
    { type: 'page', path: '/:uid' },
    { type: 'home-page', path: '/' },
  ],
  href: type => {
    const route = Router.routes.find(r => r.type === type);
    return route && route.href;
  },
};

// export const Client = (req = null, options = {}) =>
//   Prismic.client(
//     apiEndpoint,
//     Object.assign({ routes: Router.routes }, options)
//   );
