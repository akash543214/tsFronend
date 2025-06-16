
import { LoginModal } from "./LoginModal";
import ProfileDropdown from "./ProfileDropdown";
import { useCallback } from 'react';
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../BackendApi/apiService';
import { logout } from '../../store/authSlice';
//import { Link, useNavigate } from 'react-router-dom';

type NavItem = {
  label: string;
  href: string;
  protected?: boolean; // Only show if logged in
  guestOnly?: boolean; // Only show if NOT logged in
};

const navItems: NavItem[] = [
  { label: "", href: "/dashboard", protected: true },
  { label: "", href: "/login", guestOnly: true },
];

export default function Header() {


    const dispatch = useDispatch();
  //  const navigate = useNavigate();
  
    const authStatus = useSelector((state: RootState) => state.auth.status);
  
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

  const filteredNavItems = navItems.filter((item) => {
    if (item.protected && !authStatus) return false;
    if (item.guestOnly && authStatus) return false;
    return true;
  });

  return (
    <header className="flex items-center justify-between px-6 py-2 border-b bg-background shadow-sm sticky top-0 z-50 ">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight">ProjectFLow</div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6">
        {filteredNavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-medium hover:underline"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right side controls */}
      <div className="flex items-center gap-4">

        {authStatus ? (
        <ProfileDropdown handleLogout={handleLogout}/>
        ) : (
            <div>
         <LoginModal />
         
          </div>
        )}
      </div>
    </header>
  );
}
