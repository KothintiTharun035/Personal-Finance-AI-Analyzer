import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import registerAnimation from "../assets/animations/FinanceAI-Register-animation.json";

export default function RegisterAnimation() {

  const containerRef = useRef(null);

  useEffect(() => {

    const animation = lottie.loadAnimation({

      container: containerRef.current,

      renderer: "svg",

      loop: true,

      autoplay: true,

      animationData: registerAnimation,

    });

    return () => animation.destroy();

  }, []);

  return (
    <div
      ref={containerRef}
      className="register-lottie"
    />
  );
}