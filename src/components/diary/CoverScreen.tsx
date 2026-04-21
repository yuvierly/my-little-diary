import { useState } from "react";
import { BookCover, CoverTheme } from "./BookCover";
import { Bow } from "./Bow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CoverScreenProps {
  initialTheme?: CoverTheme;
  onOpen: (theme: CoverTheme) => void;
}

export const CoverScreen = ({ initialTheme = "pink", onOpen }: CoverScreenProps) => {
  const [selected, setSelected] = useState<CoverTheme>(initialTheme);
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => onOpen(selected), 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute top-10 left-10 animate-float-bow opacity-60"><Bow size={70} /></div>
      <div className="absolute bottom-20 right-16 animate-float-bow opacity-60" style={{ animationDelay: "1.5s" }}><Bow size={90} /></div>
      <div className="absolute top-1/3 right-10 animate-float-bow opacity-50" style={{ animationDelay: "3s" }}><Bow size={50} /></div>

      {!opening && (
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-serifCover italic text-5xl md:text-7xl text-primary drop-shadow-sm">Bow & Bloom</h1>
          <p className="font-caveat text-2xl md:text-3xl text-foreground/80 mt-2">Your cozy little diary, just a bow away ✨</p>
        </div>
      )}

      <div className="relative perspective-book mb-8">
        <div
          className={cn("relative w-72 h-96 md:w-80 md:h-[28rem] preserve-3d transition-transform", opening && "animate-book-open")}
          style={{ transformOrigin: "left center" }}
        >
          <div className="absolute inset-0 backface-hidden">
            <BookCover theme={selected} />
          </div>
        </div>
        {opening && (
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-72 h-96 md:w-80 md:h-[28rem] paper-lined paper-texture rounded-md book-shadow" />
          </div>
        )}
      </div>

      {!opening && (
        <>
          <div className="flex flex-wrap items-end justify-center gap-6 md:gap-8 mb-8 animate-fade-in">
            {(["pink", "lavender", "vintage"] as CoverTheme[]).map((t) => (
              <BookCover key={t} theme={t} small selected={selected === t} onClick={() => setSelected(t)} />
            ))}
          </div>

          <Button
            onClick={handleOpen}
            size="lg"
            className="font-serifCover italic text-xl px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            ✿ Open My Book ✿
          </Button>
          <p className="font-caveat text-lg text-foreground/60 mt-4">Pick a cover above, then open your diary</p>
        </>
      )}
    </div>
  );
};
