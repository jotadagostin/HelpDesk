import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  duration?: number;
}

export function Notification({ message, duration = 3000 }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        backgroundColor: "#f44336",
        color: "white",
        padding: "10px 20px",
        borderRadius: 5,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}
