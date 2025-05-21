import { renderHook, act } from '@testing-library/react';
import { DeviceProvider, useDevice } from '../DeviceContext';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => {
  return <DeviceProvider>{children}</DeviceProvider>;
};

describe('DeviceContext', () => {
  it('should detect PC by default', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });
    expect(result.current.device).toBe('PC');
  });

  it('should detect Mobile when window is resized', () => {
    const { result } = renderHook(() => useDevice(), { wrapper });

    act(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.device).toBe('Mobile');
  });
});
