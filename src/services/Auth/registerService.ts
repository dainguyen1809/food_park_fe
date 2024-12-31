import { registerUser } from '@/api/Auth/register';
import { IFormData, IFormErrors } from '@/utils/types/register';
import { registerValidation } from '@/utils/validations/auth/registerValidation';

export const handleRegisterSubmit = async (
  formData: IFormData,
  setErrors: React.Dispatch<React.SetStateAction<IFormErrors>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  navigate: (path: string) => void
): Promise<void> => {
  setLoading(true);
  setErrors({});

  const { errors, isValid } = registerValidation(formData);

  if (!isValid) {
    setErrors(errors);
    setLoading(false);
    return;
  }

  try {
    await registerUser(formData);
    navigate('/test');
  } catch (error) {
    setErrorMessage(
      error instanceof Error ? error.message : 'An error occurred!'
    );
    setLoading(false);
  }
};
