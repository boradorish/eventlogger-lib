import { ClickEvent } from "./events";

export interface PostClickEvent extends ClickEvent {
  eventType: "post_click";
  postId: string;
  postTitle: string;
  pageNumber: number;
  indexInPage: number;
  category?: string;
}

export interface DropdownClickEvent extends ClickEvent {
  eventType: "dropdown_click";
  dropdownName: string;
  itemId: string;
}
