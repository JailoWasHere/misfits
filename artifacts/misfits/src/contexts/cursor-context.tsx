import { createContext, useContext, useState, type ReactNode } from "react";

interface CursorContextType {
  enabled: boolean;
  toggle: () => void;
}

const CursorContext = createContext<CursorContextType>({
  enabled: true,
  toggle: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  return (
    <CursorContext.Provider value={{ enabled, toggle: () => setEnabled((p) => !p) }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
