import { useState } from 'react';
import Modal from './Assets/Modal';
import Signin from './Signin';
import Login from './Login';
import Button from './Assets/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../BackendApi/apiService';
import { logout } from '../store/authSlice';
import { Link } from 'react-router-dom';
import DownArrow from './Assets/DownSvg';

const Header = () => {
  const dispatch = useDispatch();
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authStatus = useSelector(state => state.auth.status);
  const user = useSelector(state => state.auth.userData);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      setDropdownOpen(false);
    } catch (err) {
      console.error(err, 'error logging out');
    }
  };

  return (
    <>
      {signupModal && (
        <Modal onClick={() => setSignupModal(false)}>
          <Signin setSignupModal={setSignupModal} />
        </Modal>
      )}

      {loginModal && (
        <Modal onClick={() => setLoginModal(false)}>
          <Login setLoginModal={setLoginModal} />
        </Modal>
      )}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Brand Title */}
         <Link to='/home'> <h1 className="text-2xl font-bold text-gray-800">ProjectFlow</h1></Link>
          {/* Action Buttons */}
          <div className="relative">
            {authStatus ? (
              <div className="relative">
                <Button onClick={() => setDropdownOpen(!dropdownOpen)}>{user?.name}

               <DownArrow/>
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                    <Link to='/profile'>  <button onClick={()=>setDropdownOpen(false)} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Profile
                    </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={() => setLoginModal(true)}>Login</Button>
                <Button onClick={() => setSignupModal(true)}>Sign In</Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;