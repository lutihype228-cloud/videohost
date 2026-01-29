"use client";
import React, { useState, useEffect } from "react";
import AnimatedPage from "@/components/AnimatedPage";

const BONUS_MIN = 50;
const BONUS_MAX = 200;
const BONUS_INTERVAL = 24 * 60 * 60 * 1000; // 24 часа

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

const BonusPage = () => {
  const [balance, setBalance] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("bonus_balance") || 1120);
    }
    return 1120;
  });
  const [lastClaim, setLastClaim] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("bonus_lastClaim") || 0);
    }
    return 0;
  });
  const [lastBonus, setLastBonus] = useState(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("bonus_lastBonus") || 100);
    }
    return 100;
  });
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(lastClaim));
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(lastClaim));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastClaim]);

  const canSpin = !timeLeft;

  const handleSpin = () => {
    if (!canSpin) return;
    setSpinning(true);
    setTimeout(() => {
      const bonus = getRandomBonus();
      setBalance((b) => {
        localStorage.setItem("bonus_balance", String(b + bonus));
        return b + bonus;
      });
      setLastClaim(() => {
        localStorage.setItem("bonus_lastClaim", String(Date.now()));
        return Date.now();
      });
      setLastBonus(() => {
        localStorage.setItem("bonus_lastBonus", String(bonus));
        return bonus;
      });
      setSpinning(false);
    }, 1200);
  };

  // support manual reset via ?resetBonus=1 (no UI button)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("resetBonus") === "1") {
        localStorage.setItem("bonus_lastClaim", "0");
        setLastClaim(0);
        setTimeLeft(getTimeLeft(0));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AnimatedPage>
        <h1 className="text-4xl font-bold mb-8">Магазин</h1>
        <nav className="flex gap-8 mb-8 text-lg">
          <a href="/shop" className="text-gray-400 hover:text-white">Никнейм</a>
          <a href="/shop?page=profile" className="text-gray-400 hover:text-white">Профиль</a>
          <a href="/shop/bonus" className="text-white border-b-2 border-blue-500 pb-1">Бонус</a>
          <a href="/shop?page=slot" className="text-gray-400 hover:text-white">Слот</a>
        </nav>
        <div className="bg-[#181C23] rounded-2xl p-8 flex justify-between items-center mb-8">
          <div>
            <div className="text-xs text-gray-400 mb-1">ВАШ БАЛАНС</div>
            <div className="text-3xl font-bold text-green-400">{balance} <span className="text-base font-normal text-gray-400">diddycoin</span></div>
            <button className="ml-4 px-4 py-1 text-xs border border-cyan-700 rounded-lg text-cyan-400 hover:bg-cyan-900/20">Как получить?</button>
          </div>
        <div className="flex-1 ml-12">
          <div className="text-xs text-gray-400 mb-1">КОЛЛЕКЦИЯ СТИЛЕЙ</div>
          <div className="font-bold text-white mb-1">Собрано 0 из 3 стиля</div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-1">
            <div className="h-2 bg-gray-400 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="text-xs text-gray-400">Осталось собрать 3 стиля.</div>
        </div>
      </div>
      <div className="bg-[#181C23] rounded-2xl p-8 mt-8">
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
              {spinning ? <span className="animate-pulse">...</span> : `+${lastBonus} diddycoin` }
              <span className="text-blue-400">&#9664;</span>
            </div>
          </div>
          <button
            className={`ml-8 px-8 py-3 rounded-lg ${canSpin && !spinning ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" : "bg-gray-700 text-gray-400 cursor-not-allowed"} text-lg font-bold`}
            onClick={handleSpin}
            disabled={!canSpin || spinning}
          >
            {spinning ? "Крутим..." : "Крутить"}
          </button>
        </div>
      </div>
      </AnimatedPage>
    </div>
  );
};

export default BonusPage;
