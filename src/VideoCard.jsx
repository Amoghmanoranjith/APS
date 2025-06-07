import React from "react";

export default function VideoCard({ video }) {
  return (
    <div className="cursor-pointer w-full">
      {/* Thumbnail */}
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Video Info */}
      <div className="flex mt-3 space-x-3">
        <img
          src={video.channelImage}
          alt={video.channel}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-col">
          <h3 className="text-sm font-medium leading-snug line-clamp-2 text-gray-900 dark:text-white">
            {video.title}
          </h3>
          <span className="text-xs text-gray-600 dark:text-gray-400">{video.channel}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {video.views} • {video.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
