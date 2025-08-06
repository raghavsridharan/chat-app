import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'; // use correct path
import HomePage from './pages/HomePage.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Settings from "./pages/Settings.jsx"
import Profile from './pages/Profile.jsx';
import {useAuthStore} from "./store/useAuthStore";
 

const App = () => {
  const {authUser} = useAuthStore();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;

