if (typeof window !== 'undefined') {
  window.TrackRegistry = new Set<string>();
}

export const addToRegistry = (eventId: string) => {
  window.TrackRegistry.add(eventId);
};

export const isInRegistry = (eventId: string): boolean => {
  return window.TrackRegistry.has(eventId);
};

export const removeFromRegistry = (eventId: string) => {
  window.TrackRegistry.delete(eventId);
};
