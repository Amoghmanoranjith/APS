import React from "react";
import VideoCard from "./VideoCard";

// Sample static video data
const videos = [
  {
    id: 1,
    title: "React Tutorial for Beginners",
    channel: "Code Academy",
    views: "1.2M views",
    timestamp: "2 days ago",
    thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    channelImage: "https://yt3.ggpht.com/ytc/AMLnZu9UrGdMEdA1yDh1Pqhz_xEyHPwzUqU69K9NG_m7=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 2,
    title: "Tailwind CSS Crash Course",
    channel: "DevSimplify",
    views: "540K views",
    timestamp: "1 week ago",
    thumbnail: "https://i.ytimg.com/vi/dFgzHOX84xQ/hqdefault.jpg",
    channelImage: "https://yt3.ggpht.com/ytc/AMLnZu9UrGdMEdA1yDh1Pqhz_xEyHPwzUqU69K9NG_m7=s88-c-k-c0x00ffffff-no-rj",
  },
  // Add more videos here as needed
];

export default function VideoGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  );
}
