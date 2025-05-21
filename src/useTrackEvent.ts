import { useEffect, useCallback } from 'react';
import { useLogger } from './LoggerContext';
import { BaseEvent } from './types';

interface TrackOptions {
  on: 'mount' | 'click' | 'hover';
  disabled?: boolean;
}

export function useTrackEvent<E extends BaseEvent>(
  event: E,
  options: TrackOptions,
) {
  const logger = useLogger();
  const { on, disabled } = options;

  useEffect(() => {
    if (disabled) return;
    if (on === 'mount') {
      logger.track(event);
    }
  }, [on, event, logger]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    if (on === 'click') {
      logger.track(event);
    }
  }, [on, event, logger]);

  const handleHover = useCallback(() => {
    if (disabled) return;
    if (on === 'hover') {
      logger.track(event);
    }
  }, [on, event, logger]);

  return {
    onClick: handleClick,
    onMouseEnter: handleHover,
  };
}
