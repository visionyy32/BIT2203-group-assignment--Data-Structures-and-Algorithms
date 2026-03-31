import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";
import VideoPlayer from "@/components/VideoPlayer";
import SuggestedVideos from "@/components/SuggestedVideos";
import { videos } from "@/data/videos";

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg text-muted-foreground">Video not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 min-w-0 max-w-[1400px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <VideoPlayer video={video} />
          </div>
          <div className="w-full lg:w-96 flex-shrink-0">
            <SuggestedVideos videos={videos} currentId={video.id} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Watch;
