import { useState } from "react";
import axios from "axios";
import AuthModal from "@/containers/Auth";
import { appActionTypes, useAppContext } from "src/appContext";

function useToggleAuth() {
  const { state, dispatch } = useAppContext();
  const isLoggedIn = !!state.user;
  const [openAuth, setOpenAuth] = useState(false);
  const toggleAuth = () => {
    setOpenAuth((prev) => !prev);
  };

  const logout = async () => {
    try {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        withCredentials: true,
      });
      dispatch({ type: appActionTypes.UPDATE_LOGGED_IN_USER, user: null });
    } catch (err) {}
  };

  return {
    Auth: <AuthModal open={openAuth} handleClose={toggleAuth} />,
    toggleAuth,
    isLoggedIn,
    logout,
    loggedInUser: state.user,
  };
}

export default useToggleAuth;
