import { useEffect } from 'react';

export default function SparkleEffect() {
  useEffect(() => {
    const createSparkle = (x, y, isBurst = false) => {
      const sparkle = document.createElement("div");
      sparkle.className = "interactive-sparkle";
      
      // Extra vibrant colors (bright gold, neon purple, cyan, intense red, pure white)
      const colors = ["#ffea00", "#bd00ff", "#00e5ff", "#ff0040", "#ffffff", "#ff8800"];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.backgroundColor = chosenColor;
      sparkle.style.color = chosenColor; 
      
      // Massive spread for bursts, moderate for trail
      const spread = isBurst ? 100 : 40;
      const offsetX = (Math.random() - 0.5) * spread;
      const offsetY = (Math.random() - 0.5) * spread;
      
      sparkle.style.left = `${x + offsetX}px`;
      sparkle.style.top = `${y + offsetY}px`;
      
      // Bigger size variation
      const size = Math.random() * 12 + 4; // 4px to 16px
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      
      // Dynamic rotation
      sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        if (document.body.contains(sparkle)) {
          sparkle.remove();
        }
      }, 1500); // Longer lifetime
    };

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      const dist = Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
      if (dist > 5) { // Very high frequency trail
        createSparkle(e.clientX, e.clientY, false);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleClickOrTouch = (e) => {
      let x, y;
      if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      
      // Huge burst of 40 sparkles
      for (let i = 0; i < 40; i++) {
        setTimeout(() => createSparkle(x, y, true), i * 15);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClickOrTouch);
    window.addEventListener("touchstart", handleClickOrTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClickOrTouch);
      window.removeEventListener("touchstart", handleClickOrTouch);
    };
  }, []);

  return null;
}
