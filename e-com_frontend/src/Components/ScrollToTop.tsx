import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // change to 'auto' if you want instant scroll
    });
  }, [pathname]);

  return null; // This component doesn’t render anything
};

export default ScrollToTop;
