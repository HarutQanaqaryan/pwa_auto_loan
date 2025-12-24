import { useEffect, useRef, useState } from "react";

export const useTooltip = <T extends HTMLElement, U extends HTMLElement>() => {
  const [showTooltip, setShowTooltip] = useState(false);

  const ref = useRef<T | null>(null);
  const tooltipRef = useRef<U | null>(null);

  const handleShowTooltip = () => {
    setShowTooltip(true);
  };

  const handleHideTooltip = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (tooltipRef.current) {
        tooltipRef.current.style.visibility = "visible";
      }
    }, 120);
  }, [showTooltip]);

  return { ref, tooltipRef, showTooltip, onShowTooltip: handleShowTooltip, onHideTooltip: handleHideTooltip };
};
