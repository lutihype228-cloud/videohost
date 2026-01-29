"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Download, Flag, Clock, Gift } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import VideoCard from "@/components/VideoCard";
import CommentSection from "@/components/CommentSection";
import { currentVideo, sampleComments, recommendedVideos } from "@/lib/data";
import AnimatedPage from "@/components/AnimatedPage";

export default function VideoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container px-4 md:px-8 pt-24 md:pt-28 pb-8">
        <AnimatedPage>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <VideoPlayer
                src={currentVideo.videoUrl}
                poster={currentVideo.thumbnail}
              />

              {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-semibold text-white">
                {currentVideo.title}
              </h1>

              {/* Author */}
              <div className="flex items-center justify-between mt-4 pb-4 border-b border-border/40">
                <Link href={`/users/${currentVideo.author.name}`} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary">
                    <Image
                      src={currentVideo.author.avatar}
                      alt={currentVideo.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        {currentVideo.author.name}
                      </span>
                      {currentVideo.author.verified && (
                        <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">8 файлов</span>
                  </div>
                </Link>
              </div>

              {/* Stats and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Загружено {currentVideo.timeAgo}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{currentVideo.likes}</span>
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                    <Flag className="w-4 h-4" />
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors">
                    <Gift className="w-4 h-4" />
                    <span className="text-sm">Благодарность</span>
                  </button>
                </div>
              </div>

              {/* Comments */}
              <CommentSection comments={sampleComments} totalCount={26} />
            </div>
          </div>

          {/* Sidebar - Recommended Videos */}
          <div className="space-y-4">
            {/* Extension Banner */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1b4b] to-[#2d1b4b] p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">УСТАНОВИТЕ</p>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  РАСШИР<span className="text-primary">=</span>НИЕ
                </h3>
                <p className="text-xs text-muted-foreground uppercase">
                  СКАЧИВАНИЕ КЛИПОВ<br />
                  ПРЕДПРОСМОТР ССЫЛОК
                </p>
              </div>
            </div>

            {/* Recommended Videos */}
            <div className="space-y-4">
              {recommendedVideos.map((video) => (
                <VideoCard key={video.id} video={video} variant="horizontal" />
              ))}
            </div>
          </div>
        </div>
        </AnimatedPage>
      </main>

      <Footer />
    </div>
  );
}
