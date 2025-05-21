import { ExtendEvent } from './common';

export type PageViewEvent = ExtendEvent<{
  pageTitle: string;
}>;

export type SearchEvent = ExtendEvent<{
  searchLocation: string;
  searchKeyword: string;
  searchType: 'title' | 'content' | 'title-content' | 'nickname';
}>;

export type ClickEvent = ExtendEvent<{
  pageTitle: string;
  target: string;
}>;

export type CustomEvent = ExtendEvent<{
  actionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}>;
