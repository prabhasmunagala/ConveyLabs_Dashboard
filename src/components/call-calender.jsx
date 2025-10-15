"use client"

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

// Helper: categorize call volume into low, medium, high
function getCallVolumeCategory(callCount) {
  if (callCount === 0) return "none"
  if (callCount <= 10) return "low"
  if (callCount <= 20) return "medium"
  return "high"
}

export function CallCalendar({ callData }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])
  const [monthPickerOpen, setMonthPickerOpen] = useState(false)
  const [yearPicker, setYearPicker] = useState(false)
  const [yearRange, setYearRange] = useState([
    Math.floor(currentDate.getFullYear() / 12) * 12,
    Math.floor(currentDate.getFullYear() / 12) * 12 + 11,
  ])

  const pickerRef = useRef(null)
  useEffect(() => {
    function onDocClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setMonthPickerOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [pickerRef])

  useEffect(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDay.getDay()
    const prevMonthLastDay = new Date(year, month, 0).getDate()

    const days = []
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i)
      days.push({ date, inCurrentMonth: false })
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), inCurrentMonth: true })
    }
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), inCurrentMonth: false })
    }
    setCalendarDays(days)
  }, [currentDate])

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  const formatDateKey = (date) => date.toISOString().split("T")[0]
  const getCallVolume = (date) => {
    const callCount = callData[formatDateKey(date)] || 0
    return getCallVolumeCategory(callCount)
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  return (
    <Card className="p-2 border-0">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold" style={{ color: "#068FFF" }}>
              Call Heatmap
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">Call volume by day</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {/* Compact month picker: button opens a small grid of months */}
            <div className="relative" ref={pickerRef}>
              <button
                type="button"
                onClick={() => setMonthPickerOpen((s) => !s)}
                className="flex items-center gap-2 text-sm font-medium rounded-md border px-3 py-1"
                style={{ color: "#068FFF", borderColor: "#E6F3FF", background: "transparent" }}
                aria-expanded={monthPickerOpen}
                aria-haspopup="dialog"
              >
                <span>{monthNames[currentDate.getMonth()].slice(0, 3)}</span>
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8l4 4 4-4" stroke="#068FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {monthPickerOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-md bg-white border-0 shadow p-2 z-50">
                  {/* Header: toggle between month & year picker */}
                  <div className="flex items-center justify-between mb-2">
                    <button
                      type="button"
                      onClick={() =>
                        yearPicker
                          ? setYearRange([yearRange[0] - 12, yearRange[1] - 12])
                          : setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))
                      }
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setYearPicker((prev) => !prev)}
                      className="text-sm font-medium"
                      style={{ color: "#068FFF" }}
                    >
                      {yearPicker
                        ? `${yearRange[0]} - ${yearRange[1]}`
                        : currentDate.getFullYear()}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        yearPicker
                          ? setYearRange([yearRange[0] + 12, yearRange[1] + 12])
                          : setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))
                      }
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Conditional: show months OR years */}
                  {!yearPicker ? (
                    <div className="grid grid-cols-3 gap-2">
                      {monthNames.map((m, idx) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            setCurrentDate(new Date(currentDate.getFullYear(), idx, 1))
                            setMonthPickerOpen(false)
                          }}
                          className={`rounded px-2 py-1 text-xs text-left ${currentDate.getMonth() === idx ? "bg-[#E6F3FF]" : "hover:bg-gray-100"
                            }`}
                          style={{ color: "#068FFF" }}
                        >
                          {m.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const year = yearRange[0] + i
                        return (
                          <button
                            key={year}
                            onClick={() => {
                              setCurrentDate(new Date(year, currentDate.getMonth(), 1))
                              setYearPicker(false)
                            }}
                            className={`rounded px-2 py-1 text-xs ${currentDate.getFullYear() === year ? "bg-[#E6F3FF]" : "hover:bg-gray-100"
                              }`}
                            style={{ color: "#068FFF" }}
                          >
                            {year}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>

            <span className="text-sm" style={{ color: "#068FFF" }}>
              {currentDate.getFullYear()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <TooltipProvider>
          <div className="calendar-container">
            {/* Day names */}
            <div className="mb-1 grid grid-cols-7 text-center">
              {dayNames.map((day) => (
                <div key={day} className="text-[11px] font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarDays.map((day, index) => {
                const dateKey = formatDateKey(day.date)
                const callCount = callData[dateKey] || 0
                const category = getCallVolume(day.date)
                const isToday = new Date().toDateString() === day.date.toDateString()

                const bgColor =
                  category === "none"
                    ? "bg-gray-100"
                    : category === "low"
                      ? "bg-[#E6F3FF]"
                      : category === "medium"
                        ? "bg-[#80C7FF]"
                        : "bg-[#068FFF]"

                const textColor = category === "high" ? "text-white" : "text-[#068FFF]"

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div
                        className={`relative flex h-7 flex-col items-center justify-center rounded-md text-xs cursor-pointer ${bgColor} ${textColor} ${!day.inCurrentMonth ? "opacity-50" : ""
                          }`}
                        style={isToday ? { outline: "2px solid #068FFF" } : {}}
                      >
                        <span>{day.date.getDate()}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-100 text-[#068FFF] border shadow">
                      <p className="text-xs">
                        {callCount} calls on {formatDateKey(day.date)}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center justify-center space-x-3 text-[11px]" style={{ color: "#068FFF" }}>
              <div className="flex items-center">
                <div className="mr-1 h-2.5 w-2.5 rounded-full bg-[#E6F3FF]"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2.5 w-2.5 rounded-full bg-[#80C7FF]"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center">
                <div className="mr-1 h-2.5 w-2.5 rounded-full bg-[#068FFF]"></div>
                <span>High</span>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
