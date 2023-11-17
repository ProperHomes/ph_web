"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

import { UPDATE_USER, FETCH_USER_PROFILE } from "@/graphql/user";

import { USER_TYPE, PRIVATE_ROUTES } from "./utils/constants";

const AppContext = createContext(null);

const initialState = {
  user: null,
  isLoading: false,
  isDarkModeActive: false,
};

const appActionTypes = {
  TOGGLE_LOADING: "toggle_loading",
  UPDATE_LOGGED_IN_USER: "UPDATE_LOGGED_IN_USER",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
  UPDATE_LOCALE: "UPDATE_LOCALE",
  RESET: "RESET",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.UPDATE_LOGGED_IN_USER:
      return { ...state, user: action.user };
    case appActionTypes.TOGGLE_DARK_MODE:
      return { ...state, isDarkModeActive: action.isActive };
    case appActionTypes.TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading ?? !state.isLoading };
    case appActionTypes.UPDATE_LOCALE:
      return { ...state, locale: action.locale };
    case appActionTypes.RESET:
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user } = state;
  const isBuyer = user?.type === USER_TYPE.BUYER;
  const isSeller = user?.type === USER_TYPE.SELLER;
  const isBuyerAndSeller = user?.type === USER_TYPE.BOTH;
  const isPrivateRoute = PRIVATE_ROUTES.includes(pathname);

  const [updateUser] = useMutation(UPDATE_USER);
  const [fetchUserFullProfile] = useLazyQuery(FETCH_USER_PROFILE);

  const handleFetchUser = async (userId) => {
    try {
      const profileRes = await fetchUserFullProfile({
        variables: { id: userId },
        skip: !userId,
        fetchPolicy: "network-only",
      });
      const loggedInUser = profileRes?.data?.user;
      if (loggedInUser?.id) {
        dispatch({
          type: appActionTypes.UPDATE_LOGGED_IN_USER,
          user: { ...(state.user ?? {}), ...loggedInUser },
        });
      }
      return loggedInUser;
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = async (id, data) => {
    try {
      const res = await updateUser({
        variables: { input: { id, patch: { ...data, isOnboarded: true } } },
      });
      const updatedUser = res?.data?.updateUser?.user;
      if (updatedUser) {
        dispatch({
          type: appActionTypes.UPDATE_LOGGED_IN_USER,
          user: {
            ...(state.user ?? {}),
            ...updatedUser,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    try {
      dispatch({ type: appActionTypes.RESET });
      router.push("/login");
      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        headers: {
          withCredentials: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          withCredentials: true,
        });
        const { user } = res?.data ?? {};
        const userId = user?.id;
        if (userId) {
          handleFetchUser(userId);
        }
      } catch (err) {
        dispatch({
          type: appActionTypes.UPDATE_LOGGED_IN_USER,
          user: null,
        });
      }
    }
    fetchLoggedInUser();
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        isBuyer,
        isSeller,
        isBuyerAndSeller,
        isPrivateRoute,
        handleLogout,
        handleFetchUser,
        handleUpdateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useAppContext, appActionTypes };
