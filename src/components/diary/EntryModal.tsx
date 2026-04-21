import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const FONT_OPTIONS = [
  { value: "font-caveat", label: "Caveat" },
  { value: "font-cursive", label: "Dancing Script" },
  { value: "font-sacramento", label: "Sacramento" },
  { value: "font-shadows", label: "Shadows" },
  { value: "font-patrick", label: "Patrick Hand" },
  { value: "font-homemade", label: "Homemade" },
];

export const COLOR_OPTIONS = [
  { value: "hsl(340 55% 35%)", label: "Rose" },
  { value: "hsl(270 45% 38%)", label: "Lavender" },
  { value: "hsl(25 50% 30%)", label: "Vintage" },
  { value: "hsl(200 60% 35%)", label: "Ocean" },
  { value: "hsl(150 40% 30%)", label: "Sage" },
  { value: "hsl(0 0% 18%)", label: "Ink" },
];

export const MOODS = ["🌸", "✨", "☁️", "🌙", "💖", "🍓", "☕", "🌷", "📖", "😊", "🥺", "😴"];

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  mood: string;
  text: string;
  font: string;
  color: string;
}

interface EntryModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSave: (entry: DiaryEntry) => void;
  editing?: DiaryEntry | null;
}

export const EntryModal = ({ open, onOpenChange, onSave, editing }: EntryModalProps) => {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState(MOODS[0]);
  const [text, setText] = useState("");
  const [font, setFont] = useState(FONT_OPTIONS[0].value);
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);

  useEffect(() => {
    if (open) {
      if (editing) {
        setTitle(editing.title);
        setMood(editing.mood);
        setText(editing.text);
        setFont(editing.font);
        setColor(editing.color);
      } else {
        setTitle("");
        setMood(MOODS[0]);
        setText("");
        setFont(FONT_OPTIONS[0].value);
        setColor(COLOR_OPTIONS[0].value);
      }
    }
  }, [open, editing]);

  const handleSave = () => {
    if (!title.trim() && !text.trim()) return;
    const entry: DiaryEntry = {
      id: editing?.id ?? crypto.randomUUID(),
      date: editing?.date ?? new Date().toISOString(),
      title: title.trim() || "Untitled",
      mood,
      text,
      font,
      color,
    };
    onSave(entry);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-paper border-bow/40 paper-texture">
        <DialogHeader>
          <DialogTitle className="font-serifCover text-3xl text-primary italic">
            {editing ? "Edit your entry" : "Dear Diary..."}
          </DialogTitle>
          <DialogDescription className="font-caveat text-lg text-muted-foreground">
            Pour your heart out — pick a font, pick a color, set the mood ✨
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
            <div>
              <Label className="font-patrick text-base">Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A little moment to remember..."
                className="font-caveat text-xl bg-paper/60 border-bow/40"
              />
            </div>
            <div>
              <Label className="font-patrick text-base">Mood</Label>
              <div className="flex flex-wrap gap-1 max-w-[220px]">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={cn(
                      "w-9 h-9 rounded-full text-xl transition-all hover:scale-110",
                      mood === m ? "bg-bow/40 ring-2 ring-bow scale-110" : "hover:bg-bow/20",
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label className="font-patrick text-base">Your words</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Today felt like..."
              rows={7}
              className={cn("text-xl leading-relaxed bg-paper/60 border-bow/40 resize-none")}
              style={{ fontFamily: getFontFamily(font), color }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-patrick text-base mb-2 block">Font</Label>
              <div className="flex flex-wrap gap-2">
                {FONT_OPTIONS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setFont(f.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-full border text-base transition-all",
                      f.value,
                      font === f.value
                        ? "bg-bow/40 border-bow text-primary scale-105"
                        : "bg-paper/40 border-bow/30 hover:bg-bow/20",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="font-patrick text-base mb-2 block">Ink color</Label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={cn(
                      "w-9 h-9 rounded-full border-2 transition-all hover:scale-110",
                      color === c.value ? "ring-2 ring-offset-2 ring-bow scale-110 border-paper" : "border-paper",
                    )}
                    style={{ background: c.value }}
                    aria-label={c.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="font-patrick">Cancel</Button>
          <Button onClick={handleSave} className="font-patrick bg-primary hover:bg-primary/90">Save entry 🌸</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const getFontFamily = (cls: string): string => {
  const map: Record<string, string> = {
    "font-caveat": "'Caveat', cursive",
    "font-cursive": "'Dancing Script', cursive",
    "font-sacramento": "'Sacramento', cursive",
    "font-shadows": "'Shadows Into Light', cursive",
    "font-patrick": "'Patrick Hand', cursive",
    "font-homemade": "'Homemade Apple', cursive",
  };
  return map[cls] ?? "'Caveat', cursive";
};
