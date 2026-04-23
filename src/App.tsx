import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderFilters from "./components/HeaderFilters";
import TopCompetitors from "./components/TopCompetitors";
import TopCards from "./components/TopCards";
import RightPanelDrawer from "./components/RightPanelDrawer";
import ChartsSection from "./components/ChartsSection";
import { competitors, type Ad } from "./data/dummyData";

type MainTab = "ad-intelligence" | "channel-strategy" | "ftue" | "app-store-optimization";
type SubTab = "listing" | "graph";

const mainTabs = [
  { id: "ad-intelligence" as MainTab, label: "Ad Intelligence" },
  { id: "channel-strategy" as MainTab, label: "Channel Specific Strategy" },
  { id: "ftue" as MainTab, label: "FTUE" },
  { id: "app-store-optimization" as MainTab, label: "App Store Optimization" },
];

function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-32"
    >
      <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Coming Soon</h2>
      <p className="text-slate-500 max-w-sm text-center">
        This feature is currently under development. Check back later for updates.
      </p>
    </motion.div>
  );
}

export default function App() {
  const [mainTab, setMainTab] = useState<MainTab>("ad-intelligence");
  const [subTab, setSubTab] = useState<SubTab>("listing");
  const [platform, setPlatform] = useState("All Platforms");
  const [os, setOs] = useState<"iOS" | "Android">("iOS");
  const [selectedIds, setSelectedIds] = useState<string[]>(["my-brand"]);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [hookEndFilter, setHookEndFilter] = useState<{ type: "hook" | "end"; value: string } | null>(null);

  const toggleCompetitor = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const handleHookEndClick = (type: "hook" | "end", value: string) => {
    setHookEndFilter({ type, value });
    setSelectedAd(null);
  };

  const handleCloseDrawer = () => {
    setSelectedAd(null);
    setHookEndFilter(null);
  };

  // Listing ads: ALL competitors combined, filtered by OS and platform only
  const listingAds = useMemo(() => {
    let result: Ad[] = [];
    competitors.forEach((comp) => {
      if (os === "iOS" && comp.os !== "iOS") return;
      if (os === "Android" && comp.os !== "Android") return;
      result = [...result, ...comp.ads];
    });

    if (platform !== "All Platforms") {
      result = result.filter((ad) =>
        ad.detail.channels.some((ch) => ch.toLowerCase() === platform.toLowerCase())
      );
    }

    return result;
  }, [platform, os]);

  // All ads without any filters (for hook/end filtering)
  const allAdsUnfiltered = useMemo(() => {
    let result: Ad[] = [];
    competitors.forEach((comp) => {
      result = [...result, ...comp.ads];
    });
    return result;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Filter Bar */}
      <HeaderFilters
        platform={platform}
        onPlatformChange={setPlatform}
        os={os}
        onOsChange={setOs}
      />

      {/* Light Themed Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setMainTab(tab.id);
                  setSubTab("listing");
                }}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition whitespace-nowrap ${
                  mainTab === tab.id
                    ? "text-indigo-700 bg-indigo-50"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.label}
                {mainTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <AnimatePresence mode="wait">
          {mainTab === "ad-intelligence" ? (
            <motion.div
              key="ad-intelligence"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Sub Tabs: Listing / Graph */}
              <div className="flex gap-2 border-b border-slate-200">
                <button
                  onClick={() => setSubTab("listing")}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition border-b-2 ${
                    subTab === "listing"
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Listing
                </button>
                <button
                  onClick={() => setSubTab("graph")}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition border-b-2 ${
                    subTab === "graph"
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Graph
                </button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                {subTab === "listing" ? (
                  <motion.div
                    key="listing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TopCards ads={listingAds} onAdClick={setSelectedAd} onHookEndClick={handleHookEndClick} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="graph"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Top Competitors only in Graph view */}
                    <TopCompetitors
                      competitors={competitors}
                      selectedIds={selectedIds}
                      onToggle={toggleCompetitor}
                    />
                    <ChartsSection competitors={competitors} selectedIds={selectedIds} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="coming-soon"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ComingSoon />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Right Panel Drawer */}
      <RightPanelDrawer 
        ad={selectedAd} 
        hookEndFilter={hookEndFilter}
        allAds={allAdsUnfiltered}
        competitors={competitors}
        onClose={handleCloseDrawer}
        onAdClick={setSelectedAd}
      />
    </div>
  );
}
