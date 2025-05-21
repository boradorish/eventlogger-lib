import { renderHook, act } from "@testing-library/react";
import { UserProvider, useUser } from "../UserContext";
import { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

describe("UserContext", () => {
  it("should initialize as anonymous", () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current.isAnonymous).toBe(true);
    expect(result.current.userId).toBeUndefined();
  });

  it("should set user and change anonymous state", () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    act(() => {
      result.current.setUser("user123");
    });

    expect(result.current.isAnonymous).toBe(false);
    expect(result.current.userId).toBe("user123");
  });

  it("should clear user information", () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    act(() => {
      result.current.setUser("user123");
      result.current.clearUser();
    });

    expect(result.current.isAnonymous).toBe(true);
    expect(result.current.userId).toBeUndefined();
  });
});
