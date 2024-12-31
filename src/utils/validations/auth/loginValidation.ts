// src/validations/authValidation.ts
import { ILoginFormData, ILoginFormErrors } from '@/utils/types/login';

export const loginValidation = (
  formData: ILoginFormData
): { errors: ILoginFormErrors; isValid: boolean } => {
  const errors: ILoginFormErrors = {};
  let isValid = true;

  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!formData.email.includes('@')) {
    errors.email = 'Please enter a valid email';
    isValid = false;
  }

  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  return { errors, isValid };
};
