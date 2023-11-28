"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { appActionTypes, useAppContext } from "src/appContext";

const AuthModal = dynamic(() => import("../app/auth/index"), { ssr: false });

function useToggleAuth() {
  const { state, dispatch } = useAppContext();
  const isLoggedIn = !!state.user;
  const [openAuth, setOpenAuth] = useState(false);
  const toggleAuth = () => {
    setOpenAuth((prev) => !prev);
  };

  const logout = async () => {
    try {
      dispatch({ type: appActionTypes.UPDATE_LOGGED_IN_USER, user: null });
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        withCredentials: true,
      });
    } catch (err) {
      console.log("error logging out", err);
    }
  };

  return {
    Auth: openAuth ? (
      <AuthModal open={openAuth} handleClose={toggleAuth} />
    ) : null,
    toggleAuth,
    isLoggedIn,
    logout,
    loggedInUser: state.user,
  };
}

export default useToggleAuth;
