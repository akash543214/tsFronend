import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyUserlogin } from '../BackendApi/apiService.ts';
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
      console.log(res);
      if (res?.success === true) {
        dispatch(login(res.data));
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
