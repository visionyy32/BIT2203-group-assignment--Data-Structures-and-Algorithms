import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  showPanel: boolean;
  togglePanel: () => void;
}

const defaultNotifications: Notification[] = [
  { id: "1", title: "New video: Graphs Explained!", time: "2 hours ago", read: false },
  { id: "2", title: "DS Academy uploaded a new video", time: "5 hours ago", read: false },
  { id: "3", title: "Your comment got 10 likes", time: "1 day ago", read: true },
];

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllRead: () => {},
  showPanel: false,
  togglePanel: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [showPanel, setShowPanel] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  }, []);

  const togglePanel = useCallback(() => {
    setShowPanel((p) => !p);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, showPanel, togglePanel }}>
      {children}
    </NotificationContext.Provider>
  );
};
