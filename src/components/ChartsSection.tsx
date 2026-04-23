import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Competitor } from "../data/dummyData";
import { Clock, Maximize, Lightbulb, Paintbrush } from "lucide-react";

interface Props {
  competitors: Competitor[];
  selectedIds: string[];
}

const COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"
];

function ChartCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-slate-100 rounded-lg">
          <Icon className="w-4 h-4 text-slate-600" />
        </div>
        <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function buildComparisonData(
  competitors: Competitor[],
  selectedIds: string[],
  dataKey: "length" | "dimension" | "concept" | "style"
) {
  const selected = competitors.filter((c) => selectedIds.includes(c.id));
  if (selected.length === 0) return [];

  const first = selected[0];
  const keys = first.chartData[dataKey].map((d) => d.name);

  return keys.map((name, idx) => {
    const row: Record<string, string | number> = { name };
    selected.forEach((comp) => {
      const item = comp.chartData[dataKey][idx];
      row[comp.name] = (item as any)?.value ?? (item as any)?.count ?? 0;
    });
    return row;
  });
}

export default function ChartsSection({ competitors, selectedIds }: Props) {
  const selectedCompetitors = competitors.filter((c) => selectedIds.includes(c.id));

  const lengthData = buildComparisonData(competitors, selectedIds, "length");
  const dimensionData = buildComparisonData(competitors, selectedIds, "dimension");
  const conceptData = buildComparisonData(competitors, selectedIds, "concept");
  const styleData = buildComparisonData(competitors, selectedIds, "style");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Length Analysis - Always Bar Chart */}
      <ChartCard title="Length Analysis" icon={Clock}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={lengthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
            />
            <Legend
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
            {selectedCompetitors.map((comp, idx) => (
              <Bar
                key={comp.id}
                dataKey={comp.name}
                fill={COLORS[idx % COLORS.length]}
                radius={[4, 4, 0, 0]}
                barSize={selectedCompetitors.length > 3 ? 10 : 16}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Dimension Analysis - Always Bar Chart */}
      <ChartCard title="Dimension Analysis" icon={Maximize}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={dimensionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
            />
            <Legend
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
            {selectedCompetitors.map((comp, idx) => (
              <Bar
                key={comp.id}
                dataKey={comp.name}
                fill={COLORS[idx % COLORS.length]}
                radius={[4, 4, 0, 0]}
                barSize={selectedCompetitors.length > 3 ? 10 : 16}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Ad Concept Bar Chart - Comparison */}
      <ChartCard title="Ad Concept Distribution" icon={Lightbulb}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={conceptData} layout="vertical" margin={{ left: 20, right: 20, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
            />
            <Legend
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
            {selectedCompetitors.map((comp, idx) => (
              <Bar
                key={comp.id}
                dataKey={comp.name}
                fill={COLORS[idx % COLORS.length]}
                radius={[0, 4, 4, 0]}
                barSize={selectedCompetitors.length > 3 ? 6 : 10}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Ad Style Bar Chart - Comparison */}
      <ChartCard title="Ad Style Distribution" icon={Paintbrush}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={styleData} layout="vertical" margin={{ left: 20, right: 20, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
            />
            <Legend
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
            {selectedCompetitors.map((comp, idx) => (
              <Bar
                key={comp.id}
                dataKey={comp.name}
                fill={COLORS[idx % COLORS.length]}
                radius={[0, 4, 4, 0]}
                barSize={selectedCompetitors.length > 3 ? 6 : 10}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
