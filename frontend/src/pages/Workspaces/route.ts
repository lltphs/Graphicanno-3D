import { lazy } from 'react';

export default {
  path: '/workspaces',
  exact: false,
  publicPage: false,
  component: lazy(() => import('.')),
};
