export interface BaseEvent {
  eventType: string;
  userId?: string;
  anonymousId: string;
  timestamp: string;
  device: "PC" | "Mobile" | "Tablet";
  url: string;
  referrer?: string;
  [key: string]: any;
}

export type ExtendEvent<T> = T & BaseEvent;
