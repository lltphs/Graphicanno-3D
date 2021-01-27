import { lazy } from 'react';

export default {
  path: '/home',
  exact: false,
  publicPage: true,
  component: lazy(() => import('.')),
};
