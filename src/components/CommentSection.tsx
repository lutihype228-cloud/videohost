"use client";

import Image from "next/image";
import { Heart, Info } from "lucide-react";
import type { Comment } from "@/lib/data";

interface CommentSectionProps {
  comments: Comment[];
  totalCount: number;
}

export default function CommentSection({ comments, totalCount }: CommentSectionProps) {
  return (
    <div className="mt-8">
      {/* Header */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        Комментарии
        <span className="px-2 py-0.5 text-sm font-normal bg-secondary rounded-full">{totalCount}</span>
      </h3>

      {/* Login Prompt */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-[#1a1b26] mb-4">
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <span className="text-sm text-muted-foreground">Войдите в систему, чтобы оставлять комментарии</span>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-xl border border-border/40 hover:border-border transition-colors">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                <Image src={comment.author.avatar} alt={comment.author.name} fill className="object-cover" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-medium ${comment.author.verified ? "text-primary" : "text-white"}`}>
                    {comment.author.name}
                  </span>
                  {comment.author.verified && (
                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                </div>
                <p className="text-sm text-white/90">{comment.text}</p>

                {/* Actions */}
                <button type="button" className="flex items-center gap-1.5 mt-2 text-muted-foreground hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                  {comment.likes > 0 && (<span className="text-xs">{comment.likes}</span>)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
