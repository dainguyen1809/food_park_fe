import {
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
} from '@/api/Auth/login';
import { ILoginFormData, ILoginFormErrors } from '@/utils/types/login';
import { loginValidation } from '@/utils/validations/auth/loginValidation';
import React from 'react';

export const handleLoginSubmit = async (
  formData: ILoginFormData,
  setErrors: React.Dispatch<React.SetStateAction<ILoginFormErrors>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  navigate: (path: string) => void
): Promise<void> => {
  setLoading(true);
  setErrors({});

  const { errors, isValid } = loginValidation(formData);

  if (!isValid) {
    setErrors(errors);
    setLoading(false);
    return;
  }

  try {
    await loginUser(formData);
  } catch (error) {
    setErrorMessage(
      error instanceof Error ? error.message : 'An error occurred'
    );
  } finally {
    setLoading(false);
  }
};

export const handleGoogleLogin = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
): Promise<void> => {
  try {
    await loginWithGoogle();
    navigate('/');
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const handleFacebookLogin = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
): Promise<void> => {
  try {
    await loginWithFacebook();
    navigate('/');
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
