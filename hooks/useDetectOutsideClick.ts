import { useState, useEffect, RefObject } from "react";

export const useDetectOutsideClick = ({
  el,
  initialState,
}: {
  el: RefObject<HTMLElement>;
  initialState: boolean;
}): [boolean, Function] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // If the active element exists and is clicked outside of
      // if (el.current !== null && !el.current.contains(event.target as Node)) {
      if (el.current === null) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
