import type { Video } from "@/data/videos";
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from "lucide-react";

const VideoPlayer = ({ video }: { video: Video }) => {
  return (
    <div>
      {/* Player */}
      <div className="aspect-video bg-foreground rounded-xl overflow-hidden">
        <video
          src={video.videoUrl}
          controls
          autoPlay
          className="w-full h-full"
          poster={video.thumbnail}
        />
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold mt-3 text-foreground">{video.title}</h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            {video.channel.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{video.channel}</p>
            <p className="text-xs text-muted-foreground">128K subscribers</p>
          </div>
          <button className="ml-4 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity">
            Subscribe
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-secondary rounded-full">
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:bg-muted rounded-l-full transition-colors">
              <ThumbsUp className="w-4 h-4" /> 4.2K
            </button>
            <span className="w-px h-6 bg-border" />
            <button className="px-3 py-2 hover:bg-muted rounded-r-full transition-colors">
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-secondary rounded-full hover:bg-muted transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-secondary rounded-full hover:bg-muted transition-colors hidden sm:flex">
            <Download className="w-4 h-4" /> Download
          </button>
          <button className="p-2 bg-secondary rounded-full hover:bg-muted transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 p-3 bg-secondary rounded-xl">
        <p className="text-sm font-medium text-foreground">
          {video.views} · {video.uploadedAt}
        </p>
        <p className="text-sm text-foreground mt-2 whitespace-pre-line">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
