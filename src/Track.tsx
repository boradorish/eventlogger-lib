import { ReactNode, useState, useEffect, useRef } from 'react';
import { useTrackEvent } from './useTrackEvent';
import { BaseEvent } from './types';
import { addToRegistry, removeFromRegistry } from './utils/trackRegistry';
interface TrackProps<E extends BaseEvent> {
  eventName: string;
  on: 'mount' | 'click' | 'hover';
  if?: boolean;
  once?: boolean;
  attributes?: Partial<E>;
  children: ReactNode;
}

const Track = <E extends BaseEvent>({
  eventName,
  on = 'mount',
  if: shouldTrack = true,
  once = false,
  attributes,
  children,
}: TrackProps<E>) => {
  const [hasTracked, setHasTracked] = useState(false);
  const eventId = `${eventName}::${window.location.href}`;
  const eventProps = useTrackEvent<E>(
    {
      eventType: eventName,
      ...attributes,
    } as E,
    { on, disabled: !shouldTrack || (once && hasTracked) },
  );
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!shouldTrack) return;

    if (on === 'mount' && (!once || !trackedRef.current)) {
      console.log('[Track] 등록됨:', eventId);
      addToRegistry(eventId);
      trackedRef.current = true;
      setHasTracked(true);
    }

    return () => {
      if (on === 'mount') {
        console.log('[Track] 해제됨:', eventId);
        removeFromRegistry(eventId);
      }
    };
  }, [eventId, shouldTrack, once, on]);

  return <div {...eventProps}>{children}</div>;
};

export default Track;
