import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Movies/Preloader/Preloader';

function ProtectedRoute ({ component: Component, ...props }) {
  const navigate = useNavigate()
  return props.isLoading ? <Preloader /> : props.isLogged ? <Component {...props} /> : navigate("/")
};

export default ProtectedRoute;
