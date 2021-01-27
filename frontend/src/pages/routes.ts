import { ComponentType, LazyExoticComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface RouteType {
  path: string;
  exact: boolean;
  publicPage: boolean;
  component: LazyExoticComponent<
    ComponentType | ComponentType<RouteComponentProps> | ComponentType
  >;
}

const routes: Array<RouteType> = [];

const context = require.context('.', true, /route.ts$/);

context.keys().forEach((path: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  routes.push(context(path).default);
});

export default routes;
