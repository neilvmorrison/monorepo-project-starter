import React, { useEffect, useState, createContext, useContext } from "react";
import { useTransition, animated } from "@react-spring/web";
import styles from "./toast.module.css";

// Toast types
export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // In milliseconds, undefined for persistent
  onDismiss?: () => void;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastProps, "id">) => string;
  removeToast: (id: string) => void;
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const AnimatedDiv = animated("div");

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const IconByType = ({ type }: { type: ToastType }) => {
  switch (type) {
    case "success":
      return (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "error":
      return (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "warning":
      return (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9V13M12 17H12.01M3.44722 18.1056C2.33812 19.9406 3.67142 22.25 5.86852 22.25H18.1315C20.3286 22.25 21.6619 19.9406 20.5528 18.1056L14.2507 7.39445C13.1126 5.50397 10.8874 5.50397 9.74926 7.39445L3.44722 18.1056Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "info":
    default:
      return (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

export const Toast = ({
  id,
  message,
  type,
  duration,
  onDismiss,
}: ToastProps) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  return (
    <div
      className={`${styles.toast} ${styles[`toast-${type}`]}`}
      data-toast-id={id}
    >
      <div className={styles.content}>
        <IconByType type={type} />
        <p className={styles.message}>{message}</p>
      </div>
      <button
        className={styles.closeButton}
        onClick={onDismiss}
        aria-label="Close toast"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
}> = ({ children, defaultPosition = "bottom-right" }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [position, setPosition] = useState<ToastPosition>(defaultPosition);

  const addToast = (toast: Omit<ToastProps, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const transitions = useTransition(toasts, {
    keys: (item) => item.id,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    config: { tension: 280, friction: 24 },
  });

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast, position, setPosition }}
    >
      {children}
      <div
        className={`${styles.container} ${styles[position]}`}
        role="region"
        aria-live="polite"
      >
        {transitions((style, toast) => (
          <AnimatedDiv style={style} key={toast.id}>
            <Toast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onDismiss={() => removeToast(toast.id)}
            />
          </AnimatedDiv>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
