import { createContext, useContext, ReactNode } from "react";
import { EventLogger, LoggerConfig } from "./logger";

const LoggerContext = createContext<EventLogger | null>(null);

export function LoggerProvider({
  config,
  children,
}: {
  config: LoggerConfig;
  children: ReactNode;
}) {
  const logger = new EventLogger(config);

  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
}

export function useLogger(): EventLogger {
  const context = useContext(LoggerContext);

  if (!context) {
    throw new Error("LoggerProvider가 최상단에 설정되어 있지 않습니다.");
  }

  return context;
}

export { LoggerContext };
