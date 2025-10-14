"use client";

import { useEffect, useState } from "react";
import AudioWaveform from "./audio";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Transcript from "./transcript";
import {
  formatDate,
  formatDuration,
  generateCallLogs,
} from "../../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";

export default function CallLogs() {
  // Generate stub data
  const [allCallLogs, setAllCallLogs] = useState([]);
  useEffect(() => {
    setAllCallLogs(generateCallLogs(50));
  }, []);

  // Helper to format INR
  function formatINR(amount) {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  // Helper to convert USD to INR
  function usdToInr(usd) {
    return usd * 87.09;
  }

  // State for call detail sheet
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  // Handle row click
  const handleRowClick = (call) => {
    setSelectedCall(call);
    setIsDetailOpen(true);
  };

  if (allCallLogs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
  <div className="w-full text-gray-900 dark:text-gray-100">
        <div className="flex flex-col mt-4">
          {/* Call Logs Table */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>Call Logs</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Showing {allCallLogs.length} calls
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden md:table-cell">Phone No</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="hidden md:table-cell">Cost</TableHead>
                      <TableHead className="hidden md:table-cell">Region</TableHead>
                      <TableHead className="hidden lg:table-cell">Summary</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {allCallLogs.map((call) => (
                      <TableRow
                        key={call.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleRowClick(call)}
                      >
                        <TableCell className="px-3 py-2">
                          {formatDate(call.dateTime)}
                        </TableCell>
                        <TableCell className="px-3 py-2">{call.assistant}</TableCell>
                        <TableCell className="hidden md:table-cell px-3 py-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              call.type === "Inbound"
                                ? "bg-green-100 text-green-800"
                                : call.type === "Outbound"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {call.type}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell px-3 py-2">
                          7995192709
                        </TableCell>
                        <TableCell className="px-3 py-2">
                          {formatDuration(call.duration)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell px-3 py-2">
                          {formatINR(usdToInr(call.cost))}
                        </TableCell>
                        <TableCell className="hidden md:table-cell px-3 py-2">
                          {call.region}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell px-3 py-2">
                          {(() => {
                            if (!call.summary) return null;
                            const words = call.summary.split(/\s+/);
                            const rows = [];
                            for (let i = 0; i < Math.min(words.length, 9); i += 3) {
                              rows.push(words.slice(i, i + 3).join(" "));
                            }
                            return rows.map((row, idx) => (
                              <div key={idx} className="truncate">
                                {row}
                              </div>
                            ));
                          })()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 flex items-center justify-between p-4">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <div className="text-sm">Page 1 of 10</div>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call Detail Sheet */}
      {selectedCall && (
        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Call Details</SheetTitle>
              <SheetDescription>
                {formatDate(selectedCall.dateTime)} • {selectedCall.type} •{" "}
                {selectedCall.region}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
              <AudioWaveform audioUrl="https://celume-studios-livekit-recordings.s3.ap-south-1.amazonaws.com/livekit/room-5H1O-cFbU-20250807-152949.ogg" />

              {/* Call Summary */}
              <div className="mt-4 rounded-md border p-4">
                <h4 className="mb-2 font-medium">Call Summary</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedCall.summary}</p>
              </div>

              {/* Cost Breakdown */}
              <div className="mt-4 rounded-md border p-4">
                <h4 className="mb-2 font-medium">Cost Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Call Duration</span>
                    <span className="text-sm font-medium">
                      {formatDuration(selectedCall.duration)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rate per Minute</span>
                    <span className="text-sm font-medium">
                      {formatINR(usdToInr(0.06))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Processing</span>
                    <span className="text-sm font-medium">
                      {formatINR(usdToInr(0.12))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Fees</span>
                    <span className="text-sm font-medium">
                      {formatINR(usdToInr(0.05))}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex items-center justify-between font-medium">
                      <span>Total Cost</span>
                      <span>{formatINR(usdToInr(selectedCall.cost))}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                <Transcript />
              </h4>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
