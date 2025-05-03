import { useMemo } from "react";
import { NavItem } from "../types/common";

type Params = {
  authStatus: boolean;
  user: { name?: string } | null;
  setModalType: (type: "login" | "signup" | "") => void;
  handleProfileClick: () => void;
  handleLogout: () => void;
  handleDropdownToggle: (key: string) => void;
};

const useNavItems = ({
  authStatus,
  user,
  setModalType,
  handleProfileClick,
  handleLogout,
  handleDropdownToggle
}: Params): NavItem[] => {
    
  return useMemo(() => [
    {
      name: "Login",
      slug: "login",
      active: !authStatus,
      action: () => setModalType("login"),
      ariaLabel: "Open login form"
    },
    {
      name: "Sign Up",
      slug: "signup",
      active: !authStatus,
      action: () => setModalType("signup"),
      ariaLabel: "Open sign up form"
    },
    {
      name: user?.name || "User",
      slug: "user",
      active: authStatus,
      hasDropdown: true,
      ariaLabel: "User menu",
      subitems: [
        {
          name: "Profile",
          slug: "/profile",
          active: true,
          action: handleProfileClick
        },
        {
          name: "Logout",
          slug: "logout",
          active: true,
          action: handleLogout
        }
      ],
      action: () => handleDropdownToggle("user")
    }
  ], [authStatus, user, setModalType, handleProfileClick, handleLogout, handleDropdownToggle]);
};

export default useNavItems;
