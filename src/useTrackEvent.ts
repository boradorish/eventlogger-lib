import { useEffect, useCallback } from "react";
import { useLogger } from "./logger-context";
import { BaseEvent } from "./types";

interface TrackOptions {
  on: "mount" | "click" | "hover";
}

export function useTrackEvent<E extends BaseEvent>(
  event: E,
  options: TrackOptions,
) {
  const logger = useLogger();

  useEffect(() => {
    if (options.on === "mount") {
      logger.track(event);
    }
  }, [options.on, event, logger]);

  const handleClick = useCallback(() => {
    if (options.on === "click") {
      logger.track(event);
    }
  }, [options.on, event, logger]);

  const handleHover = useCallback(() => {
    if (options.on === "hover") {
      logger.track(event);
    }
  }, [options.on, event, logger]);

  return {
    onClick: handleClick,
    onMouseEnter: handleHover,
  };
}
