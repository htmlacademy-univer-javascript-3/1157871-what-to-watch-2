import {JSX} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthorizationStatus, RoutePathname} from 'src/constants';
import {useAppSelector} from 'src/store';


type Props = {
  children: JSX.Element
};

export function PrivateRoute(props: Props): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return authorizationStatus === AuthorizationStatus.authorized
    ? children
    : <Navigate to={RoutePathname.MAIN} />;
}
