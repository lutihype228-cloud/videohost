"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import {
  ImageIcon,
  FileIcon,
  UserIcon,
  CloudUploadIcon,
  DownloadIcon,
} from "@/components/Icons";
import Link from "next/link";
import AnimatedPage from "@/components/AnimatedPage";

type TabType = "media" | "files";

interface TierInfo {
  name: string;
  limit: string;
  description: string;
  isCurrent: boolean;
}

const tiers: TierInfo[] = [
  {
    name: "Гость",
    limit: "20 МБ",
    description: "Доступно без авторизации",
    isCurrent: true,
  },
  {
    name: "Авторизованный",
    limit: "150 МБ",
    description: "Нужна авторизация",
    isCurrent: false,
  },
  {
    name: "Проверенный",
    limit: "300 МБ",
    description: "Роль Верифицирован",
    isCurrent: false,
  },
];

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState<TabType>("media");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setUploadedFile(files[0]);
      }
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <AnimatedPage>
          <div className="container-xl max-w-3xl mx-auto">
            {/* Main Upload Card */}
            <div className="bg-[#1a2332] rounded-2xl p-6 md:p-8 shadow-xl border border-[#252d3d] fade-in-up">
              {/* Title */}
              <h1 className="text-2xl font-semibold text-white mb-6">
                Загрузка медиа
              </h1>

            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-[#252d3d] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("media")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === "media"
                      ? "bg-[#313948] text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <ImageIcon
                    className={
                      activeTab === "media" ? "text-[#17b4a1]" : "text-gray-400"
                    }
                  />
                  Медиа
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("files")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === "files"
                      ? "bg-[#313948] text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FileIcon
                    className={
                      activeTab === "files" ? "text-[#17b4a1]" : "text-gray-400"
                    }
                  />
                  Файлы
                </button>
              </div>
            </div>

            {/* Status Badges */}
            <div className="bg-[#141b27] rounded-xl p-4 mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#313948] rounded-full text-sm text-white">
                  <UserIcon className="text-gray-400" />
                  Ваш статус: Гостевой доступ
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#17b4a1] text-[#17b4a1] rounded-full text-sm">
                  <span className="w-1.5 h-1.5 bg-[#17b4a1] rounded-full" />
                  Текущий лимит: 20 МБ
                </div>
                <div className="inline-flex items-center px-3 py-1.5 bg-[#0f5132] text-[#2fc29b] rounded-full text-sm">
                  Загрузки доступны
                </div>
              </div>

              {/* Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-xl p-4 transition-all duration-200 ${
                      tier.isCurrent
                        ? "bg-gradient-to-br from-[#1a3a5c] to-[#1a4a4a] border border-[#17b4a1]/30"
                        : "bg-[#1a2332] border border-[#313948]"
                    }`}
                  >
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {tier.name}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {tier.limit}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {tier.description}
                    </p>
                    {tier.isCurrent && (
                      <span className="text-xs text-[#17b4a1] mt-2 inline-block">
                        Текущий лимит
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-xl border-2 border-dashed p-8 md:p-12 text-center transition-all duration-200 cursor-pointer ${
                isDragging
                  ? "border-[#17b4a1] bg-[#17b4a1]/10"
                  : "border-[#313948] hover:border-[#525e6f] bg-[#141b27]"
              }`}
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime,audio/mp3,audio/wav"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center">
                <CloudUploadIcon
                  className={`mb-4 transition-colors ${
                    isDragging ? "text-[#17b4a1]" : "text-gray-500"
                  }`}
                />
                <h3 className="text-lg font-medium text-white mb-2">
                  {uploadedFile
                    ? uploadedFile.name
                    : "Перетащите файл сюда или нажмите для выбора"}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  Поддерживаются форматы: MP4, MOV, WAV, GIF, PNG, JPG, JPEG
                </p>
                <span className="text-xs text-gray-500">
                  Также поддерживается вставка через Ctrl+V
                </span>
              </div>
            </div>

            {/* Auth Prompt */}
            <div className="mt-6 bg-[#141b27] rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-[#252d3d]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#17b4a1]/20 flex items-center justify-center flex-shrink-0">
                  <DownloadIcon className="text-[#17b4a1]" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-white">
                    Больше возможностей после авторизации
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Загружайте клипы с Twitch по ссылке, управляйте файлами и
                    получите доступ к расширенным функциям
                  </p>
                </div>
              </div>
              <Link
                href="/auth"
                className="px-5 py-2.5 text-sm font-medium text-[#17b4a1] border border-[#17b4a1] rounded-lg hover:bg-[#17b4a1]/10 transition-colors whitespace-nowrap"
              >
                Войти в систему
              </Link>
            </div>
          </div>
        </div>
        </AnimatedPage>
      </main>
      <Footer />
      <CookieBanner />
      <ScrollToTop />
    </div>
  );
}
