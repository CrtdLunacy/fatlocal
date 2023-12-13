import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line lunacy-plugin/layer-imports

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}
