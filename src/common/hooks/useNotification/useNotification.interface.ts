export type NotificationType = 'success' | 'error' | 'info' | 'custom';
export type NotificationId = string | number;

export interface Notification {
  id: NotificationId;
  content: React.ReactNode;
  type?: NotificationType;
  title?: string;
  timerAutoClose?: number;
}
