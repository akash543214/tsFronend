import { useState, useCallback } from 'react';
import { RootState } from "../../store/store";
import Modal from '../Assets/Modal';
import Signin from '../Authentication/Signin';
import Login from '../Authentication/Login';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../BackendApi/apiService';
import { logout } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import NavItemComponent from './NavItemComponent';
//import useClickOutside from '../../CustomHooks/useClickOutside';

type ModalType = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
};

// Memoized NavItem component to prevent unnecessary re-renders

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const authStatus = useSelector((state: RootState) => state.auth.status);
  const user = useSelector((state: RootState) => state.auth.userData);

  // Memoized logout handler to prevent recreating on every render
  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      dispatch(logout());
      //setDropdown(false);
    } catch (err) {
      console.error(err, 'error logging out');
      // Show user feedback for failed logout
      alert('Failed to log out. Please try again.');
    }
  }, [dispatch]);

  // Memoized handlers to prevent recreating on every render
  const handleSignupClick = useCallback(() => setSignupModal(true), []);
  const handleLoginClick = useCallback(() => setLoginModal(true), []);
  
  const handleProfileClick = useCallback(() => {
    //setDropdown(false);
    navigate('/profile');
  }, [navigate]);


  // Close signup modal handler
  const closeSignupModal = useCallback(() => setSignupModal(false), []);
  
  // Close login modal handler
  const closeLoginModal = useCallback(() => setLoginModal(false), []);

  // Create nav items with memoized handlers
  const navItems = [
    {
      name: "Login",
      slug: "#",
      active: !authStatus,
      action: handleLoginClick,
      ariaLabel: "Open login form"
    },
    {
      name: "Sign Up",
      slug: "#",
      active: !authStatus,
      action: handleSignupClick,
      ariaLabel: "Open sign up form"
    },
    {
      name: user?.name || "User",
      slug: "#",
      active: authStatus,
      hasDropdown: true,
      ariaLabel: "User menu",
      subitems: [
        {
          name: "Profile",
          slug: "/profile",
          active: true,
          shortcut: "⌘P",
          action: handleProfileClick
        },
        {
          name: "Logout",
          slug: "#",
          active: true,
          shortcut:"⇧⌘Q",
          action: handleLogout
        }

      ],
    }
    
  ];

  // Close dropdown when clicking outside

  const modals: ModalType[] = [
    {
      id: 'signup',
      isOpen: signupModal,
      onClose: closeSignupModal,
      content: <Signin setSignupModal={setSignupModal} />
    },
    {
      id: 'login',
      isOpen: loginModal,
      onClose: closeLoginModal,
      content: <Login setLoginModal={setLoginModal} />
    }
  ];

  return (
    <>
      {modals.map(modal =>
        modal.isOpen && (
          <Modal key={modal.id} 
           onClick={modal.onClose}>
           {modal.content}
          </Modal>
        )
      )}

      <header className="bg-white shadow" role="banner">
        <div className="mx-auto px-2 py-2 h-50">
          <nav className="flex justify-between items-center" aria-label="Main Navigation">
            <div className="mr-4">
              <Link to="/home" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                <h1 className="text-2xl font-bold text-gray-800">ProjectFlow</h1>
              </Link>
            </div>

            <ul className="flex items-center" role="menubar">
              {navItems.map((item) => 
                item.active && (
                  <NavItemComponent 
                    key={item.name}
                    item={item} 
                  />
                )
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;