export interface AdDetail {
  channel: string;
  style: string;
  hook: string;
  end: string;
  channels: string[];
  dimension: string;
  length: string;
  videoUrl?: string;
}

export interface Ad {
  id: number;
  title: string;
  thumbnail: string;
  impressions: number;
  ctr: number;
  spend: number;
  growth: number;
  detail: AdDetail;
}

export interface Competitor {
  id: string;
  name: string;
  logo: string;
  totalSpend: number;
  downloads: number;
  os: "iOS" | "Android";
  ads: Ad[];
  chartData: {
    length: { name: string; value: number }[];
    dimension: { name: string; value: number }[];
    concept: { name: string; count: number }[];
    style: { name: string; count: number }[];
  };
}

const competitorLogos: Record<string, string> = {
  "my-brand": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
  "age-of-origins": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop",
  "candy-crush": "https://images.unsplash.com/photo-1560167016-022b78a0258e?w=100&h=100&fit=crop",
  "cash-frenzy": "https://images.unsplash.com/photo-1516876437184-593fda40c8cb?w=100&h=100&fit=crop",
  "cash-tornado": "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=100&h=100&fit=crop",
  "coin-master": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100&h=100&fit=crop",
  "dice-dreams": "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=100&h=100&fit=crop",
  "doubledown": "https://images.unsplash.com/photo-1596838333650-52b0c16a7b5f?w=100&h=100&fit=crop",
};

function makeAd(id: number, _competitorId: string, title: string, thumbnail: string, impressions: number, ctr: number, spend: number, growth: number, channel: string, style: string, hook: string, end: string, dimension: string, length: string): Ad {
  return {
    id,
    title,
    thumbnail,
    impressions,
    ctr,
    spend,
    growth,
    detail: {
      channel,
      style,
      hook,
      end,
      channels: [channel, channel === "Instagram" ? "Facebook" : "Instagram"],
      dimension,
      length,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
  };
}

export const competitors: Competitor[] = [
  {
    id: "my-brand",
    name: "My Brand",
    logo: competitorLogos["my-brand"],
    totalSpend: 125000000,
    downloads: 24500000,
    os: "iOS",
    ads: [
      makeAd(101, "my-brand", "Summer Sale Explosion", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop", 2450000, 3.2, 45000, 24.5, "Instagram", "UGC", "Problem-solution", "Strong CTA", "9:16", "30s"),
      makeAd(102, "my-brand", "Fitness Challenge 2025", "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", 1890000, 2.8, 32000, 18.2, "TikTok", "Testimonial", "Before/After", "Swipe Up", "9:16", "15s"),
      makeAd(103, "my-brand", "Smart Home Revolution", "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop", 1560000, 4.1, 28000, 32.1, "YouTube", "Product Demo", "Shocking Stat", "Learn More", "16:9", "60s"),
      makeAd(104, "my-brand", "Travel the World Cheap", "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop", 1340000, 2.4, 21000, 12.8, "Facebook", "Vlog", "Storytelling", "Shop Now", "4:5", "45s"),
      makeAd(105, "my-brand", "Learn Coding in 30 Days", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop", 1120000, 3.7, 19000, 28.4, "YouTube", "Tutorial", "Question", "Sign Up", "16:9", "30s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 35 },
        { name: "30s", value: 28 },
        { name: "45s", value: 18 },
        { name: "60s", value: 12 },
        { name: ">60s", value: 7 },
      ],
      dimension: [
        { name: "1:1", value: 22 },
        { name: "4:5", value: 18 },
        { name: "9:16", value: 45 },
        { name: "16:9", value: 15 },
      ],
      concept: [
        { name: "Problem-Solution", count: 42 },
        { name: "Testimonial", count: 35 },
        { name: "How-To", count: 28 },
        { name: "Storytelling", count: 24 },
        { name: "Comparison", count: 18 },
        { name: "FOMO", count: 15 },
      ],
      style: [
        { name: "UGC", count: 55 },
        { name: "Product Demo", count: 38 },
        { name: "Lifestyle", count: 32 },
        { name: "Tutorial", count: 26 },
        { name: "Review", count: 20 },
        { name: "Vlog", count: 14 },
      ],
    },
  },
  {
    id: "age-of-origins",
    name: "Age of Origins",
    logo: competitorLogos["age-of-origins"],
    totalSpend: 40038031,
    downloads: 4615048,
    os: "Android",
    ads: [
      makeAd(201, "age-of-origins", "Build Your Empire", "https://images.unsplash.com/photo-1542259681-d4cd3839ae81?w=400&h=300&fit=crop", 3200000, 2.9, 52000, 15.3, "Facebook", "UGC", "Problem-solution", "Strong CTA", "9:16", "30s"),
      makeAd(202, "age-of-origins", "Zombie Defense", "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=400&h=300&fit=crop", 2100000, 3.5, 38000, 22.1, "Instagram", "Product Demo", "Shocking Stat", "Download", "9:16", "15s"),
      makeAd(203, "age-of-origins", "Alliance Wars", "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop", 1800000, 2.1, 29000, 8.7, "TikTok", "Hype", "FOMO", "Play Now", "9:16", "30s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 25 },
        { name: "30s", value: 35 },
        { name: "45s", value: 22 },
        { name: "60s", value: 15 },
        { name: ">60s", value: 3 },
      ],
      dimension: [
        { name: "1:1", value: 15 },
        { name: "4:5", value: 25 },
        { name: "9:16", value: 50 },
        { name: "16:9", value: 10 },
      ],
      concept: [
        { name: "Problem-Solution", count: 30 },
        { name: "Testimonial", count: 22 },
        { name: "How-To", count: 35 },
        { name: "Storytelling", count: 18 },
        { name: "Comparison", count: 25 },
        { name: "FOMO", count: 28 },
      ],
      style: [
        { name: "UGC", count: 40 },
        { name: "Product Demo", count: 45 },
        { name: "Lifestyle", count: 20 },
        { name: "Tutorial", count: 30 },
        { name: "Review", count: 15 },
        { name: "Vlog", count: 10 },
      ],
    },
  },
  {
    id: "candy-crush",
    name: "Candy Crush Saga",
    logo: competitorLogos["candy-crush"],
    totalSpend: 345688577,
    downloads: 82511651,
    os: "Android",
    ads: [
      makeAd(301, "candy-crush", "Sweet Match 3 Fun", "https://images.unsplash.com/photo-1582056615449-5dcb2332b3b4?w=400&h=300&fit=crop", 8900000, 4.2, 125000, 35.2, "Instagram", "Lifestyle", "Shocking Stat", "Play Now", "1:1", "15s"),
      makeAd(302, "candy-crush", "New Levels Weekly", "https://images.unsplash.com/photo-1560167016-022b78a0258e?w=400&h=300&fit=crop", 6200000, 3.8, 98000, 28.4, "Facebook", "Story", "Storytelling", "Shop Now", "4:5", "30s"),
      makeAd(303, "candy-crush", "Candy Rain Event", "https://images.unsplash.com/photo-1523049673856-6485b5301054?w=400&h=300&fit=crop", 5400000, 5.1, 87000, 42.8, "TikTok", "Hype", "FOMO", "Play Now", "9:16", "15s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 55 },
        { name: "30s", value: 30 },
        { name: "45s", value: 10 },
        { name: "60s", value: 4 },
        { name: ">60s", value: 1 },
      ],
      dimension: [
        { name: "1:1", value: 40 },
        { name: "4:5", value: 20 },
        { name: "9:16", value: 30 },
        { name: "16:9", value: 10 },
      ],
      concept: [
        { name: "Problem-Solution", count: 20 },
        { name: "Testimonial", count: 40 },
        { name: "How-To", count: 15 },
        { name: "Storytelling", count: 35 },
        { name: "Comparison", count: 12 },
        { name: "FOMO", count: 48 },
      ],
      style: [
        { name: "UGC", count: 30 },
        { name: "Product Demo", count: 20 },
        { name: "Lifestyle", count: 50 },
        { name: "Tutorial", count: 15 },
        { name: "Review", count: 10 },
        { name: "Vlog", count: 25 },
      ],
    },
  },
  {
    id: "cash-frenzy",
    name: "Cash Frenzy",
    logo: competitorLogos["cash-frenzy"],
    totalSpend: 39743247,
    downloads: 4748693,
    os: "Android",
    ads: [
      makeAd(401, "cash-frenzy", "Big Win Tonight", "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=400&h=300&fit=crop", 2800000, 3.3, 45000, 19.3, "Facebook", "UGC", "Problem-solution", "Claim Bonus", "9:16", "30s"),
      makeAd(402, "cash-frenzy", "Free Spins Daily", "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=300&fit=crop", 1900000, 2.7, 32000, 14.1, "Instagram", "Lifestyle", "Aspirational", "Spin Now", "1:1", "15s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 30 },
        { name: "30s", value: 32 },
        { name: "45s", value: 20 },
        { name: "60s", value: 15 },
        { name: ">60s", value: 3 },
      ],
      dimension: [
        { name: "1:1", value: 25 },
        { name: "4:5", value: 20 },
        { name: "9:16", value: 45 },
        { name: "16:9", value: 10 },
      ],
      concept: [
        { name: "Problem-Solution", count: 25 },
        { name: "Testimonial", count: 38 },
        { name: "How-To", count: 20 },
        { name: "Storytelling", count: 15 },
        { name: "Comparison", count: 22 },
        { name: "FOMO", count: 35 },
      ],
      style: [
        { name: "UGC", count: 45 },
        { name: "Product Demo", count: 25 },
        { name: "Lifestyle", count: 35 },
        { name: "Tutorial", count: 15 },
        { name: "Review", count: 20 },
        { name: "Vlog", count: 12 },
      ],
    },
  },
  {
    id: "cash-tornado",
    name: "Cash Tornado",
    logo: competitorLogos["cash-tornado"],
    totalSpend: 20659976,
    downloads: 668445,
    os: "iOS",
    ads: [
      makeAd(501, "cash-tornado", "Tornado Jackpots", "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=300&fit=crop", 1500000, 4.5, 28000, 32.1, "TikTok", "Hype", "FOMO", "Play Now", "9:16", "15s"),
      makeAd(502, "cash-tornado", "VIP Rewards", "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop", 980000, 3.1, 19000, 16.8, "Instagram", "Story", "FOMO", "Claim Bonus", "4:5", "30s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 45 },
        { name: "30s", value: 25 },
        { name: "45s", value: 15 },
        { name: "60s", value: 10 },
        { name: ">60s", value: 5 },
      ],
      dimension: [
        { name: "1:1", value: 20 },
        { name: "4:5", value: 15 },
        { name: "9:16", value: 55 },
        { name: "16:9", value: 10 },
      ],
      concept: [
        { name: "Problem-Solution", count: 15 },
        { name: "Testimonial", count: 20 },
        { name: "How-To", count: 18 },
        { name: "Storytelling", count: 28 },
        { name: "Comparison", count: 10 },
        { name: "FOMO", count: 55 },
      ],
      style: [
        { name: "UGC", count: 35 },
        { name: "Product Demo", count: 15 },
        { name: "Lifestyle", count: 25 },
        { name: "Tutorial", count: 10 },
        { name: "Review", count: 18 },
        { name: "Vlog", count: 22 },
      ],
    },
  },
  {
    id: "coin-master",
    name: "Coin Master",
    logo: competitorLogos["coin-master"],
    totalSpend: 400261854,
    downloads: 17610101,
    os: "Android",
    ads: [
      makeAd(601, "coin-master", "Spin to Win", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", 12000000, 4.8, 180000, 38.5, "Facebook", "UGC", "Testimonial", "Strong CTA", "9:16", "15s"),
      makeAd(602, "coin-master", "Raid Villages", "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop", 8900000, 3.9, 135000, 29.2, "TikTok", "Hype", "FOMO", "Download", "9:16", "30s"),
      makeAd(603, "coin-master", "Pet Collection", "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop", 5600000, 3.2, 92000, 21.7, "Instagram", "Story", "FOMO", "Play Now", "1:1", "30s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 50 },
        { name: "30s", value: 28 },
        { name: "45s", value: 12 },
        { name: "60s", value: 7 },
        { name: ">60s", value: 3 },
      ],
      dimension: [
        { name: "1:1", value: 30 },
        { name: "4:5", value: 20 },
        { name: "9:16", value: 40 },
        { name: "16:9", value: 10 },
      ],
      concept: [
        { name: "Problem-Solution", count: 35 },
        { name: "Testimonial", count: 25 },
        { name: "How-To", count: 20 },
        { name: "Storytelling", count: 30 },
        { name: "Comparison", count: 15 },
        { name: "FOMO", count: 40 },
      ],
      style: [
        { name: "UGC", count: 50 },
        { name: "Product Demo", count: 20 },
        { name: "Lifestyle", count: 28 },
        { name: "Tutorial", count: 18 },
        { name: "Review", count: 22 },
        { name: "Vlog", count: 15 },
      ],
    },
  },
  {
    id: "dice-dreams",
    name: "Dice Dreams",
    logo: competitorLogos["dice-dreams"],
    totalSpend: 73244146,
    downloads: 6717208,
    os: "Android",
    ads: [
      makeAd(701, "dice-dreams", "Roll the Dice", "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop", 3400000, 3.6, 58000, 24.5, "Instagram", "UGC", "Before/After", "Swipe Up", "9:16", "30s"),
      makeAd(702, "dice-dreams", "Build Your Kingdom", "https://images.unsplash.com/photo-1560174307-67a9c8?w=400&h=300&fit=crop", 2100000, 2.9, 36000, 17.2, "Facebook", "Tutorial", "Question", "Learn More", "16:9", "45s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 28 },
        { name: "30s", value: 35 },
        { name: "45s", value: 20 },
        { name: "60s", value: 12 },
        { name: ">60s", value: 5 },
      ],
      dimension: [
        { name: "1:1", value: 18 },
        { name: "4:5", value: 22 },
        { name: "9:16", value: 48 },
        { name: "16:9", value: 12 },
      ],
      concept: [
        { name: "Problem-Solution", count: 28 },
        { name: "Testimonial", count: 18 },
        { name: "How-To", count: 32 },
        { name: "Storytelling", count: 22 },
        { name: "Comparison", count: 20 },
        { name: "FOMO", count: 25 },
      ],
      style: [
        { name: "UGC", count: 38 },
        { name: "Product Demo", count: 30 },
        { name: "Lifestyle", count: 22 },
        { name: "Tutorial", count: 35 },
        { name: "Review", count: 12 },
        { name: "Vlog", count: 18 },
      ],
    },
  },
  {
    id: "doubledown",
    name: "DoubleDown Casino",
    logo: competitorLogos["doubledown"],
    totalSpend: 28554859,
    downloads: 699199,
    os: "Android",
    ads: [
      makeAd(801, "doubledown", "Vegas Slots Live", "https://images.unsplash.com/photo-1596838333650-52b0c16a7b5f?w=400&h=300&fit=crop", 1800000, 3.4, 31000, 18.9, "Facebook", "Lifestyle", "Testimonial", "Play Now", "16:9", "30s"),
      makeAd(802, "doubledown", "Daily Bonus", "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop", 1200000, 2.8, 22000, 12.3, "Instagram", "Story", "FOMO", "Claim Bonus", "4:5", "15s"),
    ],
    chartData: {
      length: [
        { name: "15s", value: 32 },
        { name: "30s", value: 30 },
        { name: "45s", value: 22 },
        { name: "60s", value: 12 },
        { name: ">60s", value: 4 },
      ],
      dimension: [
        { name: "1:1", value: 20 },
        { name: "4:5", value: 25 },
        { name: "9:16", value: 42 },
        { name: "16:9", value: 13 },
      ],
      concept: [
        { name: "Problem-Solution", count: 22 },
        { name: "Testimonial", count: 30 },
        { name: "How-To", count: 15 },
        { name: "Storytelling", count: 35 },
        { name: "Comparison", count: 18 },
        { name: "FOMO", count: 32 },
      ],
      style: [
        { name: "UGC", count: 32 },
        { name: "Product Demo", count: 28 },
        { name: "Lifestyle", count: 40 },
        { name: "Tutorial", count: 12 },
        { name: "Review", count: 25 },
        { name: "Vlog", count: 15 },
      ],
    },
  },
];

// Hook/End video clips extracted from actual ads
export interface HookEndVideo {
  id: number;
  type: "hook" | "end";
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  relatedAdId: number; // Links to the actual ad
  competitorId: string;
}

export const hookEndSequenceVideos: HookEndVideo[] = [
  // Hooks (first 3-5 seconds) - Multiple videos per hook type
  // Problem-solution hooks
  { id: 1, type: "hook", title: "Problem-solution", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop", duration: "0:05", views: 2450000, relatedAdId: 101, competitorId: "my-brand" },
  { id: 2, type: "hook", title: "Problem-solution", thumbnail: "https://images.unsplash.com/photo-1542259681-d4cd3839ae81?w=400&h=300&fit=crop", duration: "0:05", views: 3200000, relatedAdId: 201, competitorId: "age-of-origins" },
  { id: 3, type: "hook", title: "Problem-solution", thumbnail: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=400&h=300&fit=crop", duration: "0:04", views: 2800000, relatedAdId: 401, competitorId: "cash-frenzy" },
  
  // Before/After hooks
  { id: 4, type: "hook", title: "Before/After", thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", duration: "0:04", views: 1890000, relatedAdId: 102, competitorId: "my-brand" },
  { id: 5, type: "hook", title: "Before/After", thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop", duration: "0:05", views: 3400000, relatedAdId: 701, competitorId: "dice-dreams" },
  
  // Shocking Stat hooks
  { id: 6, type: "hook", title: "Shocking Stat", thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop", duration: "0:05", views: 1560000, relatedAdId: 103, competitorId: "my-brand" },
  { id: 7, type: "hook", title: "Shocking Stat", thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=400&h=300&fit=crop", duration: "0:04", views: 2100000, relatedAdId: 202, competitorId: "age-of-origins" },
  { id: 8, type: "hook", title: "Shocking Stat", thumbnail: "https://images.unsplash.com/photo-1582056615449-5dcb2332b3b4?w=400&h=300&fit=crop", duration: "0:04", views: 8900000, relatedAdId: 301, competitorId: "candy-crush" },
  
  // Storytelling hooks
  { id: 9, type: "hook", title: "Storytelling", thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop", duration: "0:04", views: 1340000, relatedAdId: 104, competitorId: "my-brand" },
  { id: 10, type: "hook", title: "Storytelling", thumbnail: "https://images.unsplash.com/photo-1560167016-022b78a0258e?w=400&h=300&fit=crop", duration: "0:05", views: 6200000, relatedAdId: 302, competitorId: "candy-crush" },
  
  // Question hooks
  { id: 11, type: "hook", title: "Question", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop", duration: "0:03", views: 1120000, relatedAdId: 105, competitorId: "my-brand" },
  { id: 12, type: "hook", title: "Question", thumbnail: "https://images.unsplash.com/photo-1560174307-67a9c8?w=400&h=300&fit=crop", duration: "0:04", views: 2100000, relatedAdId: 702, competitorId: "dice-dreams" },
  
  // FOMO hooks
  { id: 13, type: "hook", title: "FOMO", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop", duration: "0:05", views: 1800000, relatedAdId: 203, competitorId: "age-of-origins" },
  { id: 14, type: "hook", title: "FOMO", thumbnail: "https://images.unsplash.com/photo-1523049673856-6485b5301054?w=400&h=300&fit=crop", duration: "0:04", views: 5400000, relatedAdId: 303, competitorId: "candy-crush" },
  { id: 15, type: "hook", title: "FOMO", thumbnail: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=300&fit=crop", duration: "0:04", views: 1500000, relatedAdId: 501, competitorId: "cash-tornado" },
  
  // Testimonial hooks
  { id: 16, type: "hook", title: "Testimonial", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", duration: "0:05", views: 12000000, relatedAdId: 601, competitorId: "coin-master" },
  { id: 17, type: "hook", title: "Testimonial", thumbnail: "https://images.unsplash.com/photo-1596838333650-52b0c16a7b5f?w=400&h=300&fit=crop", duration: "0:04", views: 1800000, relatedAdId: 801, competitorId: "doubledown" },
  
  // Ends (last 3-5 seconds) - Multiple ends per type
  // CTA endings
  { id: 18, type: "end", title: "Strong CTA", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop", duration: "0:04", views: 2450000, relatedAdId: 101, competitorId: "my-brand" },
  { id: 19, type: "end", title: "Strong CTA", thumbnail: "https://images.unsplash.com/photo-1542259681-d4cd3839ae81?w=400&h=300&fit=crop", duration: "0:04", views: 3200000, relatedAdId: 201, competitorId: "age-of-origins" },
  { id: 20, type: "end", title: "Strong CTA", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", duration: "0:03", views: 12000000, relatedAdId: 601, competitorId: "coin-master" },
  
  // Swipe Up endings
  { id: 21, type: "end", title: "Swipe Up", thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", duration: "0:03", views: 1890000, relatedAdId: 102, competitorId: "my-brand" },
  { id: 22, type: "end", title: "Swipe Up", thumbnail: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=300&fit=crop", duration: "0:04", views: 3400000, relatedAdId: 701, competitorId: "dice-dreams" },
  
  // Learn More endings
  { id: 23, type: "end", title: "Learn More", thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop", duration: "0:04", views: 1560000, relatedAdId: 103, competitorId: "my-brand" },
  { id: 24, type: "end", title: "Learn More", thumbnail: "https://images.unsplash.com/photo-1560174307-67a9c8?w=400&h=300&fit=crop", duration: "0:03", views: 2100000, relatedAdId: 702, competitorId: "dice-dreams" },
  
  // Shop Now endings
  { id: 25, type: "end", title: "Shop Now", thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop", duration: "0:03", views: 1340000, relatedAdId: 104, competitorId: "my-brand" },
  { id: 26, type: "end", title: "Shop Now", thumbnail: "https://images.unsplash.com/photo-1560167016-022b78a0258e?w=400&h=300&fit=crop", duration: "0:04", views: 6200000, relatedAdId: 302, competitorId: "candy-crush" },
  
  // Sign Up endings
  { id: 27, type: "end", title: "Sign Up", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop", duration: "0:04", views: 1120000, relatedAdId: 105, competitorId: "my-brand" },
  
  // Download endings
  { id: 28, type: "end", title: "Download", thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=400&h=300&fit=crop", duration: "0:03", views: 2100000, relatedAdId: 202, competitorId: "age-of-origins" },
  { id: 29, type: "end", title: "Download", thumbnail: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop", duration: "0:04", views: 8900000, relatedAdId: 602, competitorId: "coin-master" },
  
  // Play Now endings
  { id: 30, type: "end", title: "Play Now", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop", duration: "0:04", views: 1800000, relatedAdId: 203, competitorId: "age-of-origins" },
  { id: 31, type: "end", title: "Play Now", thumbnail: "https://images.unsplash.com/photo-1523049673856-6485b5301054?w=400&h=300&fit=crop", duration: "0:03", views: 5400000, relatedAdId: 303, competitorId: "candy-crush" },
  { id: 32, type: "end", title: "Play Now", thumbnail: "https://images.unsplash.com/photo-1596838333650-52b0c16a7b5f?w=400&h=300&fit=crop", duration: "0:04", views: 1800000, relatedAdId: 801, competitorId: "doubledown" },
  
  // Claim Bonus endings
  { id: 33, type: "end", title: "Claim Bonus", thumbnail: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=400&h=300&fit=crop", duration: "0:03", views: 2800000, relatedAdId: 401, competitorId: "cash-frenzy" },
  { id: 34, type: "end", title: "Claim Bonus", thumbnail: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop", duration: "0:04", views: 980000, relatedAdId: 502, competitorId: "cash-tornado" },
];

// Top performing hook+end sequences (combinations that work best together)
export interface SequenceData {
  id: number;
  hookAdId: number;
  endAdId: number;
  hookType: string;
  endType: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  competitorId: string;
  performanceScore: number; // Combined metric
}

export const sequenceData: SequenceData[] = [
  { id: 1, hookAdId: 101, endAdId: 101, hookType: "Problem-solution", endType: "CTA", title: "Problem-solution → CTA", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop", duration: "0:30", views: 2450000, competitorId: "my-brand", performanceScore: 98 },
  { id: 2, hookAdId: 201, endAdId: 201, hookType: "Problem-solution", endType: "CTA", title: "Problem-solution → CTA", thumbnail: "https://images.unsplash.com/photo-1542259681-d4cd3839ae81?w=400&h=300&fit=crop", duration: "0:30", views: 3200000, competitorId: "age-of-origins", performanceScore: 95 },
  { id: 3, hookAdId: 202, endAdId: 202, hookType: "Shocking Stat", endType: "Download", title: "Shocking Stat → Download", thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?w=400&h=300&fit=crop", duration: "0:15", views: 2100000, competitorId: "age-of-origins", performanceScore: 92 },
  { id: 4, hookAdId: 102, endAdId: 102, hookType: "Before/After", endType: "Swipe Up", title: "Before/After → Swipe Up", thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", duration: "0:15", views: 1890000, competitorId: "my-brand", performanceScore: 89 },
  { id: 5, hookAdId: 203, endAdId: 203, hookType: "FOMO", endType: "Play Now", title: "FOMO → Play Now", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop", duration: "0:30", views: 1800000, competitorId: "age-of-origins", performanceScore: 87 },
  { id: 6, hookAdId: 103, endAdId: 103, hookType: "Shocking Stat", endType: "Learn More", title: "Shocking Stat → Learn More", thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop", duration: "0:60", views: 1560000, competitorId: "my-brand", performanceScore: 85 },
  { id: 7, hookAdId: 104, endAdId: 104, hookType: "Storytelling", endType: "Shop Now", title: "Storytelling → Shop Now", thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop", duration: "0:45", views: 1340000, competitorId: "my-brand", performanceScore: 82 },
  { id: 8, hookAdId: 105, endAdId: 105, hookType: "Question", endType: "Sign Up", title: "Question → Sign Up", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop", duration: "0:30", views: 1120000, competitorId: "my-brand", performanceScore: 78 },
];
