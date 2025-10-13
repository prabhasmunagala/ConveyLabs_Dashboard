import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine Tailwind + conditional class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generate random data for charts with a realistic pattern
export function generateDailyData(days) {
  const baseCost = 75;
  const baseMinutes = 45;
  const pattern = [1.2, 1.4, 1.1, 0.9, 0.8, 0.6, 0.7];

  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1) + i);

    const patternIndex = i % pattern.length;
    const randomFactor = 0.8 + Math.random() * 0.4;
    const multiplier = pattern[patternIndex] * randomFactor;

    return {
      date: date.toISOString().split("T")[0],
      cost: Math.round(baseCost * multiplier * 100) / 100,
      minutes: Math.round(baseMinutes * multiplier * 10) / 10,
      calls: Math.floor((baseMinutes * multiplier) / 3),
    };
  });
}

// Generate call type distribution (percentages)
export function generateCallTypeData() {
  return [
    { name: "Inbound", value: 68, color: "#F14300" },
    { name: "Outbound", value: 29, color: "#FF8A65" },
    { name: "Failed", value: 3, color: "#FFD0B5" },
  ];
}

// Generate calendar data for the last 31 days
export function generateCalendarData() {
  const today = new Date();
  const data = {};
  const weekdayBase = 30;
  const weekendBase = 15;

  for (let i = 0; i < 31; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseValue = isWeekend ? weekendBase : weekdayBase;
    const randomFactor = 0.7 + Math.random() * 0.6;

    data[dateStr] = Math.floor(baseValue * randomFactor);
  }

  return data;
}

// Indian states data
export const indianStates = [
  { id: "AP", name: "Andhra Pradesh", value: 78, coordinates: [80.0193, 15.9129] },
  { id: "AR", name: "Arunachal Pradesh", value: 12, coordinates: [94.7278, 28.218] },
  { id: "AS", name: "Assam", value: 45, coordinates: [92.9376, 26.2006] },
  { id: "BR", name: "Bihar", value: 65, coordinates: [85.3131, 25.0961] },
  { id: "CT", name: "Chhattisgarh", value: 38, coordinates: [81.8661, 21.2787] },
  { id: "GA", name: "Goa", value: 25, coordinates: [74.124, 15.2993] },
  { id: "GJ", name: "Gujarat", value: 85, coordinates: [71.1924, 22.2587] },
  { id: "HR", name: "Haryana", value: 72, coordinates: [76.0856, 29.0588] },
  { id: "HP", name: "Himachal Pradesh", value: 28, coordinates: [77.1734, 31.1048] },
  { id: "JH", name: "Jharkhand", value: 42, coordinates: [85.2799, 23.6102] },
  { id: "KA", name: "Karnataka", value: 92, coordinates: [75.7139, 15.3173] },
  { id: "KL", name: "Kerala", value: 80, coordinates: [76.2711, 10.8505] },
  { id: "MP", name: "Madhya Pradesh", value: 68, coordinates: [78.6569, 22.9734] },
  { id: "MH", name: "Maharashtra", value: 95, coordinates: [75.7139, 19.7515] },
  { id: "MN", name: "Manipur", value: 15, coordinates: [93.9063, 24.6637] },
  { id: "ML", name: "Meghalaya", value: 18, coordinates: [91.3662, 25.467] },
  { id: "MZ", name: "Mizoram", value: 10, coordinates: [92.9376, 23.1645] },
  { id: "NL", name: "Nagaland", value: 14, coordinates: [94.5624, 26.1584] },
  { id: "OR", name: "Odisha", value: 52, coordinates: [85.0985, 20.9517] },
  { id: "PB", name: "Punjab", value: 70, coordinates: [75.3412, 31.1471] },
  { id: "RJ", name: "Rajasthan", value: 75, coordinates: [74.2179, 27.0238] },
  { id: "SK", name: "Sikkim", value: 8, coordinates: [88.5122, 27.533] },
  { id: "TN", name: "Tamil Nadu", value: 88, coordinates: [78.6569, 11.1271] },
  { id: "TG", name: "Telangana", value: 82, coordinates: [79.0193, 18.1124] },
  { id: "TR", name: "Tripura", value: 22, coordinates: [91.9882, 23.9408] },
  { id: "UP", name: "Uttar Pradesh", value: 90, coordinates: [80.9462, 26.8467] },
  { id: "UT", name: "Uttarakhand", value: 35, coordinates: [79.0193, 30.0668] },
  { id: "WB", name: "West Bengal", value: 78, coordinates: [87.855, 22.9868] },
  { id: "DL", name: "Delhi", value: 100, coordinates: [77.1025, 28.7041] },
];

// Generate random call logs
export function generateCallLogs(count) {
  const assistants = ["Nova AI", "Celume Assistant", "Voice Agent 3", "Support Bot"];
  const callTypes = ["Inbound", "Outbound", "Failed"];
  const summaries = [
    "Customer inquiry about product features",
    "Billing dispute resolution",
    "Technical support for login issues",
    "Appointment scheduling",
    "Product return request",
    "Account verification",
  ];

  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 72));

    const duration = Math.floor(Math.random() * 600);
    const cost = (duration / 60) * (Math.random() * 0.2 + 0.3);

    const callTypeRandom = Math.random() * 100;
    let callType;
    if (callTypeRandom < 68) callType = "Inbound";
    else if (callTypeRandom < 97) callType = "Outbound";
    else callType = "Failed";

    return {
      id: `call-${i + 1}`,
      dateTime: date.toISOString(),
      assistant: assistants[Math.floor(Math.random() * assistants.length)],
      type: callType,
      duration,
      cost,
      region: indianStates[Math.floor(Math.random() * indianStates.length)].name,
      summary: summaries[Math.floor(Math.random() * summaries.length)],
    };
  });
}

// Format duration from seconds to MM:SS
export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

// Format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

// Get call volume category
export function getCallVolumeCategory(count) {
  if (count === 0) return "none";
  if (count < 10) return "low";
  if (count < 25) return "medium";
  return "high";
}
