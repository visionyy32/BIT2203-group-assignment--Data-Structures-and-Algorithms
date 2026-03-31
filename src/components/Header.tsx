import { Search, Menu, Bell, Video, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebarState } from "@/context/SidebarContext";
import { useNotifications } from "@/context/NotificationContext";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { toggle } = useSidebarState();
  const { unreadCount, notifications, markAllRead, showPanel, togglePanel } = useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(query.trim())}`);
  };

  // Close notification panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        if (showPanel) togglePanel();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPanel, togglePanel]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-background">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="p-2 rounded-full hover:bg-yt-hover transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="bg-primary rounded-lg p-1.5">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline text-foreground">
            YouTube Clone
          </span>
        </Link>
      </div>

      {/* Center — search */}
      <form onSubmit={handleSearch} className="flex items-center flex-1 max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search data structures..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 px-4 rounded-l-full border border-border bg-yt-surface text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ring"
        />
        <button
          type="submit"
          className="h-10 px-5 rounded-r-full border border-l-0 border-border bg-yt-hover hover:bg-accent transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Right */}
      <div className="flex items-center gap-1">
        <Link
          to="/upload"
          className="p-2 rounded-full hover:bg-yt-hover transition-colors hidden sm:flex"
          title="Upload video"
        >
          <Plus className="w-5 h-5" />
        </Link>

        {/* Notifications */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={togglePanel}
            className="p-2 rounded-full hover:bg-yt-hover transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showPanel && (
            <div className="absolute right-0 top-12 w-80 bg-yt-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <h3 className="font-medium text-sm">Notifications</h3>
                <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-3 py-2.5 hover:bg-yt-hover transition-colors cursor-pointer ${
                      !n.read ? "border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <p className="text-sm text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <button className="ml-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-foreground hover:ring-2 hover:ring-primary transition-all">
          C
        </button>
      </div>
    </header>
  );
};

export default Header;
