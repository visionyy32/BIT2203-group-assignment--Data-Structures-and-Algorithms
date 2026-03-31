import { Link } from "react-router-dom";
import type { Video } from "@/data/videos";
import { MoreVertical } from "lucide-react";

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-yt-surface">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No thumbnail
          </div>
        )}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
          {video.channel.charAt(0)}
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
        <button
          onClick={(e) => e.preventDefault()}
          className="opacity-0 group-hover:opacity-100 p-1 h-fit rounded-full hover:bg-yt-hover transition-all"
        >
          <MoreVertical className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </Link>
  );
};

export default VideoCard;
