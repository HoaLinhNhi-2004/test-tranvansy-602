"use client";

import { mockVideos } from "@/data/mockVideos";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  return (
    <div
      className="no-scrollbar h-full w-full overflow-y-scroll
                 snap-y snap-mandatory scroll-smooth"
    >
      {mockVideos.map((video) => (
        <section
          key={video.id}
          className="flex h-full w-full snap-start snap-always
                     items-center justify-center"
        >
          <VideoCard video={video} />
        </section>
      ))}
    </div>
  );
}