import { NotificationEnum } from '@/utils/enums/notification';
import { showNotification } from '@/utils/notification';
import { IApiResponse, IFormData } from '@/utils/types/register';
import axios, { AxiosError } from 'axios';

export const registerUser = async (data: IFormData): Promise<void> => {
  try {
    const res = await axios.post(`http://localhost:8001/api/v1/auth/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });

    console.log(res);

    if (res.status === 204) {
      showNotification({
        type: NotificationEnum.SUCCESS,
        message: 'Registered successful!',
      });
    }
  } catch (error) {
    const AxiosError = error as AxiosError<IApiResponse>;

    if (AxiosError.response?.data?.errors) {
      console.log(AxiosError.response.data.errors);
    }
  }
};
