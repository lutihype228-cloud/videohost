import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";

interface Props {
  id: number;
  title: string;
  price: number;
  tag?: "IMG" | "GIF";
  image?: string;
  disabled?: boolean;
  onBuy?: (id: number) => void;
}

export default function ShopProductCard({ id, title, price, tag, image, disabled, onBuy }: Props) {
  return (
    <Card className="bg-[#161b22] border-[#30363d] rounded-2xl overflow-hidden shadow-sm">
      <div className="h-32 relative overflow-hidden">
        <img src={image} alt={title} loading="lazy" className="w-full h-32 object-cover rounded-t-2xl brightness-95" />
        {tag && (
          <div className="absolute top-3 right-3 bg-[#1b2430] text-xs text-gray-200 px-2 py-1 rounded-lg border border-[#2c3036]">
            {tag}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium text-sm">{title}</h3>
          <span className="text-teal-400 font-medium text-sm">{price}</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-[#0e1216] border-[#2a2f35] text-gray-300 hover:bg-[#15181b]"
            size="sm"
            onClick={() => onBuy && onBuy(id)}
            disabled={disabled}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Купить
          </Button>

          <button className="w-10 h-10 rounded-md bg-[#0d1114] border border-[#23272b] flex items-center justify-center text-gray-300 hover:bg-[#121316]">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
