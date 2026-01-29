"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { FiCheck, FiX, FiInfo, FiAlertCircle } from "react-icons/fi";
import { useCart } from "@/context/cartContext";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { setNotificationHandler } = useCart();

  const showNotification = useCallback(
    (message: string, type: NotificationType = "success", duration: number = 3000) => {
      const id = Math.random().toString(36).substring(7);
      const notification: Notification = { id, message, type, duration };

      setNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    },
    []
  );

  // Enregistrer le callback dans le CartContext
  useEffect(() => {
    setNotificationHandler(showNotification);
  }, [setNotificationHandler, showNotification]);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <FiCheck className="text-xl" />;
      case "error":
        return <FiX className="text-xl" />;
      case "warning":
        return <FiAlertCircle className="text-xl" />;
      case "info":
        return <FiInfo className="text-xl" />;
      default:
        return <FiCheck className="text-xl" />;
    }
  };

  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, notifications }}>
      {children}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${getBgColor(notification.type)} text-white px-6 py-3 shadow-lg flex items-center gap-3 animate-slide-up min-w-[300px] max-w-md`}
          >
            {getIcon(notification.type)}
            <span className="flex-1">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="hover:opacity-80 transition-opacity"
              aria-label="Fermer"
            >
              <FiX size={18} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}

