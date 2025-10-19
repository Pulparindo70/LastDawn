import { useEffect, useState } from 'react';

type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(false);
  const [deferred, setDeferred] = useState<DeferredInstallPrompt | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as DeferredInstallPrompt);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () =>
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  const install = async () => {
    if (!deferred) return { outcome: 'dismissed' as const };
    await deferred.prompt();
    const result = await deferred.userChoice;
    // Reset (Chrome solo permite una vez por evento)
    setDeferred(null);
    setCanInstall(false);
    return result;
  };

  return { canInstall, install };
}
