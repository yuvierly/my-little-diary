import { cn } from "@/lib/utils";

interface BowProps {
  className?: string;
  color?: string;
  size?: number;
}

export const Bow = ({ className, color = "hsl(var(--bow-pink))", size = 60 }: BowProps) => (
  <svg
    className={cn(className)}
    width={size}
    height={size * 0.7}
    viewBox="0 0 100 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M50 35 C30 15, 8 18, 6 32 C4 46, 22 52, 42 42 C46 40, 48 38, 50 35 Z" fill={color} />
    <path d="M50 35 C70 15, 92 18, 94 32 C96 46, 78 52, 58 42 C54 40, 52 38, 50 35 Z" fill={color} />
    <path d="M44 38 C40 50, 38 60, 36 68 C42 64, 46 56, 48 44 Z" fill={color} opacity="0.92" />
    <path d="M56 38 C60 50, 62 60, 64 68 C58 64, 54 56, 52 44 Z" fill={color} opacity="0.92" />
    <ellipse cx="50" cy="35" rx="7" ry="9" fill={color} />
    <ellipse cx="50" cy="35" rx="7" ry="9" fill="hsl(0 0% 0% / 0.12)" />
    <path d="M20 28 C26 26, 32 27, 38 31" stroke="hsl(0 0% 100% / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M62 31 C68 27, 74 26, 80 28" stroke="hsl(0 0% 100% / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
