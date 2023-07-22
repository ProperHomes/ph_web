import { useState, useEffect } from "react";

function useKeyDown(targetKey, keyPressCallback) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }
  }, []);

  useEffect(() => {
    if (keyPressed && keyPressCallback) {
      keyPressCallback();
    }
  }, [keyPressed]);

  return keyPressed;
}

export default useKeyDown;
