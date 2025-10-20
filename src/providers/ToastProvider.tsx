"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ToastContext, ShowToastOptions } from "@/context/ToastContext";
import { Toast } from "@/components/Toast";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ShowToastOptions | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((opts: ShowToastOptions) => {
    setToast(opts);
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible || !toast) return;

    if (typeof toast.duration !== "number") return;

    const id = setTimeout(() => setVisible(false), toast.duration);

    return () => clearTimeout(id);
  }, [visible, toast]);

  const value = useMemo(
    () => ({ showToast, hideToast }),
    [showToast, hideToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        title={toast?.title}
        visible={visible}
        message={toast?.message}
        type={toast?.type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};
