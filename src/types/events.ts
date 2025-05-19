import { ExtendEvent } from './common';

export interface PageViewEvent
  extends ExtendEvent<{
    eventType: 'page_view';
    pageTitle: string;
  }> {}

export interface SearchEvent
  extends ExtendEvent<{
    eventType: 'search';
    searchLocation: string;
    searchKeyword: string;
    searchType: 'title' | 'content' | 'title-content' | 'nickname';
  }> {}

export interface ClickEvent
  extends ExtendEvent<{
    eventType: string;
    pageTitle: string;
    target: string;
  }> {}

export interface CustomEvent
  extends ExtendEvent<{
    eventType: string;
    actionName: string;
    metadata?: Record<string, any>;
  }> {}
