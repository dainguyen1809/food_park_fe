import { NotificationEnum } from '@/utils/enums/notification';
import { showNotification } from '@/utils/notification';
import { IApiResponse, IFormData } from '@/utils/types/register';
import authorizedAxiosInstance from '@/utils/axios';
import { AxiosError } from 'axios';

export const registerUser = async (data: IFormData): Promise<void> => {
  try {
    const res = await authorizedAxiosInstance.post('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });

    if (res.status === 204) {
      showNotification({
        type: NotificationEnum.SUCCESS,
        message: 'Registered successful!',
      });
    }
  } catch (error) {
    const axiosError = error as AxiosError<IApiResponse>;

    if (axiosError.response?.data?.errors) {
      console.log(axiosError.response.data.errors);
    }

    showNotification({
      type: NotificationEnum.ERROR,
      message: 'Registration failed. Please check your inputs.',
    });
  }
};
