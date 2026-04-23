import { useState } from "react";
import { TrendingUp, Lightbulb, Layers, Eye, Play, ArrowRight, ChevronDown } from "lucide-react";
import type { Ad } from "../data/dummyData";
import { hookEndSequenceVideos, sequenceData, competitors } from "../data/dummyData";

interface Props {
  ads: Ad[];
  onAdClick: (ad: Ad) => void;
  onHookEndClick: (type: "hook" | "end", value: string) => void;
}

type TabType = "hook" | "end" | "sequence";

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

export default function TopCards({ ads, onAdClick, onHookEndClick }: Props) {
  const [tab, setTab] = useState<TabType>("sequence");
  const [selectedCompetitorFilter, setSelectedCompetitorFilter] = useState<string>("all");

  const topPerforming = [...ads].sort((a, b) => b.impressions - a.impressions).slice(0, 10);
  const topGrowth = [...ads].sort((a, b) => b.growth - a.growth).slice(0, 10);
  const topLearn = [...ads].sort((a, b) => b.ctr - a.ctr).slice(0, 10);

  // Filter videos by competitor
  const filteredVideos = hookEndSequenceVideos.filter((v) => {
    const matchesType = v.type === tab;
    const matchesCompetitor = selectedCompetitorFilter === "all" || v.competitorId === selectedCompetitorFilter;
    return matchesType && matchesCompetitor;
  });

  // Filter sequences by competitor
  const filteredSequences = sequenceData.filter((seq) => {
    return selectedCompetitorFilter === "all" || seq.competitorId === selectedCompetitorFilter;
  });

  // Find the actual ad related to hook/end video
  const findRelatedAd = (relatedAdId: number, competitorId: string): Ad | null => {
    const competitor = competitors.find(c => c.id === competitorId);
    if (!competitor) return null;
    return competitor.ads.find(ad => ad.id === relatedAdId) || null;
  };

  const handleVideoClick = (video: typeof hookEndSequenceVideos[0]) => {
    const relatedAd = findRelatedAd(video.relatedAdId, video.competitorId);
    if (relatedAd) {
      onAdClick(relatedAd);
    }
  };

  const handleHookEndNameClick = (e: React.MouseEvent, video: typeof hookEndSequenceVideos[0]) => {
    e.stopPropagation(); // Prevent video click
    onHookEndClick(video.type, video.title);
  };

  const handleSequenceClick = (seq: typeof sequenceData[0]) => {
    const relatedAd = findRelatedAd(seq.hookAdId, seq.competitorId);
    if (relatedAd) {
      onAdClick(relatedAd);
    }
  };

  const AdListCard = ({
    title,
    subtitle,
    icon: Icon,
    bgColor,
    textColor,
    data,
  }: {
    title: string;
    subtitle: string;
    icon: React.ElementType;
    bgColor: string;
    textColor: string;
    data: Ad[];
  }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[420px]">
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <div className={`p-1.5 ${bgColor} rounded-lg`}>
            <Icon className={`w-4 h-4 ${textColor}`} />
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        </div>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {data.map((ad, idx) => (
          <div
            key={ad.id}
            onClick={() => onAdClick(ad)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
          >
            <span className="text-xs font-medium text-slate-400 w-4">{idx + 1}</span>
            <div className="relative w-12 h-10 rounded overflow-hidden shrink-0">
              <img src={ad.thumbnail} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-700 truncate group-hover:text-indigo-600 transition">{ad.title}</p>
              <p className="text-[10px] text-slate-500">
                {title.includes("Performing") && `${formatNumber(ad.impressions)} impressions`}
                {title.includes("Growth") && `+${ad.growth}% growth`}
                {title.includes("Learn") && `${ad.ctr}% CTR`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Row 1: Three ad cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdListCard
          title="Top 10 Performing Ads"
          subtitle="By impressions"
          icon={Eye}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          data={topPerforming}
        />
        <AdListCard
          title="Top 10 Growth Ads"
          subtitle="By growth rate"
          icon={TrendingUp}
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
          data={topGrowth}
        />
        <AdListCard
          title="Top 10 Learn Ads"
          subtitle="By CTR performance"
          icon={Lightbulb}
          bgColor="bg-amber-50"
          textColor="text-amber-600"
          data={topLearn}
        />
      </div>

      {/* Row 2: Full width Hook / End / Sequence */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-violet-50 rounded-lg">
                <Layers className="w-4 h-4 text-violet-600" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">Top Hook / End / Sequence</h3>
            </div>
            {/* Competitor Filter */}
            <div className="relative">
              <select
                value={selectedCompetitorFilter}
                onChange={(e) => setSelectedCompetitorFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 text-xs bg-slate-100 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium text-slate-700"
              >
                <option value="all">All Competitors</option>
                {competitors.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
            </div>
          </div>
          <p className="text-xs text-slate-500">Video analysis & sequences</p>
        </div>
        <div className="px-4 pt-3">
          <div className="flex gap-1">
            {(["hook", "end", "sequence"] as TabType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition capitalize ${
                  tab === t
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 max-h-[520px] overflow-y-auto">
          {tab === "sequence" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredSequences.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-sm text-slate-400">No sequences found for selected competitor</p>
                </div>
              ) : (
                filteredSequences.map((seq) => {
                  const competitor = competitors.find(c => c.id === seq.competitorId);
                  return (
                    <div
                      key={seq.id}
                      onClick={() => handleSequenceClick(seq)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition bg-white cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                        <img src={seq.thumbnail} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                        <div className="absolute bottom-1.5 right-1.5 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
                          {seq.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-medium">{seq.hookType}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-medium">{seq.endType}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-700 mb-1">{seq.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-slate-500">{formatNumber(seq.views)} views</p>
                        {competitor && (
                          <p className="text-[10px] text-indigo-600 font-medium">{competitor.name}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredVideos.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-sm text-slate-400">No {tab}s found for selected competitor</p>
                </div>
              ) : (
                filteredVideos.map((video) => {
                  const competitor = competitors.find(c => c.id === video.competitorId);
                  const relatedAd = findRelatedAd(video.relatedAdId, video.competitorId);
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleVideoClick(video)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition bg-white cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                        <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                        <div className="absolute bottom-1.5 right-1.5 bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
                          {video.duration}
                        </div>
                      </div>
                      <p 
                        onClick={(e) => handleHookEndNameClick(e, video)}
                        className="text-xs font-medium text-slate-700 mb-1 hover:text-indigo-600 transition cursor-pointer"
                      >
                        {video.title}
                      </p>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] text-slate-500">{formatNumber(video.views)} views</p>
                        {competitor && (
                          <p className="text-[10px] text-indigo-600 font-medium">{competitor.name}</p>
                        )}
                      </div>
                      {relatedAd && (
                        <p className="text-[10px] text-slate-400 truncate">From: {relatedAd.title}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
