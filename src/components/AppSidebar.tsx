import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Clock,
  ThumbsUp,
  PlaySquare,
  Download,
  ChevronDown,
  ChevronUp,
  Flame,
  Music,
  Gamepad2,
  Trophy,
  Upload,
} from "lucide-react";
import { useSidebarState } from "@/context/SidebarContext";
import { useState } from "react";

const mainItems = [
  { title: "Home", icon: Home, path: "/" },
  { title: "Upload Video", icon: Upload, path: "/upload" },
];

const libraryItems = [
  { title: "History", icon: Clock, path: "/history" },
  { title: "Liked Videos", icon: ThumbsUp, path: "/liked" },
  { title: "Your Videos", icon: PlaySquare, path: "/your-videos" },
  { title: "Downloads", icon: Download, path: "/downloads" },
];

const exploreItems = [
  { title: "Trending", icon: Flame, path: "/trending" },
  { title: "Music", icon: Music, path: "/music" },
  { title: "Gaming", icon: Gamepad2, path: "/gaming" },
  { title: "Sports", icon: Trophy, path: "/sports" },
];

const AppSidebar = () => {
  const { open } = useSidebarState();
  const location = useLocation();
  const [showExplore, setShowExplore] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ item }: { item: { title: string; icon: React.ElementType; path: string } }) => (
    <Link
      to={item.path}
      className={`flex items-center gap-5 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive(item.path)
          ? "bg-yt-hover font-medium text-foreground"
          : "text-foreground hover:bg-yt-sidebar-hover"
      }`}
    >
      <item.icon className="w-5 h-5 flex-shrink-0" />
      {open && <span className="truncate">{item.title}</span>}
    </Link>
  );

  // Collapsed mini sidebar
  if (!open) {
    return (
      <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-[72px] flex-shrink-0 flex flex-col items-center pt-2 gap-4 overflow-hidden">
        {mainItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] transition-colors ${
              isActive(item.path) ? "bg-yt-hover font-medium" : "hover:bg-yt-sidebar-hover"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
      </aside>
    );
  }

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-[220px] flex-shrink-0 overflow-y-auto pb-4 pr-2">
      {/* Main */}
      <div className="flex flex-col gap-0.5 px-2 pt-2">
        {mainItems.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </div>

      <hr className="my-3 border-border mx-3" />

      {/* You */}
      <div className="px-2">
        <p className="px-3 text-base font-medium mb-1 text-foreground">You</p>
        <div className="flex flex-col gap-0.5">
          {libraryItems.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </div>
      </div>

      <hr className="my-3 border-border mx-3" />

      {/* Explore */}
      <div className="px-2">
        <button
          onClick={() => setShowExplore(!showExplore)}
          className="flex items-center justify-between w-full px-3 text-base font-medium mb-1 text-foreground"
        >
          Explore
          {showExplore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showExplore && (
          <div className="flex flex-col gap-0.5">
            {exploreItems.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
