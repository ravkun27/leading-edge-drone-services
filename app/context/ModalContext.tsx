// contexts/modal-context.tsx
"use client";

import { createContext, useContext, useState } from "react";

type ModalContextType = {
  isQuoteOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isQuoteOpen,
        openQuoteModal: () => setIsQuoteOpen(true),
        closeQuoteModal: () => setIsQuoteOpen(false)
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);