import { createContext, useContext, useEffect, useReducer } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROPERTIES, UPDATE_PROPERTY } from "./graphql";

const PropertyContext = createContext(null);

const initialState = {
  list: [],
};

const propertyActionTypes = {
  LOAD_PROPERTIES: "LOAD_PROPERTIES",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case propertyActionTypes.LOAD_PROPERTIES:
      return { ...state, list: action.list };
    default:
      return state;
  }
}

function PropertyProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { data, loading } = useQuery(GET_PROPERTIES, {
    variables: { first: 10, offset: 0 },
  });

  const [updateProperty] = useMutation(UPDATE_PROPERTY);

  const properties = data?.properties?.nodes ?? [];

  const handleSaveProperty = (id) => {};

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
        handleSaveProperty,
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
