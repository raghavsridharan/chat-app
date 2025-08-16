import { Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Settings from "./pages/Settings.jsx"
import Profile from './pages/Profile.jsx';
import {useAuthStore} from "./store/useAuthStore";
import {Loader} from "lucide-react";
import { useEffect } from 'react';
 

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    <div className = "flex items-center justify-center h-screen">
      <Loader className = "size-10 animate-spin"/>
    </div>
  } 
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to ="/login/"/>} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/login" element={!authUser ? <Login /> : <Navigate to = "/"/>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;

