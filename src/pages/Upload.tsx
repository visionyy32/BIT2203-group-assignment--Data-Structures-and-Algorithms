import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";
import { Upload, Film } from "lucide-react";
import { toast } from "sonner";
import { addUserVideo } from "@/data/videos";

const UploadPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Arrays");
  const [channel, setChannel] = useState("My Channel");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [thumbPreviewUrl, setThumbPreviewUrl] = useState<string | null>(null);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleThumbSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbFile(file);
      setThumbPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    const videoUrl = URL.createObjectURL(videoFile);
    const thumbnail = thumbPreviewUrl || "";

    const newVideo = addUserVideo({
      title: title.trim(),
      description: description.trim(),
      category,
      channel: channel.trim() || "My Channel",
      videoUrl,
      thumbnail,
    });

    toast.success("Video uploaded successfully!");
    navigate(`/watch/${newVideo.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 min-w-0 max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Upload Video</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video file */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-yt-surface transition-colors"
            >
              {videoPreviewUrl ? (
                <video src={videoPreviewUrl} className="max-h-48 rounded-lg" controls />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mb-3" />
                  <p className="text-sm text-foreground font-medium">Click to select a video file</p>
                  <p className="text-xs text-muted-foreground mt-1">MP4, WebM, OGG supported</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoSelect}
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Thumbnail (optional)</label>
              <div
                onClick={() => thumbInputRef.current?.click()}
                className="border border-border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-yt-surface transition-colors"
              >
                {thumbPreviewUrl ? (
                  <img src={thumbPreviewUrl} alt="Thumbnail" className="h-20 rounded-md object-cover" />
                ) : (
                  <Film className="w-8 h-8 text-muted-foreground" />
                )}
                <p className="text-sm text-muted-foreground">Click to upload thumbnail image</p>
                <input
                  ref={thumbInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbSelect}
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title..."
                className="w-full h-10 px-3 rounded-lg border border-border bg-yt-surface text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your video..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-border bg-yt-surface text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Channel */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Channel Name</label>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-yt-surface text-foreground text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-yt-surface text-foreground text-sm focus:outline-none focus:border-primary"
              >
                {["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Hash Tables"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Upload Video
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UploadPage;
