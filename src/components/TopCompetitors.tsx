import { useState, useRef } from "react";
import { DollarSign, Download, Smartphone, Search, ChevronLeft, ChevronRight, Check, Plus } from "lucide-react";
import type { Competitor } from "../data/dummyData";

interface Props {
  competitors: Competitor[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

function formatSpend(num: number): string {
  return "$" + num.toLocaleString();
}

export default function TopCompetitors({ competitors, selectedIds, onToggle }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredCompetitors = competitors.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Top Competitors</h2>
          <p className="text-sm text-slate-500">
            Identify and analyze the leading competitors in your industry based on key metrics and performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm hover:shadow-md">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Competitor</span>
          </button>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition w-48"
            />
          </div>
        </div>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur shadow-md border border-slate-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur shadow-md border border-slate-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth" dir="rtl">
          {filteredCompetitors.map((comp) => {
            const isSelected = selectedIds.includes(comp.id);
            return (
              <button
                key={comp.id}
                onClick={() => onToggle(comp.id)}
                className={`flex-shrink-0 w-44 p-4 rounded-xl border text-left transition-all duration-200 relative ${
                  isSelected
                    ? "bg-blue-50 border-blue-400 shadow-md ring-1 ring-blue-300"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center mb-3">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="w-14 h-14 rounded-xl object-cover mb-2"
                  />
                  <h3 className={`text-sm font-semibold text-center leading-tight ${isSelected ? "text-blue-800" : "text-slate-800"}`}>
                    {comp.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${isSelected ? "bg-blue-100/50" : "bg-slate-50"}`}>
                    <DollarSign className={`w-3 h-3 ${isSelected ? "text-blue-600" : "text-slate-500"}`} />
                    <span className={isSelected ? "text-blue-700 font-medium" : "text-slate-600"}>
                      {formatSpend(comp.totalSpend)}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${isSelected ? "bg-blue-100/50" : "bg-slate-50"}`}>
                    <Download className={`w-3 h-3 ${isSelected ? "text-blue-600" : "text-slate-500"}`} />
                    <span className={isSelected ? "text-blue-700 font-medium" : "text-slate-600"}>
                      {formatNumber(comp.downloads)}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${isSelected ? "bg-blue-100/50" : "bg-slate-50"}`}>
                    <Smartphone className={`w-3 h-3 ${isSelected ? "text-blue-600" : "text-slate-500"}`} />
                    <span className={isSelected ? "text-blue-700 font-medium" : "text-slate-600"}>
                      {comp.os}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
