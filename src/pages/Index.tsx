import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";
import CategoryChips from "@/components/CategoryChips";
import VideoGrid from "@/components/VideoGrid";
import { videos } from "@/data/videos";

const Index = () => {
  const [category, setCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filtered = useMemo(() => {
    let result = videos;
    if (category !== "All") {
      result = result.filter((v) => v.category === category);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 min-w-0">
          <CategoryChips active={category} onChange={setCategory} />
          <VideoGrid videos={filtered} />
        </main>
      </div>
    </div>
  );
};

export default Index;
