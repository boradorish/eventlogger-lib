import { ReactNode, useEffect } from "react";
import { useTrackEvent } from "./useTrackEvent";
import { BaseEvent } from "./types";
import { addToRegistry, removeFromRegistry } from "./utils/trackRegistry";
interface TrackProps<E extends BaseEvent> {
  event: E;
  on: "mount" | "click" | "hover";
  children: ReactNode;
}

const Track = <E extends BaseEvent>({ event, on, children }: TrackProps<E>) => {
  const eventId = `${event.eventType}::${event.url || window.location.href}`;

  useEffect(() => {
    console.log("[Track] 등록됨:", eventId);
    addToRegistry(eventId);

    return () => {
      console.log("[Track] 해제됨:", eventId);
      removeFromRegistry(eventId);
    };
  }, [eventId]);
  const eventProps = useTrackEvent<E>(event, { on });

  return <div {...eventProps}>{children}</div>;
};

export default Track;
