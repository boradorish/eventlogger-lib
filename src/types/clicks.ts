import { ClickEvent } from './events';

export interface PostClickEvent extends ClickEvent {
  postId: string;
  postTitle: string;
  pageNumber: number;
  indexInPage: number;
  category?: string;
}

export interface DropdownClickEvent extends ClickEvent {
  dropdownName: string;
  itemId: string;
}
