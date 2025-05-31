import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyUserlogin } from '../BackendApi/apiService';
import { login } from "../store/authSlice.ts";
import LoadingCircle from './Assets/LoadingCircle.tsx';
import Header from './Header/Header.tsx';
import './global.css';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const verifyLogin = async () => {
    try {
      const res = await verifyUserlogin();
      if (res?.session === true) {
        dispatch(login(res.userdata));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  if (loading) {
    return (
      <LoadingCircle />
    );
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
