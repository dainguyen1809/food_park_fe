export interface IFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IFormErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  general?: string;
}

export interface IApiResponse {
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}
