if (typeof window !== 'undefined') {
  (window as any).TrackRegistry = new Set<string>();
}

export const addToRegistry = (eventId: string) => {
  (window as any).TrackRegistry.add(eventId);
};

export const isInRegistry = (eventId: string): boolean => {
  return (window as any).TrackRegistry.has(eventId);
};

export const removeFromRegistry = (eventId: string) => {
  (window as any).TrackRegistry.delete(eventId);
};
