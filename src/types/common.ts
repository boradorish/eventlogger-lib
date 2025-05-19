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
  referrer?: string;
  [key: string]: any;
}

export type ExtendEvent<T> = T & BaseEvent;
