import nextTranslate from 'next-translate';

const nextConfig = nextTranslate({
  // Your existing Next.js config
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
});

export default nextConfig;