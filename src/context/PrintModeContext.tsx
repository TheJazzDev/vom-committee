'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface PrintModeContextProps {
  printMode: boolean;
  togglePrintMode: () => void;
}

const PrintModeContext = createContext<PrintModeContextProps | undefined>(
  undefined
);

export const PrintModeProvider = ({ children }: { children: ReactNode }) => {
  const [printMode, setPrintMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedMode = localStorage.getItem('printMode');
    if (storedMode !== null) {
      try {
        setPrintMode(JSON.parse(storedMode));
      } catch (error) {
        console.error('Error parsing printMode from localStorage:', error);
        localStorage.removeItem('printMode');
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('printMode', JSON.stringify(printMode));
    }
  }, [printMode, isMounted]);

  const togglePrintMode = () => setPrintMode((prev) => !prev);

  return (
    <PrintModeContext.Provider value={{ printMode, togglePrintMode }}>
      {children}
    </PrintModeContext.Provider>
  );
};

export const usePrintMode = () => {
  const context = useContext(PrintModeContext);
  if (!context) {
    throw new Error('usePrintMode must be used within a PrintModeProvider');
  }
  return context;
};
