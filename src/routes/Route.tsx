/* eslint-disable prettier/prettier */
import React from 'react';
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDOMRoute,
  Redirect,

} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            // eslint-disable-next-line react/jsx-indent
            <Redirect to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
            />
          );
      }}
    />
  );
};

export default Route;
