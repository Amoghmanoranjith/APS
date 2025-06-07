import React from "react";
import { Link } from "react-router-dom";

const businessCases = [
  {
    id: 1,
    title: "Low latency pre-fetching of hot Videos in a Locality",
    description: "MG algorithm to locally compute top-k videos.",
    image: "/assets/bc1.excalidraw.svg",
    path: "/bc1",
  },
  {
    id: 2,
    title: "Efficient Estimation of Hashtag Trends",
    description: "Streaming Count-Min Sketch for trend detection.",
    image: "/assets/bc2.excalidraw.svg",
    path: "/bc2",
  },
  {
    id: 3,
    title: "Median Age Estimation using Munro-Paterson Algorithm",
    description: "Memory-efficient streaming median computation.",
    image: "/assets/bc3.excalidraw.svg",
    path: "/bc3",
  },
  {
    id: 4,
    title: "Real-Time Viewer Analytics using Fenwick Trees",
    description: "Efficient real-time tracking of viewer engagement.",
    image: "/assets/bc4.svg",
    path: "/bc4",
  },
  {
    id: 5,
    title: "Identifying CDN Bottlenecks Using Max-Flow",
    description: "Ford-Fulkerson algorithm to detect content delivery limits.",
    image: "/assets/bc5.png",
    path: "/bc5",
  },
  {
    id: 6,
    title: "View Density Analysis using Sweep Line Algorithm",
    description: "Fine-grained video segment view tracking.",
    image: "/assets/bc6.excalidraw.svg",
    path: "/bc6",
  },
  {
    id: 8,
    title: "Video Recommendation Using KD-Tree Embeddings",
    description: "Fast nearest-neighbor search over user/video embeddings.",
    image: "/assets/bc8.svg",
    path: "/bc8",
  },
];



export default function Explore() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {businessCases.map((item) => (
        <Link
          to={item.path}
          key={item.id}
          className="group block w-full transition-transform duration-200 transform hover:scale-105"
        >
          <div className="bg-white dark:bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full aspect-video overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
