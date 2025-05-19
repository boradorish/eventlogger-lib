import { BaseEvent } from './types';
import { httpTransport } from './transports/httpTransport';

export interface LoggerConfig {
  endpoint: string;
  batchInterval?: number;
}

export class EventLogger {
  private queue: BaseEvent[] = [];
  private flushInterval: number;
  private timerId: NodeJS.Timeout;
  private endpoint: string;

  constructor(config: LoggerConfig) {
    this.flushInterval = config.batchInterval || 5000;
    this.endpoint = config.endpoint;
    this.timerId = setInterval(() => this.flush(), this.flushInterval);
  }

  track<E extends BaseEvent>(event: E) {
    console.log('[Logger] Tracked Event:', event);
    this.queue.push(event);
  }

  private async flush() {
    if (this.queue.length === 0) return;
    const events = this.queue.splice(0, this.queue.length);

    try {
      await httpTransport(events, this.endpoint);
      console.log('[Logger] Events Flushed:', events);
    } catch (error) {
      console.error('[Logger] Failed to send events', error);
      this.queue.unshift(...events);
    }
  }

  dispose() {
    clearInterval(this.timerId);
  }
}
