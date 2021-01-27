import { lazy } from 'react';

export default {
  path: '/change_password',
  exact: true,
  publicPage: false,
  component: lazy(() => import('.')),
};
