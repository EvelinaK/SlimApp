import { lazy } from 'react';

const routes = [
  {
    label: '',
    path: '/',
    exact: true,
    component: lazy(() => import('./pages/HomePage')),
    privated: false,
    restricted: true,
  },
  {
    label: 'Register',
    path: '/register',
    exact: true,
    component: lazy(() => import('./pages/RegistrationPage')),
    privated: false,
    restricted: true,
  },
  {
    label: 'Login',
    path: '/login',
    exact: true,
    component: lazy(() => import('./pages/LoginPage')),
    privated: false,
    restricted: true,
  },
  {
    label: 'Diary',
    path: '/diary',
    exact: true,
    component: lazy(() => import('./pages/DiaryPage')),
    privated: true,
    restricted: false,
  },
  {
    label: 'Calculator',
    path: '/calculator',
    exact: true,
    component: lazy(() => import('./pages/CalculatorPage')),
    privated: true,
    restricted: false,
  },
];

export default routes;
