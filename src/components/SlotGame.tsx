"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const SYMBOLS = ["🍒", "🍋", "🔔", "💎", "🍀", "🔥", "🎰", "👑"];

function randSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export default function SlotGame({ initialMainBalance, onBalanceChange }: { initialMainBalance?: number; onBalanceChange?: (n: number) => void; }) {
  const [mainBalance, setMainBalance] = useState(initialMainBalance ?? 1120);
  const [slotBalance, setSlotBalance] = useState(0);
  const [depositValue, setDepositValue] = useState(100);
  const [bet, setBet] = useState(10);

  // sync initial balance when prop changes
  const syncingFromProp = useRef(false);

  React.useEffect(() => {
    if (typeof initialMainBalance === "number") {
      syncingFromProp.current = true;
      setMainBalance(initialMainBalance);
      // reset syncing flag on next microtask
      Promise.resolve().then(() => {
        syncingFromProp.current = false;
      });
    }
  }, [initialMainBalance]);

  // inform parent when mainBalance changes (but not when we're syncing from prop)
  React.useEffect(() => {
    if (typeof onBalanceChange === "function" && !syncingFromProp.current) {
      onBalanceChange(mainBalance);
    }
  }, [mainBalance, onBalanceChange]);
  // isActive - slot UI opened; isSpinning - a spin is currently running
  const [isActive, setIsActive] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [board, setBoard] = useState(() => Array.from({ length: 5 }, () => Array.from({ length: 3 }, randSymbol)));
  const [message, setMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<{ nick: string; x: string; win: number }[]>([
    { nick: "Kevler", x: "73.05x", win: 731 },
    { nick: "Kevler", x: "48.55x", win: 486 },
    { nick: "wiqy", x: "28.55x", win: 286 },
  ]);
  const spinTimeout = useRef<number | null>(null);

  function deposit(amount: number) {
    if (amount <= 0) return;
    if (amount > mainBalance) {
      setMessage("Недостаточно средств на основном балансе");
      return;
    }
    setMainBalance((s) => {
      const next = s - amount;
      return next;
    });
    setSlotBalance((s) => s + amount);
    setMessage(null);
  }

  function withdraw(amount: number) {
    if (amount <= 0) return;
    if (amount > slotBalance) {
      setMessage("Недостаточно средств в слоте");
      return;
    }
    setSlotBalance((s) => s - amount);
    setMainBalance((s) => {
      const next = s + amount;
      return next;
    });
    setMessage(null);
  }

  function startSpin() {
    if (isSpinning) return;
    if (bet <= 0) {
      setMessage("Выберите ставку");
      return;
    }
    if (slotBalance < bet) {
      setMessage("Пополните баланс слота");
      return;
    }

    setMessage(null);
    setIsSpinning(true);
    setSlotBalance((s) => s - bet);

    // quick animation: randomize board frequently then stop columns sequentially
    const finalBoard: string[][] = Array.from({ length: 5 }, () => Array.from({ length: 3 }, randSymbol));

    let steps = 0;
    const interval = window.setInterval(() => {
      setBoard((_) => Array.from({ length: 5 }, () => Array.from({ length: 3 }, randSymbol)));
      steps++;
      if (steps > 12) {
        window.clearInterval(interval);
        // stop columns one by one
        let col = 0;
        const stopInterval = window.setInterval(() => {
          setBoard((cur) => {
            const next = cur.map((c, i) => (i === col ? finalBoard[i] : c));
            return next;
          });
          col++;
          if (col >= 5) {
            window.clearInterval(stopInterval);
            finishSpin(finalBoard);
          }
        }, 250);
      }
    }, 80);
    spinTimeout.current = interval;
  }

  function finishSpin(finalBoard: string[][]) {
    // simple win check: if any column has 3 equal symbols -> reward
    const winningColumns = finalBoard.filter((col) => col.every((s) => s === col[0]));
    let reward = 0;
    if (winningColumns.length > 0) {
      // reward based on how many columns matched
      const multiplier = 5 * winningColumns.length;
      reward = bet * multiplier;
      setSlotBalance((s) => s + reward);
      setHistory((h) => [{ nick: "you", x: `${multiplier}x`, win: reward }, ...h].slice(0, 10));
      setMessage(`Вы выиграли ${reward} (x${multiplier})`);
    } else {
      // small random chance of winning
      const chance = Math.random();
      if (chance > 0.97) {
        reward = bet * (2 + Math.floor(Math.random() * 5));
        setSlotBalance((s) => s + reward);
        setHistory((h) => [{ nick: "you", x: `+${reward}`, win: reward }, ...h].slice(0, 10));
        setMessage(`Удача! Вы получили случайный выигрыш ${reward}`);
      } else {
        setMessage("К сожалению, ничего не выиграли");
      }
    }
    // persist main balance and inform parent if slot balance was converted back
    setIsSpinning(false);
  }

  function closeSlot() {
    // reset some state
    setIsActive(false);
    setIsSpinning(false);
    setMessage(null);
    if (spinTimeout.current) {
      window.clearInterval(spinTimeout.current as number);
      spinTimeout.current = null;
    }
  }

  return (
    <div className="w-full">
      {/* Header + balances */}
      <Card className="bg-[#161a20] border-[#2d3339] p-6 mb-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Основной баланс</p>
            <div className="mt-2 text-3xl font-bold text-white flex items-center gap-3">{mainBalance.toFixed(2)} <span className="text-sm text-gray-400">diddycoin</span></div>

            <div className="mt-4">
              <div className="flex gap-2 items-center">
                <Input
                  value={String(depositValue)}
                  onChange={(e) => setDepositValue(Number(e.target.value || 0))}
                  className="max-w-xs bg-[#0e1216] border-[#2a2f35] text-white"
                />
                <Button variant="outline" onClick={() => deposit(depositValue)} className="bg-[#0e1216] border-[#2a2f35]">
                  Пополнить слот
                </Button>
                <div className="ml-4 flex gap-2">
                  {[500, 1000, 2000].map((v) => (
                    <Button key={v} onClick={() => deposit(v)} size="sm" className="bg-[#0e1216] border-[#2a2f35]">
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Баланс слота</p>
                <div className="mt-2 text-3xl font-bold text-white">{slotBalance.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <Button variant="outline" onClick={() => withdraw(slotBalance > 0 ? slotBalance : 0)} className="bg-[#0e1216] border-[#2a2f35]">
                  Вывести из слота
                </Button>
                <div className="mt-2 flex gap-2 justify-end">
                  {[100, 500, 1000].map((v) => (
                    <Button key={v} size="sm" onClick={() => withdraw(v)} className="bg-[#0e1216] border-[#2a2f35]">
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Launch / Intro */}
      {!isActive && (
        <Card className="bg-gradient-to-r from-[#6d8aff] to-[#9b5bd3] p-10 rounded-2xl text-center mb-6">
          <div className="text-3xl md:text-4xl font-semibold text-white">Нажмите кнопку ниже, чтобы начать игру</div>
          <div className="mt-6">
            <Button size="lg" onClick={() => setIsActive(true)} className="bg-white text-black px-8 py-3">
              Запустить
            </Button>
          </div>
        </Card>
      )}

      {/* Game Area */}
      {isActive && (
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-[#0b1014] border border-[#22303a] p-6 rounded-2xl relative">
              <div className="grid grid-cols-5 gap-3">
                {board.map((col, ci) => (
                  <div key={ci} className="bg-[#071018] rounded-lg p-2">
                    {col.map((s, ri) => (
                      <div key={ri} className="h-20 flex items-center justify-center text-2xl bg-[#0e1418] rounded mb-2">{s}</div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">Баланс слота</div>
                  <div className="text-lg font-semibold text-white">{slotBalance.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => setBet((b) => Math.max(1, b - 1))} className="bg-[#0e1216] border-[#2a2f35]">-</Button>

                  <Input
                    type="number"
                    value={String(bet)}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setBet(Number.isFinite(v) ? Math.max(1, Math.floor(v)) : 1);
                    }}
                    onBlur={() => setBet((b) => Math.max(1, Math.floor(b)))}
                    className="w-20 text-center bg-[#0e1216] border-[#2a2f35] text-white"
                  />

                  <Button variant="outline" size="sm" onClick={() => setBet((b) => b + 1)} className="bg-[#0e1216] border-[#2a2f35]">+</Button>
                </div>

                <div>
                  <button onClick={startSpin} disabled={isSpinning} className="w-20 h-20 rounded-full bg-blue-500 text-white text-lg font-bold hover:scale-105 transition-transform">
                    СПИН
                  </button>
                </div>
              </div>

              {message && <div className="mt-4 text-sm text-teal-300">{message}</div>}
            </div>
          </div>

          <div className="w-80">
            <Card className="bg-gradient-to-r from-[#6d8aff] to-[#9b5bd3] p-4 rounded-2xl">
              <h4 className="text-white font-semibold">Топ выигрышей за 24 часа</h4>
              <div className="mt-3 bg-[#071018] rounded p-3 max-h-[400px] overflow-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-400">
                      <th className="w-6">#</th>
                      <th>Никнейм</th>
                      <th className="text-right">x</th>
                      <th className="text-right">Выигрыш</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, idx) => (
                      <tr key={idx} className="border-b border-[#0e1820] text-gray-200">
                        <td className="py-2">{idx + 1}</td>
                        <td>{h.nick}</td>
                        <td className="text-right text-teal-300">{h.x}</td>
                        <td className="text-right">{h.win}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-gray-300">Топ-10 выигрышей за 24 часа • Клик для просмотра реплея</div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
