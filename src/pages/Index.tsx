import { useEffect, useState } from "react";
import { CoverScreen } from "@/components/diary/CoverScreen";
import { DiaryBook } from "@/components/diary/DiaryBook";
import { CoverTheme } from "@/components/diary/BookCover";
import { DiaryEntry } from "@/components/diary/EntryModal";
import { toast } from "sonner";

const STORAGE_ENTRIES = "diary.entries.v1";
const STORAGE_THEME = "diary.theme.v1";

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [theme, setTheme] = useState<CoverTheme>("pink");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_THEME) as CoverTheme | null;
      if (t) setTheme(t);
      const e = localStorage.getItem(STORAGE_ENTRIES);
      if (e) setEntries(JSON.parse(e));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_ENTRIES, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  const handleSave = (entry: DiaryEntry) => {
    setEntries((prev) => {
      const exists = prev.some((p) => p.id === entry.id);
      if (exists) {
        toast.success("Entry updated 💖");
        return prev.map((p) => (p.id === entry.id ? entry : p));
      }
      toast.success("New entry saved 🌸");
      return [...prev, entry];
    });
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((p) => p.id !== id));
    toast("Entry removed", { icon: "🍃" });
  };

  const handleOpen = (t: CoverTheme) => {
    setTheme(t);
    setOpened(true);
  };

  return (
    <main className="min-h-screen w-full">
      <h1 className="sr-only">Bow & Bloom — Aesthetic Digital Diary Book</h1>
      {!opened ? (
        <CoverScreen initialTheme={theme} onOpen={handleOpen} />
      ) : (
        <DiaryBook
          entries={entries}
          onSave={handleSave}
          onDelete={handleDelete}
          theme={theme}
          onChangeCover={() => setOpened(false)}
        />
      )}
    </main>
  );
};

export default Index;
