import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLogger } from './LoggerContext';
import { useDevice } from './DeviceContext';
import { PageViewEvent } from './types';
import { isInRegistry } from './utils/trackRegistry';
import { useUser } from './UserContext';

const AutoTrack = () => {
  const logger = useLogger();
  const { device } = useDevice();
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const eventId = `page_view::${url}`;

      if (isInRegistry(eventId)) {
        console.log('[AutoTrack] Track에 의해 이미 관리됨:', eventId);
        return;
      }

      logger.track<PageViewEvent>({
        eventType: 'pageview',
        createdAt: new Date().toISOString(),
        device: device,
        pageTitle: document.title,
        isAnonymous: user.isAnonymous,
        userId: user.userId,
        gender: user.gender,
        regDate: user.regDate,
        joinedYear: user.joinedYear,
        url: window.location.href,
      });

      console.log('[AutoTrack] 페이지뷰 기록됨:', url);
    };

    handleRouteChange(window.location.href);

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [logger, device, router]);

  return null;
};

export default AutoTrack;
