"use client";

import Link from "next/link";
import { StatusIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f18]">
      {/* Thin gradient accent at the very top of the footer */}
      <div className="h-[4px] w-full bg-gradient-to-r from-[#17b4a1] via-[#1d8a7d] to-[#5f6acb]" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          {/* Left: Logo + title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#17b4a1] flex items-center justify-center text-[#0e1520] text-sm">🥑</div>
            <span className="text-base font-semibold text-white">DIDDYDIDDY</span>
          </div>
          {/* Center: copyright & links (centered) */}
          <div className="text-center text-xs text-gray-400">
            <span>© 2026 DIDDYDIDDY</span>
            <Link href="/tos" className="hover:text-gray-300 transition-colors underline">terms of service</Link>
            <span className="mx-2">•</span>
            <a href="https://twitch.tv/guacamolemolly" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors underline">sponsored by guacamolemolly</a>
            <span className="mx-2">•</span>
            <span className="hover:text-gray-300 transition-colors underline cursor-pointer">powered by cocucku_13</span>
          </div>

          {/* Right: action buttons aligned to the right */}
          <div className="flex justify-end items-center gap-3">
            <a href="https://status.gvakamole.com/status/gvakamole/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white rounded-full border border-[#2b3240] hover:border-[#17b4a1] hover:text-[#17b4a1] transition-colors">
              <StatusIcon />
              Статус
            </a>
            <Link href="/ideas" className="px-3 py-1.5 text-sm font-medium text-white rounded-full border border-[#2b3240] hover:border-[#5f6acb] hover:text-[#5f6acb] transition-colors">Идеи</Link>
            <button type="button" className="px-3 py-1.5 text-sm font-medium text-white rounded-full border border-[#17b4a1] hover:bg-[#17b4a1]/10 hover:text-[#17b4a1] transition-colors">Связаться</button>
          </div>
        </div>

        {/* Mobile: show links stacked below */}
            <div className="mt-3 md:hidden text-xs text-gray-400 text-center">© 2026 DIDDYDIDDY • terms of service • sponsored by guacamolemolly • powered by cocucku_13</div>
      </div>
    </footer>
  );
}
