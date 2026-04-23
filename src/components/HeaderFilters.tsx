import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

interface Props {
  platform: string;
  onPlatformChange: (p: string) => void;
  os: "iOS" | "Android";
  onOsChange: (os: "iOS" | "Android") => void;
}

const platforms = ["All Platforms", "Instagram", "TikTok", "YouTube", "Facebook", "LinkedIn"];
const mediaTypes = ["All Media", "Video", "Image", "Carousel"];
const ugcTypes = ["All UGC", "Creator", "Influencer", "Customer"];

export default function HeaderFilters({
  platform,
  onPlatformChange,
  os,
  onOsChange,
}: Props) {
  const [media, setMedia] = useState("All Media");
  const [ugc, setUgc] = useState("All UGC");
  const [dateRange, setDateRange] = useState("Last 30 days");

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo only */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {/* Date Range */}
            <div className="relative hidden md:block">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 text-sm bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 12 months</option>
              </select>
              <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* OS Toggle */}
            <div className="flex bg-slate-100 rounded-lg p-0.5 shrink-0">
              <button
                onClick={() => onOsChange("iOS")}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  os === "iOS"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                iOS
              </button>
              <button
                onClick={() => onOsChange("Android")}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  os === "Android"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Android
              </button>
            </div>

            {/* Platform */}
            <div className="relative hidden lg:block">
              <select
                value={platform}
                onChange={(e) => onPlatformChange(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 text-sm bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Media */}
            <div className="relative hidden xl:block">
              <select
                value={media}
                onChange={(e) => setMedia(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 text-sm bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {mediaTypes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* UGC */}
            <div className="relative hidden xl:block">
              <select
                value={ugc}
                onChange={(e) => setUgc(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 text-sm bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {ugcTypes.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
