"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { latestVideos, feedVideos } from "@/lib/data";
import AnimatedPage from "@/components/AnimatedPage";

const tabs = [
  { id: "recommendations", label: "Рекомендации", active: true },
  { id: "trends", label: "Тренды", active: false },
  { id: "new", label: "Новые", active: false },
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [safeMode, setSafeMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container px-4 md:px-8 pt-24 md:pt-28 pb-8">
        <AnimatedPage className="space-y-6">
          {/* Latest Uploads Section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4">Последние загрузки</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scroll-container">
              {latestVideos.map((video) => (
                <VideoCard key={video.id} video={video} variant="compact" />
              ))}
            </div>
          </section>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-secondary text-white hover:bg-secondary/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSafeMode(!safeMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                safeMode
                  ? "border-yellow-500 text-yellow-500"
                  : "border-yellow-500/50 text-yellow-500/70 hover:border-yellow-500 hover:text-yellow-500"
              }`}
            >
              <Shield className="w-4 h-4" />
              Безопасный режим
            </button>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </AnimatedPage>
      </main>

    </div>
  );
}
