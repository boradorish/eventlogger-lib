import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type DeviceType = "Mobile" | "PC";

interface DeviceContextType {
  device: DeviceType;
}

interface DeviceProviderProps {
  children: ReactNode;
  breakpoints?: {
    mobile: number;
    pc: number;
  };
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider = ({
  children,
  breakpoints = { mobile: 768, pc: 1440 },
}: DeviceProviderProps) => {
  const [device, setDevice] = useState<DeviceType>("PC");

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < breakpoints.mobile) {
      setDevice("Mobile");
    } else {
      setDevice("PC");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoints]);

  return (
    <DeviceContext.Provider value={{ device }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("DeviceProvider가 최상단에 설정되어 있지 않습니다.");
  }
  return context;
};
