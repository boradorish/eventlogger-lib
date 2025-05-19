import { BaseEvent } from '../types';

export async function httpTransport(events: BaseEvent[], endpoint: string) {
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: events.map((e) => JSON.stringify(e)).join('\n'),
    });
    console.log('[Logger] Events sent to:', endpoint);
  } catch (error) {
    console.error('[Logger] Failed to send events to:', endpoint, error);
  }
}
