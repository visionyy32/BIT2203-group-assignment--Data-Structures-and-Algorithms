import { Search, Menu, Bell, User, Video } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-background border-b border-border">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-secondary">
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="bg-primary rounded-lg p-1.5">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:inline">
            DSATube
          </span>
        </Link>
      </div>

      {/* Center — search */}
      <form
        onSubmit={handleSearch}
        className="flex items-center flex-1 max-w-xl mx-4"
      >
        <input
          type="text"
          placeholder="Search data structures..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 px-4 rounded-l-full border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ring"
        />
        <button
          type="submit"
          className="h-10 px-5 rounded-r-full border border-l-0 border-border bg-secondary hover:bg-muted"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-secondary hidden sm:flex">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-secondary">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
