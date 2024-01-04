import {Link} from 'react-router-dom';
import {RoutePathname} from 'src/constants';
import './not-found.css';


export function NotFound() {
  return (
    <div className="page">
      <h1>404 Not Found</h1>
      <Link to={RoutePathname.main} className="link">
        Перейти на главную
      </Link>
    </div>
  );
}
