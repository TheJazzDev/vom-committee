'use client';

import { useState, useEffect } from 'react';

interface UsePrintModeReturn {
  printMode: boolean;
  togglePrintMode: () => void;
  setPrintMode: (value: boolean) => void;
}

export const usePrintMode = (): UsePrintModeReturn => {
  const [printMode, setPrintModeState] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const storedMode = localStorage.getItem('printMode');
    if (storedMode !== null) {
      try {
        setPrintModeState(JSON.parse(storedMode));
      } catch (error) {
        console.error('Error parsing printMode from localStorage:', error);
        localStorage.removeItem('printMode');
      }
    }
  }, []);

  // Sync to localStorage whenever printMode changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('printMode', JSON.stringify(printMode));
    }
  }, [printMode, isMounted]);

  const togglePrintMode = () => {
    setPrintModeState((prev) => !prev);
  };

  const setPrintMode = (value: boolean) => {
    setPrintModeState(value);
  };

  return {
    printMode,
    togglePrintMode,
    setPrintMode,
  };
};