"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function CostChart({ data }) {
    const [viewMode, setViewMode] = useState("days")

    // Sample data for different time periods (keeping your existing data)
    const daysData = [
        { period: "Mon", facebook: 25, instagram: 15, whatsapp: 10, twitter: 8 },
        { period: "Tue", facebook: 30, instagram: 20, whatsapp: 12, twitter: 10 },
        { period: "Wed", facebook: 28, instagram: 18, whatsapp: 14, twitter: 12 },
        { period: "Thu", facebook: 35, instagram: 22, whatsapp: 16, twitter: 15 },
        { period: "Fri", facebook: 32, instagram: 25, whatsapp: 18, twitter: 13 },
        { period: "Sat", facebook: 20, instagram: 12, whatsapp: 8, twitter: 6 },
        { period: "Sun", facebook: 18, instagram: 10, whatsapp: 6, twitter: 5 }
    ]

    const weeksData = [
        { period: "Week 1", facebook: 180, instagram: 120, whatsapp: 80, twitter: 60 },
        { period: "Week 2", facebook: 200, instagram: 140, whatsapp: 90, twitter: 70 },
        { period: "Week 3", facebook: 220, instagram: 160, whatsapp: 100, twitter: 80 },
        { period: "Week 4", facebook: 190, instagram: 130, whatsapp: 85, twitter: 65 }
    ]

    const monthsData = [
        { period: "Jan", facebook: 800, instagram: 500, whatsapp: 300, twitter: 250 },
        { period: "Feb", facebook: 750, instagram: 480, whatsapp: 280, twitter: 230 },
        { period: "Mar", facebook: 900, instagram: 600, whatsapp: 350, twitter: 300 },
        { period: "Apr", facebook: 850, instagram: 550, whatsapp: 320, twitter: 270 },
        { period: "May", facebook: 920, instagram: 620, whatsapp: 380, twitter: 320 },
        { period: "Jun", facebook: 880, instagram: 580, whatsapp: 340, twitter: 290 },
        { period: "Jul", facebook: 950, instagram: 640, whatsapp: 400, twitter: 340 },
        { period: "Aug", facebook: 870, instagram: 560, whatsapp: 330, twitter: 280 },
        { period: "Sep", facebook: 910, instagram: 590, whatsapp: 360, twitter: 310 },
        { period: "Oct", facebook: 890, instagram: 570, whatsapp: 350, twitter: 300 },
        { period: "Nov", facebook: 930, instagram: 610, whatsapp: 370, twitter: 320 },
        { period: "Dec", facebook: 980, instagram: 650, whatsapp: 420, twitter: 360 }
    ]

    const yearsData = [
        { period: "2021", facebook: 8500, instagram: 5200, whatsapp: 3100, twitter: 2600 },
        { period: "2022", facebook: 9200, instagram: 5800, whatsapp: 3500, twitter: 2900 },
        { period: "2023", facebook: 10100, instagram: 6500, whatsapp: 3900, twitter: 3300 },
        { period: "2024", facebook: 11000, instagram: 7200, whatsapp: 4300, twitter: 3700 }
    ]

    let displayedData = daysData

    // Use appropriate data based on view mode
    if (viewMode === "days") {
        displayedData = daysData
    } else if (viewMode === "weeks") {
        displayedData = weeksData
    } else if (viewMode === "months") {
        displayedData = monthsData
    } else if (viewMode === "years") {
        displayedData = yearsData
    }

    // Calculate total leads for the selected period
    const totalLeads = displayedData.reduce((total, item) => {
        return total + item.facebook + item.instagram + item.whatsapp + item.twitter
    }, 0)

    // Custom tooltip component with animate-ui styling and enhanced total section
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const total = payload.reduce((sum, entry) => sum + entry.value, 0)

            // Define platform order and colors (darker shades)
            const platformOrder = ['facebook', 'instagram', 'whatsapp', 'twitter']
            const platformColors = {
                facebook: '#068FFF',
                instagram: '#80C7FF',
                whatsapp: '#60A5FA',
                twitter: '#93C5FD'
            }

            // Sort payload according to our desired order
            const sortedPayload = platformOrder.map(platform =>
                payload.find(entry => entry.dataKey === platform)
            ).filter(Boolean)

            return (
                <div className="bg-gray-50 border border-gray-200 shadow-lg rounded-t-xl rounded-b-lg p-3 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="space-y-2">
                        <p className="font-semibold text-gray-900">{label}</p>

                        {/* Individual Platform Values */}
                        <div className="space-y-1 text-sm">
                            {sortedPayload.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: platformColors[entry.dataKey] }}
                                        ></div>
                                        <span>{entry.name}:</span>
                                    </div>
                                    <span className="font-medium">{entry.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Total Section */}
                        <div className="pt-2 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">Total:</span>
                                <span className="font-bold text-blue-600 text-lg">{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <Card
            className="w-full"
            style={{
                border: 'none',
                outline: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Source of Leads</CardTitle>
                        <div className="mt-1">
                            <span className="text-2xl font-bold text-blue-600">{totalLeads.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 ml-2">Total Leads</span>
                        </div>
                    </div>
                    <Select value={viewMode} onValueChange={(val) => setViewMode(val)}>
                        <SelectTrigger
                            className="w-[160px] border-2 border-blue-200 bg-white shadow-sm focus:outline-none focus:ring-0 focus:border-blue-200"
                            style={{
                                border: '2px solid #DBEAFE',
                                outline: 'none',
                                zIndex: 10,
                                boxShadow: 'none'
                            }}
                            onFocus={(e) => e.target.blur()}
                        >
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent
                            className="bg-white border shadow-lg z-50 text-black"
                            style={{
                                zIndex: 9999,
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                color: 'black'
                            }}
                        >
                            <SelectItem
                                value="days"
                                className="hover:bg-blue-50 text-black cursor-pointer"
                                style={{ color: 'black' }}
                            >
                                Last 7 Days
                            </SelectItem>
                            <SelectItem
                                value="weeks"
                                className="hover:bg-blue-50 text-black cursor-pointer"
                                style={{ color: 'black' }}
                            >
                                This Month
                            </SelectItem>
                            <SelectItem
                                value="months"
                                className="hover:bg-blue-50 text-black cursor-pointer"
                                style={{ color: 'black' }}
                            >
                                This Year
                            </SelectItem>
                            <SelectItem
                                value="years"
                                className="hover:bg-blue-50 text-black cursor-pointer"
                                style={{ color: 'black' }}
                            >
                                Last 4 Years
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <CardDescription>
                    {viewMode === "days" && "Lead sources breakdown for the last 7 days"}
                    {viewMode === "weeks" && "Weekly lead sources for current month"}
                    {viewMode === "months" && "Monthly lead sources (Jan–Dec)"}
                    {viewMode === "years" && "Yearly lead sources (last 4 years)"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <style>{`
                    .recharts-wrapper svg {
                        filter: none !important;
                    }
                    .recharts-wrapper svg * {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                    }
                    .recharts-bar-rectangle {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        opacity: 1 !important;
                    }
                    .recharts-bar-rectangle:hover {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        opacity: 1 !important;
                    }
                    .recharts-active-bar {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        opacity: 1 !important;
                    }
                    .recharts-bar {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                    }
                    .recharts-layer {
                        filter: none !important;
                    }
                `}</style>
                <div className="h-[200px] w-full bg-gray-50 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={displayedData}
                            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
                            style={{ filter: 'none' }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                className="text-black"
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={false}
                                wrapperStyle={{ outline: 'none' }}
                            />

                            {/* Stacked Bars with distinct blue shades and rounded corners */}
                            <Bar
                                dataKey="facebook"
                                stackId="a"
                                fill="#068FFF"
                                name="Facebook"
                                radius={[0, 0, 0, 0]}
                                maxBarSize={40}
                                style={{ filter: 'none', dropShadow: 'none' }}
                            />
                            <Bar
                                dataKey="instagram"
                                stackId="a"
                                fill="#80C7FF"
                                name="Instagram"
                                radius={[0, 0, 0, 0]}
                                maxBarSize={40}
                                style={{ filter: 'none', dropShadow: 'none' }}
                            />
                            <Bar
                                dataKey="whatsapp"
                                stackId="a"
                                fill="#60A5FA"
                                name="WhatsApp"
                                radius={[0, 0, 0, 0]}
                                maxBarSize={40}
                                style={{ filter: 'none', dropShadow: 'none' }}
                            />
                            <Bar
                                dataKey="twitter"
                                stackId="a"
                                fill="#93C5FD"
                                name="Twitter"
                                radius={[8, 8, 0, 0]}
                                maxBarSize={40}
                                style={{ filter: 'none', dropShadow: 'none' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>

        </Card>
    )
}

export default CostChart;