import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  open: true,
  toggle: () => {},
  close: () => {},
});

export const useSidebarState = () => useContext(SidebarContext);

export const SidebarStateProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <SidebarContext.Provider
      value={{
        open,
        toggle: () => setOpen((o) => !o),
        close: () => setOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
