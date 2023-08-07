'use client';
import { useEffect, useState } from "react";

function useScrollError(errors) {
  const [canFocus, setCanFocus] = useState(true);

  const onError = () => {
    setCanFocus(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0 && canFocus) {
      // Sort inputs based on their position on the page. (the order will be based on validaton order otherwise)
      const elements = Object.keys(errors)
        .map((name) => document.getElementsByName(name)[0])
        .filter((el) => !!el);
      elements.sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      );
      if (elements.length > 0) {
        let errorElement = elements[0];
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
        errorElement.focus({ preventScroll: true });
        setCanFocus(false);
      }
    }
  }, [errors, canFocus]);

  return { onError };
}

export default useScrollError;
