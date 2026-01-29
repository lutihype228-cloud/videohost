"use client";

import { useState, useEffect } from "react";
import { Search, MessageSquare, HelpCircle, Clock, ShoppingCart, Check, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ShopProductCard from "@/components/ShopProductCard";
import SlotGame from "@/components/SlotGame";
import AnimatedPage from "@/components/AnimatedPage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const styles = [
  {
    id: 1,
    name: "Без стиля",
    description: "Отключает все стили и возвращает обычный вид никнейма",
    price: 0,
    isActive: true,
    isSelected: true,
    textStyle: "text-white font-medium",
    bgGradient: "",
  },
  {
    id: 2,
    name: "Forest Romance",
    description: "Таинственное дыхание хвойного леса",
    price: 5000,
    isActive: false,
    isSelected: false,
    textStyle: "text-teal-400 font-medium",
    bgGradient: "",
  },
  {
    id: 3,
    name: "Snow Veil",
    description: "Холодный блеск морозного утра",
    price: 7000,
    isActive: false,
    isSelected: false,
    textStyle: "text-cyan-400 font-medium",
    bgGradient: "",
  },
  {
    id: 4,
    name: "Lollipop",
    description: "Сладкий вкус новогоднего волшебства",
    price: 10000,
    isActive: false,
    isSelected: false,
    textStyle:
      "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-medium",
    bgGradient: "",
  },
];

const tabs = ["Никнейм", "Профиль", "Бонус", "Слот"];

// Bonus settings
const BONUS_MIN = 50;
const BONUS_MAX = 200;
const BONUS_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

function getRandomBonus() {
  return Math.floor(Math.random() * (BONUS_MAX - BONUS_MIN + 1)) + BONUS_MIN;
}

function getTimeLeft(lastClaim: number) {
  const now = Date.now();
  const diff = BONUS_INTERVAL - (now - lastClaim);
  if (diff <= 0) return null;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("Никнейм");
  const [selectedStyle, setSelectedStyle] = useState(1);
  const [countdown, setCountdown] = useState({
    days: 8,
    hours: 22,
    minutes: 44,
  });

  // Bonus state (SSR-friendly initial values)
  const [balance, setBalance] = useState(1020);
  const [lastClaim, setLastClaim] = useState(0);
  const [lastBonus, setLastBonus] = useState(100);
  const [timeLeft, setTimeLeft] = useState<null | { hours: number; minutes: number; seconds: number }>(null);
  const [spinning, setSpinning] = useState(false);

  // On mount, load persisted client state from localStorage to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === "undefined") return;
    const b = Number(localStorage.getItem("bonus_balance") || 1020);
    let lc = Number(localStorage.getItem("bonus_lastClaim") || 0);
    const lb = Number(localStorage.getItem("bonus_lastBonus") || 100);

    // Support quick reset via ?resetBonus=1 (no UI button)
    // Also auto-reset when visiting from localhost or in development mode to ease demos
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("resetBonus") === "1") {
        lc = 0;
        localStorage.setItem("bonus_lastClaim", "0");
      } else {
        const { hostname } = window.location;
        // reset for localhost or when running in development
        if (hostname === "localhost" || hostname === "127.0.0.1" || process.env.NODE_ENV === "development") {
          lc = 0;
          localStorage.setItem("bonus_lastClaim", "0");
        }
      }
    } catch (e) {
      // ignore
    }

    setBalance(b);
    setLastClaim(lc);
    setLastBonus(lb);
    setTimeLeft(getTimeLeft(lc));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(lastClaim));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastClaim]);

  const canSpin = !timeLeft; // true when enough time passed

  const handleSpin = () => {
    if (!canSpin || spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const bonus = getRandomBonus();
      setBalance((b) => {
        const newB = b + bonus;
        localStorage.setItem("bonus_balance", String(newB));
        return newB;
      });
      const now = Date.now();
      setLastClaim(() => {
        localStorage.setItem("bonus_lastClaim", String(now));
        return now;
      });
      setLastBonus(() => {
        localStorage.setItem("bonus_lastBonus", String(bonus));
        return bonus;
      });
      setSpinning(false);
    }, 1200);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes } = prev;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0 };
        }
        return { days, hours, minutes };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Sample products for the Profile tab
  const products = [
    { id: 1, title: "Облака", price: 10000, tag: "GIF", image: "/images/shop/clouds.svg" },
    { id: 2, title: "Синяя волна", price: 5000, tag: "IMG", image: "/images/shop/wave.svg" },
    { id: 3, title: "Лес", price: 5000, tag: "IMG", image: "/images/shop/forest.svg" },
    { id: 4, title: "Сакура", price: 5000, tag: "IMG", image: "/images/shop/sakura.svg" },
    { id: 5, title: "Горы", price: 7000, tag: "IMG", image: "/images/shop/mountains.svg" },
    { id: 6, title: "Неон", price: 8000, tag: "IMG", image: "/images/shop/neon.svg" },
    { id: 7, title: "Закат", price: 6500, tag: "IMG", image: "/images/shop/sunset.svg" },
    { id: 8, title: "Туман", price: 3000, tag: "IMG", image: "/images/shop/mist.svg" },
  ];

  // Sorting state for products
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc'>('price-asc');
  const sortLabelMap: Record<string, string> = {
    'price-asc': 'По цене (возр.)',
    'price-desc': 'По цене (убыв.)',
  };

  const sortedProducts = products.slice().sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    return b.price - a.price;
  });

  const [purchased, setPurchased] = useState<number[]>([]);

  function handleBuy(id: number) {
    if (!purchased.includes(id)) {
      setPurchased((s) => [...s, id]);
      // TODO: deduct balance / show toast
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12">
        <AnimatedPage className="space-y-6">
          {/* Title and Sort */}
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl font-light text-white italic">Магазин</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#161b22] border-[#30363d] text-white hover:bg-[#21262d] hover:text-white"
                >
                  <span className="text-xs text-gray-400 mr-2">Сортировка</span>
                  {sortLabelMap[sortOption]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#161b22] border-[#30363d]">
                <DropdownMenuItem
                  className="text-white hover:bg-[#21262d] flex items-center"
                  onClick={() => setSortOption('price-asc')}
                >
                  {sortOption === 'price-asc' && <Check className="w-4 h-4 mr-2 text-teal-400" />}
                  По цене (возр.)
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-white hover:bg-[#21262d] flex items-center"
                  onClick={() => setSortOption('price-desc')}
                >
                  {sortOption === 'price-desc' && <Check className="w-4 h-4 mr-2 text-teal-400" />}
                  По цене (убыв.)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mb-6 border-b border-[#21262d]">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm transition-colors relative ${
                  activeTab === tab
                    ? "text-teal-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-[#0d1117] to-[#161b22] border-[#30363d] p-6 mb-6 rounded-2xl relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-teal-600" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">ВАШ БАЛАНС</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-teal-400">{balance}</span>
                  <span className="text-gray-400 text-sm">diddycoin</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="ml-4 bg-transparent border-teal-500/50 text-teal-400 hover:bg-teal-500/10 hover:text-teal-300 rounded-full"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Как получить?
              </Button>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider">КОЛЛЕКЦИЯ СТИЛЕЙ</p>
              </div>
              <p className="text-white font-medium mb-2">Собрано 0 из 3 стиля</p>
              <Progress value={0} className="h-1 bg-[#21262d]" />
              <p className="text-gray-500 text-sm mt-2">Осталось собрать 3 стиля.</p>
            </div>
          </div>
        </Card>

        {/* Countdown Timer */}
        <Card className="bg-[#161b22] border-[#30363d] p-4 mb-8 rounded-2xl inline-flex items-center gap-4">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm uppercase tracking-wider">ДО НОВЫХ ТОВАРОВ</span>
          <div className="bg-[#0d1117] rounded-lg px-4 py-2">
            <span className="text-white font-medium">
              {String(countdown.days).padStart(2, "0")} дней {String(countdown.hours).padStart(2, "0")} часов {" "}
              {String(countdown.minutes).padStart(2, "0")} минут
            </span>
          </div>
        </Card>

        {/* Nickname Styles */}
        {activeTab === "Никнейм" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {styles.map((style) => (
              <Card
                key={style.id}
                className={`bg-[#161b22] border-[#30363d] rounded-2xl overflow-hidden transition-all hover:border-[#3d444d] relative ${
                  selectedStyle === style.id ? "border-teal-500/50" : ""
                }`}
              >
                {selectedStyle === style.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-teal-600 z-10" />
                )}
                {/* Preview Area */}
                <div className="h-32 flex items-center justify-center bg-gradient-to-b from-[#1a1f26] to-[#161b22] relative">
                  {style.isActive && (
                    <Badge className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded">Активен</Badge>
                  )}
                  <span className={`text-xl ${style.textStyle}`}>user</span>
                </div>

                {/* Info Area */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium text-sm">{style.name}</h3>
                    {style.price > 0 && <span className="text-teal-400 font-medium text-sm">{style.price}</span>}
                  </div>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{style.description}</p>

                  {style.isSelected ? (
                    <Button className="w-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30" size="sm">
                      <Check className="w-4 h-4 mr-2" />
                      Выбрано
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full bg-[#21262d] border-[#30363d] text-gray-400 hover:bg-[#30363d] hover:text-gray-300"
                      size="sm"
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Купить
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Profile Tab (Products) */}
        {activeTab === "Профиль" && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.slice(0, 4).map((p) => (
              <div key={p.id} className="w-full">
                <ShopProductCard
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  tag={p.tag as any}
                  image={p.image}
                  disabled={purchased.includes(p.id)}
                  onBuy={handleBuy}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bonus tab */}
        {activeTab === "Бонус" && (
          <Card className="bg-[#161b22] border-[#30363d] p-6 mb-6 rounded-2xl">
            <div className="text-2xl font-bold mb-2">Ежедневный бонус</div>
            <div className="text-gray-400 mb-2">Крути рулетку раз в 24 часа и забирай diddycoin.</div>
            <div className="mb-2">
              {canSpin ? (
                <span className="font-bold text-green-400">Доступно!</span>
              ) : (
                <span className="font-bold text-white">Следующая попытка через {timeLeft ? `${String(timeLeft.hours).padStart(2, "0")}:${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}` : "00:00:00"}</span>
              )}
            </div>
            <div className="text-gray-400 mb-4">Последний выигрыш: <span className="text-white font-bold">+{lastBonus} diddycoin</span></div>
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-center items-center">
                <div className="bg-[#15181F] rounded-full px-12 py-6 text-2xl font-bold text-white flex items-center gap-4">
                  <span className="text-blue-400">&#9654;</span>
                  {spinning ? <span className="animate-pulse">Крутим...</span> : `+${lastBonus} diddycoin` }
                  <span className="text-blue-400">&#9664;</span>
                </div>
              </div>
              <Button
                variant={canSpin && !spinning ? undefined : "ghost"}
                className={`${canSpin && !spinning ? "ml-8 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold" : "ml-8 px-8 py-3 rounded-lg bg-gray-700 text-gray-400 text-lg font-bold cursor-not-allowed"}`}
                onClick={handleSpin}
                disabled={!canSpin || spinning}
              >
                {spinning ? "Крутим..." : "Крутить"}
              </Button>
            </div>
          </Card>
        )}

        {/* Slot tab */}
        {activeTab === "Слот" && (
          <div className="mt-6">
            <SlotGame
              initialMainBalance={balance}
              onBalanceChange={(n) => {
                setBalance(n);
                if (typeof window !== 'undefined') localStorage.setItem('bonus_balance', String(n));
              }}
            />
          </div>
        )}
        </AnimatedPage>
      </main>
      <Footer />
    </div>
  );
}
