export interface BaseEvent {
  eventType: string;
  isAnonymous: boolean;
  userId?: string;
  joinedYear?: number;
  regDate?: string;
  gender?: string;
  createdAt: string;
  device: 'PC' | 'Mobile';
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ExtendEvent<T> = T & BaseEvent;
