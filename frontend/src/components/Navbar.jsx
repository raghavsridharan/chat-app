import { Link } from 'react-router-dom';
import {useAuthStore} from '../store/useAuthStore';

const Navbar = () => {

  const {authUser} = useAuthStore();

  return <div>Navbar</div>;
};

export default Navbar;
