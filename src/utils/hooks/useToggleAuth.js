import { useState } from "react";

import AuthModal from "@/containers/Auth";
import { useAppContext } from "src/appContext";

function useToggleAuth() {
  const { state } = useAppContext();
  const isLoggedIn = !!state.user;
  const [openAuth, setOpenAuth] = useState(false);
  const toggleAuth = () => {
    setOpenAuth((prev) => !prev);
  };

  return {
    Auth: <AuthModal open={openAuth} handleClose={toggleAuth} />,
    toggleAuth,
    isLoggedIn,
    loggedInUser: state.user,
  };
}

export default useToggleAuth;
