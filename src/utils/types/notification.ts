import { NotificationEnum } from '@/utils/enums/notification';

export interface INotification {
  type: NotificationEnum;
  message: string;
}
