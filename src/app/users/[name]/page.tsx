"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Image,
  Trophy,
  FileText,
  EyeOff,
  Heart,
  Info,
  Upload,
  MessageCircle,
  Zap,
  Star,
  Moon,
  Users,
  Clock,
  Folder,
} from "lucide-react";

import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedPage from "@/components/AnimatedPage";

// Coin icon component
const CoinIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#F59E0B" />
    <circle cx="12" cy="12" r="7" fill="#FBBF24" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fill="#92400E"
      fontSize="10"
      fontWeight="bold"
    >
      $
    </text>
  </svg>
);

// Twitch icon
const TwitchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
  </svg>
);

// Telegram icon
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

// Format number with space separators
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

type TabType = "media" | "achievements" | "files" | "hidden" | "liked";

export default function ProfilePage() {
  const params = useParams() as any;
  const name = params?.name;

  // Load user from localStorage if available, otherwise use defaults from the design
  const [user] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("user");
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {}
    return {
      username: name || "user",
      joinedMonths: 2,
      online: true,
      files: 0,
      likes: 0,
      views: 0,
      achievements: { total: 19, unlocked: 0 },
    };
  });

  const [activeTab, setActiveTab] = useState<TabType>("achievements");

  const tabs = [
    { id: "media", label: "Медиа", icon: Image },
    { id: "achievements", label: "Достижения", icon: Trophy },
    { id: "files", label: "Файлы", icon: FileText },
    { id: "hidden", label: "Скрытые", icon: EyeOff },
    { id: "liked", label: "Понравившиеся", icon: Heart },
  ];

  const progressAchievements = [
    {
      id: 1,
      icon: Upload,
      title: "Первый файл",
      description: "Загрузите первый файл на сайт",
      reward: 200,
      progress: 0,
      total: 1,
      remaining: 1,
      color: "orange",
    },
    {
      id: 2,
      icon: Folder,
      title: "10 загрузок",
      description: "Загрузите 10 файлов",
      reward: 500,
      progress: 0,
      total: 10,
      remaining: 10,
      color: "cyan",
    },
    {
      id: 3,
      icon: Folder,
      title: "100 загрузок",
      description: "Загрузите 100 файлов",
      reward: 2000,
      progress: 0,
      total: 100,
      remaining: 100,
      color: "pink",
    },
    {
      id: 4,
      icon: Folder,
      title: "25 загрузок",
      description: "Загрузите 25 файлов",
      reward: 900,
      progress: 0,
      total: 25,
      remaining: 25,
      color: "purple",
    },
  ];

  const challengeAchievements = [
    {
      id: 1,
      icon: Moon,
      title: "Ночной аплоудер",
      description: "Загрузите файл между 00:00 и 06:00",
      reward: 400,
      progress: 0,
      total: 1,
      timeInfo: "Выполните условие, чтобы открыть достижение",
      color: "pink",
    },
    {
      id: 2,
      icon: Users,
      title: "Социальная волна",
      description: "Получите 5 комментариев за сутки",
      reward: 900,
      progress: 0,
      total: 5,
      timeInfo: "За последние 1 дн. • Осталось 5",
      color: "yellow",
    },
    {
      id: 3,
      icon: Zap,
      title: "Заливной спринт",
      description: "Загрузите 5 файлов за 24 часа",
      reward: 1200,
      progress: 0,
      total: 5,
      timeInfo: "За последние 1 дн. • Осталось 5",
      color: "cyan",
    },
    {
      id: 4,
      icon: Star,
      title: "Поддержка дня",
      description: "Сделайте 10 лайков другим авторам в день",
      reward: 700,
      progress: 0,
      total: 10,
      timeInfo: "За последние 1 дн. • Осталось 10",
      color: "yellow",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; glow: string; icon: string; badge: string }> = {
      orange: {
        border: "gradient-border gradient-border-orange",
        glow: "card-glow-orange",
        icon: "text-orange-400",
        badge: "bg-orange-500/20 text-orange-400",
      },
      pink: {
        border: "gradient-border gradient-border-pink",
        glow: "card-glow-pink",
        icon: "text-pink-400",
        badge: "bg-pink-500/20 text-pink-400",
      },
      cyan: {
        border: "gradient-border gradient-border-cyan",
        glow: "card-glow-cyan",
        icon: "text-cyan-400",
        badge: "bg-cyan-500/20 text-cyan-400",
      },
      purple: {
        border: "gradient-border gradient-border-purple",
        glow: "card-glow-purple",
        icon: "text-purple-400",
        badge: "bg-purple-500/20 text-purple-400",
      },
      yellow: {
        border: "gradient-border gradient-border-yellow",
        glow: "card-glow-yellow",
        icon: "text-yellow-400",
        badge: "bg-yellow-500/20 text-yellow-400",
      },
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117] text-white pt-28">
      <Header />
      <div className="container-xl py-10 pb-40 flex-1">
        <AnimatedPage>
          {/* Profile Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 items-start">
            {/* Left: Avatar + buttons */}
            <div className="lg:col-span-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-3xl md:text-4xl font-bold">
                    {user.username.slice(0,2).toUpperCase()}
                  </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-9 md:h-9 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-900" fill="currentColor" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 uppercase tracking-wide">
                    {user.joinedMonths} месяца на сайте
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    {user.online ? 'Онлайн' : 'Оффлайн'}
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-3">{user.username}</h1>
                <div className="flex flex-wrap gap-2">

                  <button className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg text-sm text-teal-300 transition-colors">
                    <TelegramIcon />
                    Привязать Telegram
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Stats */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex gap-4 items-center justify-start">
              <div className="gradient-border px-8 py-5 text-center min-w-[120px] rounded-xl">
                <div className="flex justify-center mb-1">
                  <Folder className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-teal-400">{user.files}</div>
                <div className="text-xs text-slate-400">файлов</div>
              </div>
              <div className="gradient-border px-8 py-5 text-center min-w-[120px] rounded-xl">
                <div className="flex justify-center mb-1">
                  <Heart className="w-6 h-6 text-slate-400" fill="currentColor" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-teal-400">{user.likes}</div>
                <div className="text-xs text-slate-400">лайков</div>
              </div>
              <div className="gradient-border px-8 py-5 text-center min-w-[120px] rounded-xl">
                <div className="flex justify-center mb-1">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <circle cx="12" cy="12" r="10" fill="#F97316" />
                    <circle cx="12" cy="12" r="4" fill="white" />
                    <circle cx="12" cy="12" r="2" fill="#F97316" />
                  </svg>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-teal-400">{user.views}</div>
                <div className="text-xs text-slate-400">просмотров</div>
              </div>
            </div>
          </div>

          {/* Right: placeholder for collection / actions */}
          <div className="lg:col-span-3">
            <div className="h-full flex flex-col gap-4">
              <div className="gradient-border p-4 hidden md:block">
                <div className="text-sm text-slate-400">Привяжите Twitch и Telegram — тогда другим будет проще вас узнать.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="gradient-border p-4 mb-6">
          <div className="flex items-center gap-3 text-slate-300">
            <Info className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <span className="text-sm">
              Привяжите Twitch и Telegram — тогда другим будет проще вас узнать.
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon as any;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tabs content: empty states or achievements */}
        {activeTab !== 'achievements' ? (
          activeTab === 'media' ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center bg-[#0b0f15] border border-[#1f2937] rounded-2xl px-12 py-10 w-full md:max-w-2xl">
                <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Пока нет загруженных медиа</h3>
                <p className="text-sm text-slate-400">Загрузите свой первый медиа файл, чтобы он появился здесь</p>
              </div>
            </div>
          ) : activeTab === 'files' ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center bg-[#0b0f15] border border-[#1f2937] rounded-2xl px-12 py-10 w-full md:max-w-2xl">
                <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Пока нет файлов</h3>
                <p className="text-sm text-slate-400">Загрузите свой первый файл, чтобы он появился здесь</p>
              </div>
            </div>
          ) : activeTab === 'hidden' ? (
            <div className="flex items-center justify-center p-12">
              <div className="text-center bg-[#0b0f15] border border-[#1f2937] rounded-2xl px-12 py-10 w-full md:max-w-2xl">
                <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Скрытых нет</h3>
                <p className="text-sm text-slate-400">Скрытые файлы появятся здесь</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-12">
              <div className="text-center bg-[#0b0f15] border border-[#1f2937] rounded-2xl px-12 py-10 w-full md:max-w-2xl">
                <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Нет понравившихся</h3>
                <p className="text-sm text-slate-400">Понравившиеся файлы появятся здесь</p>
              </div>
            </div>
          )
        ) : (
          // Achievements: Collection + Progress + Challenge
          <>
            <div className="gradient-border p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold mb-1">Коллекция достижений</h2>
                  <p className="text-sm text-slate-400">
                    Здесь собраны ваши награды, прогресс и будущие цели.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 md:w-48">
                    <Progress value={0} className="h-2 bg-slate-700" />
                    <p className="text-xs text-slate-500 mt-1">0% коллекции открыто</p>
                  </div>
                  <div className="px-4 py-2 bg-cyan-500 rounded-lg text-sm font-bold">
                    0/19
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-bold">Прогресс</h3>
                <span className="text-sm text-slate-500">0/4</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {progressAchievements.map((achievement) => {
                  const Icon = achievement.icon as any;
                  const colorClasses = getColorClasses(achievement.color);
                  return (
                    <div
                      key={achievement.id}
                      className={`${colorClasses.border} ${colorClasses.glow} p-4`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-slate-800/50 ${colorClasses.icon}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-0.5 truncate">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {achievement.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">Прогресс</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${colorClasses.badge} flex items-center gap-1`}>
                          <CoinIcon className="w-3 h-3" />
                          +{formatNumber(achievement.reward)} diddycoin
                        </span>
                      </div>

                      <div className="mb-2">
                        <Progress
                          value={(achievement.progress / achievement.total) * 100}
                          className="h-1.5 bg-slate-700"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Прогресс</span>
                        <span className="text-slate-300">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Осталось {achievement.remaining}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-bold">Челлендж</h3>
                <span className="text-sm text-slate-500">0/5</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {challengeAchievements.map((achievement) => {
                  const Icon = achievement.icon as any;
                  const colorClasses = getColorClasses(achievement.color);
                  return (
                    <div
                      key={achievement.id}
                      className={`${colorClasses.border} ${colorClasses.glow} p-4`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-slate-800/50 ${colorClasses.icon}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-0.5 truncate">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2">
                            {achievement.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400">Челлендж</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${colorClasses.badge} flex items-center gap-1`}>
                          <CoinIcon className="w-3 h-3" />
                          +{formatNumber(achievement.reward)} diddycoin
                        </span>
                      </div>

                      <div className="mb-2">
                        <Progress
                          value={(achievement.progress / achievement.total) * 100}
                          className="h-1.5 bg-slate-700"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Прогресс</span>
                        <span className="text-slate-300">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {achievement.timeInfo}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        </AnimatedPage>
      </div>
      <Footer />
    </div>
  );
}

