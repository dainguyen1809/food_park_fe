import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Test from '@/pages/Home/Test';
const LazyLoading = React.lazy(() => import('@/components/animations/loading'));
const LazyLogin = React.lazy(() => import('@/pages/Auth/Login'));
const LazyRegister = React.lazy(() => import('@/pages/Auth/Register'));

export default function Index() {
  return (
    <Routes>
      <Route path='/test' element={<Test />} />
      <Route
        path='/login'
        element={
          <React.Suspense fallback={<LazyLoading />}>
            <LazyLogin />
          </React.Suspense>
        }
      />
      <Route
        path='/register'
        element={
          <React.Suspense fallback={<LazyLoading />}>
            <LazyRegister />
          </React.Suspense>
        }
      />
      <Route path='*' element={'Page not found'} />
    </Routes>
  );
}
