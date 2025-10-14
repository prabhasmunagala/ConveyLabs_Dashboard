import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Search } from "lucide-react";
import { CallCalendar } from "../../components/call-calender";
import DonutCard from "../../components/ui/pie-chart";

const Dashboard = () => {

  const dummyCallData = {
  "2025-10-01": 5,
  "2025-10-02": 12,
  "2025-10-03": 30,
}
  const data1 = [
    { name: "Total Call Minutes", value: 201 },
    { name: "Number of Calls", value: 54 },
    { name: "Total Spent", value: 90 },
    { name: "Average Cost Per Call", value: 89 },
  ];
  const DonutCardDemo = () => {
  const fakeData = [
    { name: "Answered Calls", value: 45 },
    { name: "Missed Calls", value: 15 },
    { name: "Voicemails", value: 10 },
    { name: "Scheduled", value: 30 },
  ]
}

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

  const assistants = [
    { name: "Nuray Aksoy", count: 8, duration: "1.18 min", date: "21 Dec, 02:46 PM" },
    { name: "Arthur Taylor", count: 2, duration: "0.61 min", date: "21 Dec, 02:46 PM" },
    { name: "Wei Chen", count: 5, duration: "12.60 min", date: "21 Dec, 02:46 PM" },
    { name: "Lena Müller", count: 12, duration: "11.25 min", date: "21 Dec, 02:46 PM" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      {/* Top Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { title: "Call Minutes", value: "42", sub: "+5% last month" },
          { title: "Number of Calls", value: "120", sub: "+8% last month" },
          { title: "Total Spent", value: "$1,100.00", sub: "-3% last month" },
          { title: "Avg. Cost Per Call", value: "$75.12", sub: "+1.5% last month" },
        ].map((item, i) => (
          <div key={i} className="bg-white shadow-sm rounded-2xl p-4">
            <h4 className="text-sm font-medium text-gray-500">{item.title}</h4>
            <p className="text-2xl font-semibold mt-1">{item.value}</p>
            <p className="text-xs text-green-500 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Calls by Assistant */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Calls by Assistant</h4>
            <div className="flex items-center gap-2 border rounded-lg px-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                placeholder="Search..."
                className="text-sm outline-none py-1 w-28"
              />
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Assistant Name</th>
                <th>Call Count</th>
                <th>Avg. Duration</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {assistants.map((a, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{a.name}</td>
                  <td>{a.count}</td>
                  <td>{a.duration}</td>
                  <td>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Appointments and Reminders */}
        {/* <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold mb-4">Appointments & Reminders</h4>
            <div className="bg-green-50 rounded-xl p-3 mb-3">
              <p className="text-2xl font-semibold text-green-700">125</p>
              <p className="text-sm text-gray-500">Booked Appointments</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3">
              <p className="text-2xl font-semibold text-purple-700">45</p>
              <p className="text-sm text-gray-500">Reminder Calls</p>
            </div>
          </div>
        </div> */}
        <CallCalendar callData={dummyCallData} />
      </div>

      {/* Call Analysis */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h4 className="font-semibold mb-4">Call Analysis</h4>
        <p className="text-sm text-gray-500 mb-4">
          Quick overview of your call performance
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Reason Call Ended */}
          <DonutCard
            title="Reason Call Ended"
            data={[
              { name: "Customer Hung Up", value: 35 },
              { name: "Agent Ended", value: 25 },
              { name: "Connection Lost", value: 15 },
              { name: "Transferred", value: 25 },
            ]}
            colors={["#4F46E5", "#22C55E", "#F97316", "#E11D48"]}
          />

          {/* Average Call Duration */}
          <DonutCard
            title="Average Call Duration by Assistant"
            data={[
              { name: "Assistant A", value: 120 },
              { name: "Assistant B", value: 90 },
              { name: "Assistant C", value: 150 },
              { name: "Assistant D", value: 80 },
            ]}
            colors={["#10B981", "#6366F1", "#F59E0B", "#EF4444"]}
          />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
