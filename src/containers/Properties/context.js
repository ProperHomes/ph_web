import { createContext, useContext, useEffect, useReducer } from "react";
import { useQuery } from "@apollo/client";

import { GET_PROPERTIES, GET_PROPERTIES_LOGGED_IN } from "./graphql";
import { useAppContext } from "src/appContext";

const PropertyContext = createContext(null);

const initialState = {
  list: [],
};

const propertyActionTypes = {
  LOAD_PROPERTIES: "LOAD_PROPERTIES",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case propertyActionTypes.LOAD_PROPERTIES:
      return { ...state, list: action.list };
    default:
      return state;
  }
}

function PropertyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { state: appState } = useAppContext();

  const loggedInUserId = appState.user?.id;

  const { data: propertiesNotLoggedIn, refetchPropertiesNotLoggedIn } =
    useQuery(GET_PROPERTIES, {
      variables: { first: 20, offset: 0 },
      skip: loggedInUserId,
    });

  const { data: loggedInProperties, refetch: refetchPropertiesLoggedIn } =
    useQuery(GET_PROPERTIES_LOGGED_IN, {
      variables: {
        first: 20,
        offset: 0,
        userId: loggedInUserId,
      },
      skip: !loggedInUserId,
    });

  const data = loggedInUserId ? loggedInProperties : propertiesNotLoggedIn;
  const properties = data?.properties?.nodes ?? [];

  const refetch = loggedInUserId
    ? refetchPropertiesLoggedIn
    : refetchPropertiesNotLoggedIn;

  useEffect(() => {
    if (properties.length > 0) {
      dispatch({ type: propertyActionTypes.LOAD_PROPERTIES, list: properties });
    }
  }, [properties]);

  return (
    <PropertyContext.Provider
      value={{
        state,
        dispatch,
        refetch,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

function usePropertyContext() {
  return useContext(PropertyContext);
}

export {
  PropertyContext,
  PropertyProvider,
  usePropertyContext,
  propertyActionTypes,
};
