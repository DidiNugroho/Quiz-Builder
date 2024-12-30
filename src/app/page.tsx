import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;
    const locale = 'en'; // Default locale, you can change this based on your logic

    // Redirect to the same path with the locale prefix
    router.replace(`/${locale}${asPath}`);
  }, [router]);

  return null;
}