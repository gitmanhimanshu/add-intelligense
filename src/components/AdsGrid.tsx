import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MousePointer, DollarSign, TrendingUp } from "lucide-react";
import type { Ad } from "../data/dummyData";

interface Props {
  ads: Ad[];
  loading: boolean;
  onAdClick: (ad: Ad) => void;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

function formatSpend(num: number): string {
  return "$" + num.toLocaleString();
}

export default function AdsGrid({ ads, loading, onAdClick }: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
            <div className="bg-slate-200 rounded-lg h-40 mb-3" />
            <div className="bg-slate-200 rounded h-4 w-3/4 mb-2" />
            <div className="flex gap-2">
              <div className="bg-slate-200 rounded h-3 w-16" />
              <div className="bg-slate-200 rounded h-3 w-16" />
              <div className="bg-slate-200 rounded h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Eye className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-lg font-medium">No ads found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {ads.map((ad) => (
          <motion.div
            key={ad.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => onAdClick(ad)}
            onMouseEnter={() => setHoveredId(ad.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`group bg-white rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 ${
              hoveredId === ad.id
                ? "border-indigo-300 shadow-lg shadow-indigo-100 -translate-y-1"
                : "border-slate-200 shadow-sm hover:shadow-md"
            }`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src={ad.thumbnail}
                alt={ad.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-medium text-slate-700">
                {ad.detail.length}
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-medium text-slate-800 text-sm mb-2 truncate group-hover:text-indigo-600 transition-colors">
                {ad.title}
              </h3>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{formatNumber(ad.impressions)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MousePointer className="w-3.5 h-3.5" />
                  <span>{ad.ctr}%</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{formatSpend(ad.spend)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">
                  {ad.detail.channel}
                </span>
                <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">
                  {ad.detail.style}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-600 ml-auto">
                  <TrendingUp className="w-3 h-3" />
                  +{ad.growth}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
