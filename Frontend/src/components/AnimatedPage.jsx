import { useEffect, useState } from "react";

export default function AnimatedPage({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure the DOM is ready before triggering animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-transition ${isVisible ? "page-enter-active" : "page-enter"}`}>
      {children}
    </div>
  );
}
