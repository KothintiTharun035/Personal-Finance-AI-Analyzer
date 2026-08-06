import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import securityAnimation from "../assets/animations/FinanceAI-Login-animation.json";

export default function LoginAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: securityAnimation,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "500px",
      }}
    />
  );
}