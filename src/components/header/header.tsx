import {JSX, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {AuthorizationStatus, ReduxStateStatus, RoutePathname} from 'src/constants';
import {fetchLogout} from 'src/store/authorization/api';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {AuthorizationSelector} from 'src/store/authorization/selectors';


type Props = {
  breadcrumbs?: JSX.Element
}

export function Header(props: Props) {
  const {breadcrumbs} = props;
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(AuthorizationSelector.status);
  const isAuthorized = authorizationStatus === AuthorizationStatus.authorized;
  const handleLogout = useCallback(() => {
    dispatch(fetchLogout()).then((res) => {
      if (res.meta.requestStatus === ReduxStateStatus.rejected) {
        enqueueSnackbar(
          'Не удалось выйти',
          {variant: 'error'}
        );
      } else {
        navigate(RoutePathname.main);
      }
    });
  }, [navigate, dispatch, enqueueSnackbar]);
  const handleLogin = useCallback(() => {
    navigate(`/${RoutePathname.login}`);
  }, [navigate]);
  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to={RoutePathname.main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {breadcrumbs}
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          {isAuthorized && (
            <div className="user-block__link" onClick={handleLogout}>
              Sign out
            </div>
          )}
          {!isAuthorized && (
            <div className="user-block__link" onClick={handleLogin}>
              Sing in
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}
