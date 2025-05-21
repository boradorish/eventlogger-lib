import { renderHook } from '@testing-library/react';
import { LoggerProvider, useLogger } from '../LoggerContext';
import { LoggerConfig } from '../logger';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => {
  const config: LoggerConfig = {
    endpoint: 'http://localhost:8000',
    batchInterval: 5000,
  };
  return <LoggerProvider config={config}>{children}</LoggerProvider>;
};

describe('LoggerContext', () => {
  it('should initialize with the correct config', () => {
    const { result } = renderHook(() => useLogger(), { wrapper });

    expect(result.current.endpoint).toBe('http://localhost:8000');
    expect(result.current.flushInterval).toBe(5000);
  });

  it('should track events correctly', () => {
    const { result } = renderHook(() => useLogger(), { wrapper });

    result.current.track({
      eventType: 'click',
      url: 'http://example.com',
      createdAt: new Date().toISOString(),
      isAnonymous: false,
      device: 'Mobile',
    });

    expect(result.current.queue.length).toBe(1);
    expect(result.current.queue[0].eventType).toBe('click');
  });
});
