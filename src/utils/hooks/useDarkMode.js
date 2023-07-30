import { useEffect } from "react";

import { useAppContext } from "../../appContext";
import useLocalStorage from "./useLocalStorage";

function useDarkMode() {
  const {
    state: { isDarkModeActive },
    dispatch,
  } = useAppContext();
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [active, setDarkModeActive] = useLocalStorage(
    "properhomes-dark-mode-active"
  );

  const isActive = active; //?? prefersDarkMode;

  const toggleDarkMode = () => {
    setDarkModeActive((prev) => !prev);
    dispatch({ type: "TOGGLE_DARK_MODE", isActive });
  };

  useEffect(() => {
    dispatch({ type: "TOGGLE_DARK_MODE", isActive });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return { isDarkModeActive, toggleDarkMode };
}

export default useDarkMode;
