import { useRef, MouseEvent, ReactNode, useState } from "react";

interface CursorGradientTextProps {
  children: ReactNode;
  className?: string;
}

export const CursorGradientText = ({ children, className = "" }: CursorGradientTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${x}%`);
    ref.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${isHovered ? 'rainbow-cursor-text' : 'text-foreground'} transition-colors duration-300 ${className}`}
    >
      {children}
    </span>
  );
};
