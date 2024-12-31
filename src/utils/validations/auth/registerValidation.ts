import { IFormData, IFormErrors } from '@/utils/types/register';

export const registerValidation = (
  formData: IFormData
): { errors: IFormErrors; isValid: boolean } => {
  const errors: IFormErrors = {};
  let isValid = true;

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  }
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  }
  if (formData.password !== formData.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match';
    isValid = false;
  }

  return { errors, isValid };
};
