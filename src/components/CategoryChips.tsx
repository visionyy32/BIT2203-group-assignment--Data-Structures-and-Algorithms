import { categories } from "@/data/videos";

interface CategoryChipsProps {
  active: string;
  onChange: (cat: string) => void;
}

const CategoryChips = ({ active, onChange }: CategoryChipsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 px-4 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            active === cat
              ? "bg-yt-chip-active text-yt-chip-active-fg"
              : "bg-yt-chip text-foreground hover:bg-muted"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
