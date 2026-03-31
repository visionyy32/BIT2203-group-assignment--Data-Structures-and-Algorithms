import { Link } from "react-router-dom";
import type { Video } from "@/data/videos";

const SuggestedVideos = ({ videos, currentId }: { videos: Video[]; currentId: string }) => {
  const suggestions = videos.filter((v) => v.id !== currentId);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-bold text-foreground px-1">Up next</h2>
      {suggestions.map((video) => (
        <Link
          key={video.id}
          to={`/watch/${video.id}`}
          className="flex gap-2 group"
        >
          <div className="relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <span className="absolute bottom-1 right-1 bg-foreground/80 text-primary-foreground text-[10px] font-medium px-1 py-0.5 rounded">
              {video.duration}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium leading-snug line-clamp-2 text-foreground">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
            <p className="text-xs text-muted-foreground">
              {video.views} · {video.uploadedAt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SuggestedVideos;
