import { useState, useRef } from "react";
import type { Video } from "@/data/videos";
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, Flag, ListPlus } from "lucide-react";
import { toast } from "sonner";

const VideoPlayer = ({ video }: { video: Video }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(4200);
  const [subscribed, setSubscribed] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setDisliked(false);
      setLikeCount((c) => c + 1);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikeCount((c) => c - 1);
      }
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = video.videoUrl;
    a.download = `${video.title}.mp4`;
    a.click();
    toast.success("Download started!");
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    toast.success(subscribed ? "Unsubscribed" : "Subscribed!");
  };

  const formatCount = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <div>
      {/* Player */}
      <div className="aspect-video bg-foreground/5 rounded-xl overflow-hidden">
        <video
          ref={videoRef}
          src={video.videoUrl}
          controls
          autoPlay
          className="w-full h-full bg-black"
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
          <button
            onClick={handleSubscribe}
            className={`ml-4 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              subscribed
                ? "bg-secondary text-secondary-foreground hover:bg-accent"
                : "bg-foreground text-background hover:opacity-80"
            }`}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Like / Dislike */}
          <div className="flex items-center bg-secondary rounded-full">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-l-full transition-colors ${
                liked ? "text-primary" : "hover:bg-yt-hover"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              {formatCount(likeCount)}
            </button>
            <span className="w-px h-6 bg-border" />
            <button
              onClick={handleDislike}
              className={`px-3 py-2 rounded-r-full transition-colors ${
                disliked ? "text-primary" : "hover:bg-yt-hover"
              }`}
            >
              <ThumbsDown className={`w-4 h-4 ${disliked ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-secondary rounded-full hover:bg-yt-hover transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-secondary rounded-full hover:bg-yt-hover transition-colors hidden sm:flex"
          >
            <Download className="w-4 h-4" /> Download
          </button>

          {/* More menu */}
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className="p-2 bg-secondary rounded-full hover:bg-yt-hover transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showMore && (
              <div className="absolute right-0 top-10 w-48 bg-yt-surface border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                <button
                  onClick={() => {
                    toast.success("Added to Watch Later");
                    setShowMore(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-yt-hover transition-colors"
                >
                  <ListPlus className="w-4 h-4" /> Save to Watch Later
                </button>
                <button
                  onClick={() => {
                    toast.info("Reported. Thank you for your feedback.");
                    setShowMore(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-yt-hover transition-colors"
                >
                  <Flag className="w-4 h-4" /> Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className="mt-4 p-3 bg-secondary rounded-xl cursor-pointer hover:bg-accent transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <p className="text-sm font-medium text-foreground">
          {video.views} · {video.uploadedAt}
        </p>
        <p className={`text-sm text-foreground mt-2 whitespace-pre-line ${!expanded ? "line-clamp-2" : ""}`}>
          {video.description}
        </p>
        <p className="text-xs font-medium text-muted-foreground mt-1">
          {expanded ? "Show less" : "...more"}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
