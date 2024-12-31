import { NotificationEnum } from '@/utils/enums/notification';
import { showNotification } from '@/utils/notification';
import { ILoginFormData } from '@/utils/types/login';
import authorizedAxiosInstance from '@/utils/axios';

export const loginUser = async (data: ILoginFormData): Promise<void> => {
  try {
    const res = await authorizedAxiosInstance.post('/auth/login', {
      email: data.email,
      password: data.password,
    });

    if (res.status === 204) {
      console.log(res);
    }

    showNotification({
      type: NotificationEnum.SUCCESS,
      message: 'Login successfully.',
    });
  } catch (error) {
    showNotification({
      type: NotificationEnum.ERROR,
      message: 'Unknown your email or password. Please try again',
    });
  }
};

export const loginWithGoogle = async (): Promise<void> => {
  try {
    const res = await authorizedAxiosInstance.get('/auth/login/google');

    if (res.status === 200 && res.data.redirect_url) {
      window.location.href = res.data.redirect_url;
    }
  } catch (error) {
    showNotification({
      type: NotificationEnum.ERROR,
      message: 'Google login failed. Please try again.',
    });
  }
};

export const loginWithFacebook = async (): Promise<void> => {
  try {
    const res = await authorizedAxiosInstance.get('/auth/login/facebook');

    if (res.status === 200 && res.data.url) {
      window.location.href = res.data.url;
    }
  } catch (error) {
    showNotification({
      type: NotificationEnum.ERROR,
      message: 'Facebook login failed. Please try again.',
    });
  }
};
