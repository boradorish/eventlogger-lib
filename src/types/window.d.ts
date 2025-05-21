// src/types/window.d.ts
export {};

declare global {
  interface Window {
    TrackRegistry: Set<string>;
  }
}
