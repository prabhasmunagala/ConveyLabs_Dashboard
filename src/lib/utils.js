import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function generateDailyData(days) {
  // Base values
  const baseCost = 75
  const baseMinutes = 45

  // Create a pattern with some randomness
  const pattern = [1.2, 1.4, 1.1, 0.9, 0.8, 0.6, 0.7]

  return Array.from({ length: days }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1) + i)

    // Apply pattern with some randomness
    const patternIndex = i % pattern.length
    const randomFactor = 0.8 + Math.random() * 0.4
    const multiplier = pattern[patternIndex] * randomFactor

    return {
      date: date.toISOString().split("T")[0],
      cost: Math.round(baseCost * multiplier * 100) / 100,
      minutes: Math.round(baseMinutes * multiplier * 10) / 10,
      calls: Math.floor((baseMinutes * multiplier) / 3),
    }
  })
}
// Format date for display
export function formatDate(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format duration in seconds to readable format
export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Generate fake call logs data
export function generateCallLogs(count = 50) {
  const assistants = ["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Eva Brown"];
  const types = ["Inbound", "Outbound", "Missed"];
  const regions = ["North America", "Europe", "Asia", "Australia"];
  const summaries = [
    "Customer inquiry about product pricing and availability",
    "Technical support for software installation issues",
    "Sales call for new service package discussion",
    "Follow-up call regarding previous complaint resolution",
    "Appointment scheduling for service consultation"
  ];

  const logs = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));

    logs.push({
      id: i + 1,
      dateTime: date.toISOString(),
      assistant: assistants[Math.floor(Math.random() * assistants.length)],
      type: types[Math.floor(Math.random() * types.length)],
      duration: Math.floor(Math.random() * 600) + 30, // 30 seconds to 10 minutes
      cost: Math.random() * 5 + 0.5, // $0.50 to $5.50
      region: regions[Math.floor(Math.random() * regions.length)],
      summary: summaries[Math.floor(Math.random() * summaries.length)]
    });
  }

  return logs.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
}