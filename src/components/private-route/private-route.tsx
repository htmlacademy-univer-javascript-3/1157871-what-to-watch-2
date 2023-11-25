import {JSX} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthorizationStatus, RoutePathname} from 'src/constants';
import {useAppSelector} from 'src/store/hooks';
import {AuthorizationSelector} from 'src/store/authorization/selectors';


type Props = {
  children: JSX.Element,
  navigateTo?: string
};

export function PrivateRoute(props: Props): JSX.Element {
  const {children, navigateTo = RoutePathname.main} = props;
  const authorizationStatus = useAppSelector(AuthorizationSelector.status);
  return authorizationStatus === AuthorizationStatus.notAuthorized
    ? <Navigate to={navigateTo} />
    : children;
}
