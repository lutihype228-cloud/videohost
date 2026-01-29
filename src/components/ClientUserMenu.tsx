"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientUserMenu() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {}
  }, []);

  if (!user) {
    return (
      <Link
        href="/auth"
        className="px-4 py-2 text-sm font-medium text-[#0e1520] bg-[#17b4a1] rounded-lg hover:bg-[#15a392] transition-colors btn-animate"
      >
        Войти
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href={`/users/${user.username}`} className="px-3 py-2 text-sm font-medium rounded-lg bg-[#161b22] text-white">{user.username}</Link>
      <button
        type="button"
        className="px-3 py-2 text-sm font-medium text-gray-300 bg-[#272b30] rounded-lg"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        Выйти
      </button>
    </div>
  );
}
