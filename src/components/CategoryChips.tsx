import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const allCategories = [
  "All",
  "Arrays",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Trees",
  "Hash Tables",
  "Music",
  "Mixes",
  "Gaming",
  "Live",
  "Podcasts",
  "Computer Science",
  "Algorithms",
  "Recently uploaded",
  "Watched",
  "New to you",
];

interface CategoryChipsProps {
  active: string;
  onChange: (cat: string) => void;
}

const CategoryChips = ({ active, onChange }: CategoryChipsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="sticky top-14 z-40 bg-background border-b border-border">
      <div className="relative flex items-center">
        {/* Left arrow */}
        {canScrollLeft && (
          <div className="absolute left-0 z-10 flex items-center h-full pl-1 pr-4 bg-gradient-to-r from-background via-background to-transparent">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-full hover:bg-yt-hover transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Chips */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto py-2.5 px-4 no-scrollbar"
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                active === cat
                  ? "bg-yt-chip-active text-yt-chip-active-fg"
                  : "bg-yt-chip text-foreground hover:bg-yt-hover"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right arrow */}
        {canScrollRight && (
          <div className="absolute right-0 z-10 flex items-center h-full pr-1 pl-4 bg-gradient-to-l from-background via-background to-transparent">
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-full hover:bg-yt-hover transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryChips;
