import { useEffect, useState } from 'react';

/**
 * Devuelve:
 * - null  -> durante SSR / antes del mount (evita hydration mismatch)
 * - true  -> online
 * - false -> offline
 */
export function useOnlineStatus() {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update(); // valor real al montar

    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  return online;
}
