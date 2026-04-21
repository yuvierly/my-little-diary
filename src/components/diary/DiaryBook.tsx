import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, BookOpen, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiaryPage } from "./DiaryPage";
import { DiaryEntry, EntryModal } from "./EntryModal";
import { CoverTheme } from "./BookCover";
import { Bow } from "./Bow";
import { cn } from "@/lib/utils";

interface DiaryBookProps {
  entries: DiaryEntry[];
  onSave: (e: DiaryEntry) => void;
  onDelete: (id: string) => void;
  theme: CoverTheme;
  onChangeCover: () => void;
}

export const DiaryBook = ({ entries, onSave, onDelete, theme, onChangeCover }: DiaryBookProps) => {
  const [spread, setSpread] = useState(0);
  const [flipDir, setFlipDir] = useState<"next" | "prev" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DiaryEntry | null>(null);

  const pages: (DiaryEntry | null)[] = [null, ...entries];
  if (pages.length % 2 !== 0) pages.push(null);
  const totalSpreads = Math.max(1, pages.length / 2);

  const leftIdx = spread * 2;
  const rightIdx = leftIdx + 1;
  const leftPage = pages[leftIdx];
  const rightPage = pages[rightIdx];

  const flip = (dir: "next" | "prev") => {
    if (flipDir) return;
    if (dir === "next" && spread >= totalSpreads - 1) return;
    if (dir === "prev" && spread <= 0) return;
    setFlipDir(dir);
    setTimeout(() => {
      setSpread((s) => s + (dir === "next" ? 1 : -1));
      setFlipDir(null);
    }, 850);
  };

  const handleEdit = (entry: DiaryEntry) => {
    setEditing(entry);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const spineColor =
    theme === "pink" ? "hsl(var(--cover-pink-2))"
    : theme === "lavender" ? "hsl(var(--cover-lav-2))"
    : "hsl(var(--cover-vintage-2))";

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <div className="w-full max-w-5xl flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onChangeCover} className="font-patrick text-foreground hover:bg-bow/30">
          <BookOpen className="w-4 h-4 mr-2" /> Change cover
        </Button>
        <h1 className="font-serifCover italic text-3xl md:text-4xl text-primary">Bow & Bloom Diary</h1>
        <Button onClick={handleNew} className="font-patrick bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-1" /> New Entry
        </Button>
      </div>

      <div className="relative perspective-book w-full max-w-5xl">
        <div className="relative aspect-[16/10] w-full">
          <div
            className="absolute inset-0 rounded-md book-shadow"
            style={{ background: `linear-gradient(90deg, ${spineColor} 0%, transparent 4%, transparent 96%, ${spineColor} 100%)` }}
          />
          <div
            className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-2 rounded-full z-30 pointer-events-none"
            style={{ background: `linear-gradient(180deg, ${spineColor}, hsl(0 0% 0% / 0.4), ${spineColor})` }}
          />
          <div className="ribbon-bookmark z-30" />

          <div className="absolute inset-2 flex preserve-3d">
            <div className="relative w-1/2 h-full page-shadow">
              <DiaryPage
                side="left"
                entry={leftIdx === 0 ? undefined : (leftPage ?? undefined)}
                isCoverInside={leftIdx === 0}
                pageNumber={leftIdx === 0 ? undefined : leftIdx}
              />
              {leftPage && leftIdx !== 0 && (
                <PageActions onEdit={() => handleEdit(leftPage)} onDelete={() => onDelete(leftPage.id)} side="left" />
              )}
            </div>
            <div className="relative w-1/2 h-full page-shadow">
              <DiaryPage side="right" entry={rightPage ?? undefined} pageNumber={rightPage ? rightIdx : undefined} />
              {rightPage && (
                <PageActions onEdit={() => handleEdit(rightPage)} onDelete={() => onDelete(rightPage.id)} side="right" />
              )}
            </div>

            {flipDir && (
              <div
                className={cn(
                  "absolute top-0 h-full w-1/2 preserve-3d z-20",
                  flipDir === "next" ? "right-0 origin-left animate-page-flip-next" : "left-0 origin-right animate-page-flip-prev",
                )}
                style={{ transformOrigin: flipDir === "next" ? "left center" : "right center" }}
              >
                <div className="absolute inset-0 backface-hidden">
                  <DiaryPage
                    side={flipDir === "next" ? "right" : "left"}
                    entry={flipDir === "next" ? (rightPage ?? undefined) : (leftPage ?? undefined)}
                    pageNumber={flipDir === "next" ? (rightPage ? rightIdx : undefined) : (leftIdx === 0 ? undefined : leftIdx)}
                    isCoverInside={flipDir === "prev" && leftIdx === 0}
                  />
                </div>
                <div className="absolute inset-0 backface-hidden paper-lined paper-texture" style={{ transform: "rotateY(180deg)" }} />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => flip("prev")}
          disabled={spread === 0 || !!flipDir}
          className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-paper/90 border border-bow/50 hover:bg-bow/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center text-primary shadow-lg z-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => flip("next")}
          disabled={spread >= totalSpreads - 1 || !!flipDir}
          className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-paper/90 border border-bow/50 hover:bg-bow/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center text-primary shadow-lg z-40"
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 font-patrick text-foreground/70">
        <Bow size={28} />
        <span>Spread {spread + 1} of {totalSpreads}</span>
        <Bow size={28} />
      </div>

      <EntryModal open={modalOpen} onOpenChange={setModalOpen} onSave={onSave} editing={editing} />
    </div>
  );
};

const PageActions = ({ onEdit, onDelete, side }: { onEdit: () => void; onDelete: () => void; side: "left" | "right" }) => (
  <div className={cn("absolute top-3 flex gap-1 z-10", side === "left" ? "right-10" : "left-10")}>
    <button onClick={onEdit} className="w-7 h-7 rounded-full bg-paper/80 hover:bg-bow/40 flex items-center justify-center text-primary" aria-label="Edit">
      <Pencil className="w-3.5 h-3.5" />
    </button>
    <button onClick={onDelete} className="w-7 h-7 rounded-full bg-paper/80 hover:bg-destructive/30 flex items-center justify-center text-destructive" aria-label="Delete">
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  </div>
);
