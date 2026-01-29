"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate auth and create a sample user in localStorage
    const sampleUser = {
      username: "user",
      joinedMonths: 2,
      online: true,
      files: 0,
      likes: 0,
      views: 0,
      achievements: {
        total: 19,
        unlocked: 0,
      },
    };
    localStorage.setItem("user", JSON.stringify(sampleUser));
    // small delay to feel like a login
    setTimeout(() => {
      setLoading(false);
      router.push(`/users/${sampleUser.username}`);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <AnimatedPage>
        <div className="w-full max-w-md p-8 bg-[#0f1418] rounded-2xl border border-[#272b30]">
          <h1 className="text-2xl font-bold text-white mb-4">Вход</h1>
          <p className="text-gray-400 mb-6">Нажмите кнопку ниже, чтобы войти тестовым пользователем и посмотреть профиль.</p>
          <Button onClick={handleLogin} className="w-full" disabled={loading}>
            {loading ? "Вхожу..." : "Войти"}
          </Button>
        </div>
      </AnimatedPage>
    </div>
  );
}
