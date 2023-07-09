import { Navigate } from 'react-router-dom';
import Preloader from '../../components/Movies/Preloader/Preloader';

function ProtectedRoute ({ component: Component, ...props }) {
  return props.isLoading ? <Preloader /> : props.isLogged ? <Component {...props} /> : <Navigate to="/" />
};

export default ProtectedRoute;
