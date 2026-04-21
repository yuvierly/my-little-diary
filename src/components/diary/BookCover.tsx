import { Bow } from "./Bow";
import { cn } from "@/lib/utils";

export type CoverTheme = "pink" | "lavender" | "vintage";

interface BookCoverProps {
  theme: CoverTheme;
  selected?: boolean;
  onClick?: () => void;
  small?: boolean;
}

const themeStyles: Record<CoverTheme, { bg: string; bow: string; title: string; sub: string; spine: string }> = {
  pink: {
    bg: "linear-gradient(135deg, hsl(var(--cover-pink-1)) 0%, hsl(var(--cover-pink-2)) 100%)",
    bow: "hsl(345 80% 88%)",
    title: "hsl(340 60% 25%)",
    sub: "hsl(340 50% 35%)",
    spine: "hsl(340 50% 38%)",
  },
  lavender: {
    bg: "linear-gradient(135deg, hsl(var(--cover-lav-1)) 0%, hsl(var(--cover-lav-2)) 100%)",
    bow: "hsl(280 50% 90%)",
    title: "hsl(270 45% 25%)",
    sub: "hsl(270 35% 35%)",
    spine: "hsl(270 40% 35%)",
  },
  vintage: {
    bg: "linear-gradient(135deg, hsl(var(--cover-vintage-1)) 0%, hsl(var(--cover-vintage-2)) 100%)",
    bow: "hsl(25 50% 88%)",
    title: "hsl(25 50% 22%)",
    sub: "hsl(25 35% 32%)",
    spine: "hsl(25 40% 28%)",
  },
};

export const BookCover = ({ theme, selected, onClick, small }: BookCoverProps) => {
  const s = themeStyles[theme];
  const sizeClasses = small ? "w-44 h-60 md:w-48 md:h-64" : "w-full h-full";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-r-2xl rounded-l-md overflow-hidden transition-all duration-300 group book-shadow",
        sizeClasses,
        small && "hover:-translate-y-2 hover:rotate-1",
        selected && small && "ring-4 ring-offset-4 ring-offset-transparent ring-bow scale-105 -translate-y-2",
      )}
      style={{ background: s.bg }}
      aria-label={`${theme} diary cover`}
    >
      <div className="absolute left-0 top-0 bottom-0 w-3" style={{ background: `linear-gradient(90deg, ${s.spine}, transparent)` }} />
      <div className="absolute inset-3 rounded-md border-2" style={{ borderColor: s.title, opacity: 0.35 }} />
      <div className="absolute inset-5 rounded-sm border" style={{ borderColor: s.title, opacity: 0.25 }} />

      <div className="absolute top-4 right-4 animate-float-bow">
        <Bow color={s.bow} size={small ? 50 : 80} />
      </div>
      <div className="absolute bottom-6 left-6 opacity-70">
        <Bow color={s.bow} size={small ? 32 : 50} />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="serif-cover italic tracking-widest text-xs md:text-sm uppercase mb-2" style={{ color: s.sub }}>~ My ~</p>
        <h2 className={cn("serif-cover font-semibold leading-tight", small ? "text-2xl" : "text-5xl md:text-6xl")} style={{ color: s.title }}>Diary</h2>
        <div className="my-3 w-12 h-px" style={{ background: s.title, opacity: 0.4 }} />
        <p className={cn("font-caveat", small ? "text-base" : "text-2xl")} style={{ color: s.sub }}>
          {theme === "pink" && "Pink Bow"}
          {theme === "lavender" && "Lavender Dreams"}
          {theme === "vintage" && "Vintage Charm"}
        </p>
      </div>

      <div
        className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, hsl(0 0% 100% / 0.4), transparent 50%), radial-gradient(circle at 80% 90%, hsl(0 0% 0% / 0.3), transparent 50%)",
        }}
      />
    </button>
  );
};
