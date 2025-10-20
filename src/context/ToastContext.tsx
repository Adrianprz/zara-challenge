"use client";

import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export type ShowToastOptions = {
  title: string;
  message: string;
  type?: ToastType;
  duration?: number;
};

export interface ToastContextType {
  showToast: (opts: ShowToastOptions) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
