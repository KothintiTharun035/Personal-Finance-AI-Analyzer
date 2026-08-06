import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import heroAnimation from "../../assets/animations/hero.json";

export default function HeroAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: heroAnimation,
    });

    return () => animation.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: "550px",
        height: "500px",
      }}
    />
  );
}