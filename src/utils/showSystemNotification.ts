import { toast } from "react-toastify";
import { getOs } from "./getOs";

type SystemNotificationInput = {
  title: string;
  body?: string;
  icon?: string;
  onClick?: () => void;
  onError?: (this: Notification, ev: Event) => void;
  onClose?: (this: Notification, ev: Event) => void;
};
export const showSystemNotification = ({
  body,
  title,
  onClick,
  onClose,
  onError,
  icon = "icon.png",
}: SystemNotificationInput) => {
  Notification.requestPermission().then((result) => {
    if (result === "denied") {
      toast.error("Failed to grant permission for system notification");
    }
  });


  const notif = new Notification(title, {
    body,
    icon:getOs() === 'MacOS' ? undefined:icon,
  });

  if (onClick) notif.onclick = onClick;
  if (onClose) notif.onclose = onClose;
  if (onError) notif.onerror = onError;

};
