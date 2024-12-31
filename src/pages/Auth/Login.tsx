import { NavLink, useNavigate } from 'react-router-dom';
import logo from '@/assets/img/stisla-fill.svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ILoginFormData, ILoginFormErrors } from '@/utils/types/login';
import {
  handleFacebookLogin,
  handleGoogleLogin,
  handleLoginSubmit,
} from '@/services/Auth/loginService';

const Login = () => {
  const naviagte = useNavigate();
  const [errors, setErrors] = useState<ILoginFormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<ILoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof ILoginFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleLoginSubmit(
      formData,
      setErrors,
      setLoading,
      setErrorMessage,
      naviagte
    );
  };

  const googleLogin = async (): Promise<void> => {
    await handleGoogleLogin(setLoading, naviagte);
  };

  const facebookLogin = async (): Promise<void> => {
    await handleFacebookLogin(setLoading, naviagte);
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4'>
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
              <h4>Login</h4>
            </div>

            <div className='card-body'>
              <form onSubmit={handleSubmit} className='needs-validation'>
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

                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    id='password'
                    type='password'
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

                {errorMessage && (
                  <div className='alert alert-danger'>{errorMessage}</div>
                )}

                <div className='form-group'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-lg btn-block'
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
              <div className='text-center mt-4 mb-3'>
                <div className='text-job text-muted'>Login With Social</div>
              </div>
              <div className='row sm-gutters'>
                <div className='col-12 d-flex align-items-center justify-center'>
                  <div className='col-6'>
                    <button
                      onClick={googleLogin}
                      className='btn btn-none w-100 mb-4 border-none'
                      type='button'
                    >
                      <svg
                        width='32px'
                        height='32px'
                        viewBox='0 0 16 16'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                      >
                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                        <g
                          id='SVGRepo_tracerCarrier'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></g>
                        <g id='SVGRepo_iconCarrier'>
                          <path
                            fill='#4285F4'
                            d='M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z'
                          ></path>
                          <path
                            fill='#34A853'
                            d='M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z'
                          ></path>
                          <path
                            fill='#FBBC04'
                            d='M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z'
                          ></path>
                          <path
                            fill='#EA4335'
                            d='M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z'
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className='col-6'>
                    <button
                      onClick={facebookLogin}
                      className='btn btn-none w-100 mb-4 border-none'
                      type='button'
                    >
                      <svg
                        width='32px'
                        height='32px'
                        viewBox='0 0 16 16'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                      >
                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                        <g
                          id='SVGRepo_tracerCarrier'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></g>
                        <g id='SVGRepo_iconCarrier'>
                          <path
                            fill='#1877F2'
                            d='M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z'
                          ></path>
                          <path
                            fill='#ffffff'
                            d='M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z'
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-5 text-muted text-center'>
            <NavLink className='text-decoration-none' to='/register'>
              Don't have an account?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
