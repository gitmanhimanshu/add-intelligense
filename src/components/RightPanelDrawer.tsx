import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Palette, Anchor, Target, Ruler, Clock, Share2, Play, ChevronDown } from "lucide-react";
import type { Ad, Competitor } from "../data/dummyData";
import { useState } from "react";

interface Props {
  ad: Ad | null;
  hookEndFilter: { type: "hook" | "end"; value: string } | null;
  allAds: Ad[];
  competitors: Competitor[];
  onClose: () => void;
  onAdClick: (ad: Ad) => void;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

const detailConfig = [
  { key: "channel" as const, label: "Channel", icon: Monitor },
  { key: "style" as const, label: "Style", icon: Palette },
  { key: "dimension" as const, label: "Dimension", icon: Ruler },
  { key: "length" as const, label: "Length", icon: Clock },
];

export default function RightPanelDrawer({ ad, hookEndFilter, allAds, competitors, onClose, onAdClick }: Props) {
  const isOpen = ad !== null || hookEndFilter !== null;
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("all");

  // Filter ads by hook or end
  const filteredAds = hookEndFilter
    ? allAds.filter((a) => {
        const matchesHookEnd = hookEndFilter.type === "hook"
          ? a.detail.hook === hookEndFilter.value
          : a.detail.end === hookEndFilter.value;
        
        const matchesCompetitor = selectedCompetitor === "all" 
          ? true 
          : competitors.find(c => c.id === selectedCompetitor)?.ads.some(ad => ad.id === a.id);
        
        return matchesHookEnd && matchesCompetitor;
      })
    : [];

  // Get competitor name from ad
  const getCompetitorName = (adId: number): string => {
    const competitor = competitors.find(c => c.ads.some(ad => ad.id === adId));
    return competitor?.name || "Unknown";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-semibold text-slate-800">
                {hookEndFilter
                  ? `Ads using ${hookEndFilter.type === "hook" ? "Hook" : "End"}: ${hookEndFilter.value}`
                  : "Ad Details"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              {hookEndFilter ? (
                // Show list of ads using this hook/end
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 mb-4">
                    Found {filteredAds.length} ads using this {hookEndFilter.type}
                  </p>
                  {filteredAds.map((filteredAd) => (
                    <div
                      key={filteredAd.id}
                      onClick={() => {
                        onAdClick(filteredAd);
                      }}
                      className="p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-24 h-18 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={filteredAd.thumbnail}
                            alt={filteredAd.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-800 text-sm mb-1 truncate group-hover:text-indigo-600 transition">
                            {filteredAd.title}
                          </h3>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">
                              {filteredAd.detail.channel}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-600">
                              {filteredAd.detail.style}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-slate-500">
                            <span>{formatNumber(filteredAd.impressions)} views</span>
                            <span>{filteredAd.ctr}% CTR</span>
                            <span className="text-emerald-600">+{filteredAd.growth}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : ad ? (
                // Show single ad details
                <>
                  {/* Thumbnail */}
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 mb-6">
                    <img
                      src={ad.thumbnail}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{ad.title}</h3>
                  <p className="text-sm text-slate-500 mb-6">ID: #{ad.id.toString().padStart(4, "0")}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Impressions</p>
                      <p className="text-sm font-semibold text-slate-800">{formatNumber(ad.impressions)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">CTR</p>
                      <p className="text-sm font-semibold text-slate-800">{ad.ctr}%</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-500 mb-1">Spend</p>
                      <p className="text-sm font-semibold text-slate-800">${ad.spend.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Hook Section */}
                  <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-amber-100 rounded-lg">
                        <Anchor className="w-4 h-4 text-amber-700" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-600 font-medium">Hook</p>
                        <p className="text-sm font-semibold text-amber-900">{ad.detail.hook}</p>
                      </div>
                    </div>
                    <p className="text-xs text-amber-700/80">The opening that grabs attention and pulls viewers in.</p>
                  </div>

                  {/* End Section */}
                  <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <Target className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 font-medium">End</p>
                        <p className="text-sm font-semibold text-emerald-900">{ad.detail.end}</p>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-700/80">The closing call-to-action that drives conversions.</p>
                  </div>

                  {/* Detail Cards */}
                  <div className="space-y-3 mb-6">
                    {detailConfig.map((item) => {
                      const Icon = item.icon;
                      const value = ad.detail[item.key];
                      return (
                        <div
                          key={item.key}
                          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-200 hover:shadow-sm transition"
                        >
                          <div className="p-2 bg-indigo-50 rounded-lg">
                            <Icon className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">{item.label}</p>
                            <p className="text-sm font-medium text-slate-800">{value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Channels */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Share2 className="w-4 h-4 text-slate-500" />
                      <h4 className="text-sm font-semibold text-slate-700">Channels</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ad.detail.channels.map((ch) => (
                        <span
                          key={ch}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
