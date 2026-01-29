"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Video } from "@/lib/data";

interface VideoCardProps {
  video: Video;
  variant?: "default" | "compact" | "horizontal";
}

export default function VideoCard({ video, variant = "default" }: VideoCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/video/${video.id}`} className="flex gap-3 group">
        <div className="relative w-[140px] h-[80px] flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
          <img
            src={video.thumbnail}
            alt={video.title || "Video thumbnail"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {video.duration && (
            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-xs font-medium bg-black/80 text-white rounded">
              {video.duration}
            </span>
          )}
        </div>
        <div className="flex flex-col min-w-0 py-0.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary flex-shrink-0">
              <img
                src={video.author.avatar}
                alt={video.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-primary truncate">{video.author.name}</span>
            {video.author.verified && (
              <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{video.views} просмотров</span>
          <span className="text-xs text-muted-foreground">{video.timeAgo}</span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/video/${video.id}`} className="flex-shrink-0 w-[280px] group">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
          <img
            src={video.thumbnail}
            alt={video.title || "Video thumbnail"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {video.duration && (
            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-xs font-medium bg-black/80 text-white rounded">
              {video.duration}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary">
            <img
              src={video.author.avatar}
              alt={video.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-muted-foreground">{video.author.name}</span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <span>{video.views} просмотров</span>
          <span>•</span>
          <span>{video.timeAgo}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/video/${video.id}`} className="group">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
        <img
          src={video.thumbnail}
          alt={video.title || "Video thumbnail"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-xs font-medium bg-black/80 text-white rounded">
            {video.duration}
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">
          {video.title || "Untitled"}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary">
            <img
              src={video.author.avatar}
              alt={video.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-primary hover:underline">{video.author.name}</span>
          {video.author.verified && (
            <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>{video.views} просмотров</span>
          <span>•</span>
          <div className="flex items-center gap-0.5">
            <Heart className="w-3 h-3" />
            <span>{video.likes}</span>
          </div>
          <span>•</span>
          <span>{video.timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}
