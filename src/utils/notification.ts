import { NotificationEnum } from '@/utils/enums/notification';
import { INotification } from '@/utils/types/notification';
import { toast } from 'react-toastify';

export const showNotification = ({ type, message }: INotification) => {
  switch (type) {
    case NotificationEnum.SUCCESS:
      toast.success(message);
      break;

    case NotificationEnum.WARNING:
      toast.warn(message);
      break;

    case NotificationEnum.ERROR:
      toast.error(message);
      break;

    case NotificationEnum.INFO:
      toast.info(message);
      break;
  }
};
