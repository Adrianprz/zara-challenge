"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface ToastProps {
  title?: string;
  visible?: boolean;
  message?: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export function Toast({
  title = "",
  visible = false,
  message = "",
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);

    return () => clearTimeout(timeout);
  }, [isClosing, onClose]);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsClosing(false);

      // auto close
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(autoCloseTimer);
    } else if (isVisible) {
      handleClose();
    }
  }, [visible, duration, handleClose, isVisible]);

  if (!isVisible) return null;

  const typeClass = `c-toast--${type}`;
  const closingClass = isClosing ? "c-toast--closing" : "";

  return (
    <div
      className={`c-toast ${typeClass} ${closingClass}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="c-toast__container">
        {title && <span className="c-toast__title">{title}</span>}
        {message && <span className="c-toast__message">{message}</span>}
      </div>

      <button
        type="button"
        className="c-toast__close"
        aria-label="Cerrar notificación"
        onClick={handleClose}
      >
        <Image src="/cross.svg" alt="Cerrar" width={20} height={20} />
      </button>
    </div>
  );
}
