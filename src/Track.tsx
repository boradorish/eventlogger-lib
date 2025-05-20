import { ReactNode } from "react";
import { useTrackEvent } from "./useTrackEvent";
import { BaseEvent } from "./types";

interface TrackProps<E extends BaseEvent> {
  event: E;
  on: "mount" | "click" | "hover";
  children: ReactNode;
}

const Track = <E extends BaseEvent>({ event, on, children }: TrackProps<E>) => {
  const eventProps = useTrackEvent<E>(event, { on });

  return <div {...eventProps}>{children}</div>;
};

export default Track;
