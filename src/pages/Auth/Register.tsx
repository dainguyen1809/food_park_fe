import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/img/stisla-fill.svg';
import { IFormData, IFormErrors } from '@/utils/types/register';
import { handleRegisterSubmit } from '@/services/Auth/registerService';
import { NavLink } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState<IFormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof IFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    handleRegisterSubmit(
      formData,
      setErrors,
      setLoading,
      setErrorMessage,
      navigate
    );
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2'>
          <div className='login-brand'>
            <img
              src={logo}
              alt='logo'
              width='100'
              className='shadow-light rounded-circle'
            />
          </div>

          <div className='card card-primary'>
            <div className='card-header'>
              <h4>Register</h4>
            </div>

            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='form-group col-12'>
                    <label htmlFor='name'>Customer Name</label>
                    <input
                      id='name'
                      type='text'
                      className={`form-control ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className='invalid-feedback'>{errors.name}</div>
                    )}
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    type='email'
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                </div>

                <div className='row'>
                  <div className='form-group col-6'>
                    <label htmlFor='password' className='d-block'>
                      Password
                    </label>
                    <input
                      id='password'
                      type=''
                      className={`form-control ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className='invalid-feedback'>{errors.password}</div>
                    )}
                  </div>
                  <div className='form-group col-6'>
                    <label htmlFor='password_confirmation' className='d-block'>
                      Password Confirmation
                    </label>
                    <input
                      id='password_confirmation'
                      type=''
                      className={`form-control ${
                        errors.password_confirmation ? 'is-invalid' : ''
                      }`}
                      name='password_confirmation'
                      value={formData.password_confirmation}
                      onChange={handleChange}
                    />
                    {errors.password_confirmation && (
                      <div className='invalid-feedback'>
                        {errors.password_confirmation}
                      </div>
                    )}
                  </div>
                </div>

                {errors.general && (
                  <div className='alert alert-danger'>{errors.general}</div>
                )}

                <div className='form-group'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-lg btn-block'
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </div>

                <div className='col-12 text-center'>
                  <NavLink className='text-decoration-none' to='/login'>
                    Already an account?
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
