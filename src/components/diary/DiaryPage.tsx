import { Bow } from "./Bow";
import { DiaryEntry, getFontFamily } from "./EntryModal";
import { cn } from "@/lib/utils";

interface DiaryPageProps {
  side: "left" | "right";
  entry?: DiaryEntry;
  pageNumber?: number;
  isCoverInside?: boolean;
}

export const DiaryPage = ({ side, entry, pageNumber, isCoverInside }: DiaryPageProps) => {
  if (isCoverInside) {
    return (
      <div className={cn("relative h-full w-full paper-lined paper-texture overflow-hidden", side === "left" ? "rounded-l-md" : "rounded-r-md")}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
          <Bow size={70} />
          <h3 className="font-serifCover italic text-4xl text-primary mt-4">This Diary Belongs To</h3>
          <div className="my-5 w-24 h-px bg-primary/40" />
          <p className="font-homemade text-2xl text-foreground/80">A dreamer 💕</p>
          <p className="font-caveat text-xl text-muted-foreground mt-8 max-w-xs">
            Every page here is a tiny piece of my heart. Flip gently.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative h-full w-full paper-lined paper-texture overflow-hidden",
      side === "left" ? "rounded-l-md" : "rounded-r-md",
    )}>
      <div className={cn(
        "absolute top-0 bottom-0 w-6 pointer-events-none",
        side === "left" ? "right-0 bg-gradient-to-l from-black/15 to-transparent" : "left-0 bg-gradient-to-r from-black/15 to-transparent",
      )} />

      <div className={cn("absolute top-3 opacity-60", side === "left" ? "left-3" : "right-3")}>
        <Bow size={36} />
      </div>

      {pageNumber !== undefined && (
        <div className={cn("absolute bottom-3 font-patrick text-sm text-muted-foreground", side === "left" ? "left-6" : "right-6")}>
          — {pageNumber} —
        </div>
      )}

      {entry ? (
        <div className="relative h-full w-full px-16 pt-12 pb-12 flex flex-col">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-3xl leading-tight" style={{ fontFamily: getFontFamily(entry.font), color: entry.color }}>
              {entry.title}
            </h3>
            <span className="text-3xl">{entry.mood}</span>
          </div>
          <p className="font-patrick text-sm text-muted-foreground italic mb-4">
            {new Date(entry.date).toLocaleDateString(undefined, {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            })}
          </p>
          <div
            className="flex-1 text-xl leading-8 whitespace-pre-wrap overflow-hidden"
            style={{ fontFamily: getFontFamily(entry.font), color: entry.color }}
          >
            {entry.text}
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-12">
          <p className="font-caveat text-3xl text-muted-foreground/70">
            ✨ A blank page,<br />waiting for your story...
          </p>
        </div>
      )}
    </div>
  );
};
