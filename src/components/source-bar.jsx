"use client"

import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export function CostChart({ data }) {
    // Sample data for 5 platforms with positive, neutral, negative leads
    const platformData = [
        { platform: "Facebook", positive: 45, neutral: 25, negative: 15, total: 85 },
        { platform: "Google", positive: 38, neutral: 30, negative: 12, total: 80 },
        { platform: "Twitter", positive: 32, neutral: 20, negative: 18, total: 70 },
        { platform: "WhatsApp", positive: 28, neutral: 22, negative: 10, total: 60 },
        { platform: "Others", positive: 25, neutral: 18, negative: 8, total: 51 }
    ]

    // Custom label functions to show individual values on each bar section
    const renderPositiveLabel = (props) => {
        const { x, y, width, height, payload } = props
        if (!payload || height < 20) return null
        
        return (
            <text
                x={x + width / 2}
                y={y + height / 2}
                fill="white"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                dominantBaseline="middle"
            >
                {payload.positive}
            </text>
        )
    }

    const renderNeutralLabel = (props) => {
        const { x, y, width, height, payload } = props
        if (!payload || height < 20) return null
        
        return (
            <text
                x={x + width / 2}
                y={y + height / 2}
                fill="white"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                dominantBaseline="middle"
            >
                {payload.neutral}
            </text>
        )
    }

    const renderNegativeLabel = (props) => {
        const { x, y, width, height, payload } = props
        if (!payload || height < 20) return null
        
        return (
            <text
                x={x + width / 2}
                y={y + height / 2}
                fill="white"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                dominantBaseline="middle"
            >
                {payload.negative}
            </text>
        )
    }

    // Function to show total leads on top of each bar
    const renderTotalLabel = (props) => {
        const { x, y, width, payload, value } = props
        if (!payload) return null
        
        // Calculate total from the payload data
        const total = (payload.positive || 0) + (payload.neutral || 0) + (payload.negative || 0)
        
        return (
            <text
                x={x + width / 2}
                y={y - 10}
                fill="#000000"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
            >
                {total}
            </text>
        )
    }

    // Custom tooltip component with animate-ui styling and enhanced total section


    return (
        <Card
            className="w-full"
            style={{
                border: 'none',
                outline: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
        >
            <CardHeader className="pb-2">
                <CardTitle>Leads</CardTitle>
            </CardHeader>
            <CardContent>
                <style>{`
                    .recharts-wrapper svg {
                        filter: none !important;
                        outline: none !important;
                    }
                    .recharts-wrapper svg * {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        outline: none !important;
                    }
                    .recharts-bar-rectangle {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        opacity: 1 !important;
                        outline: none !important;
                    }
                    .recharts-bar-rectangle:hover {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        opacity: 1 !important;
                        outline: none !important;
                    }
                    .recharts-bar-rectangle:focus {
                        outline: none !important;
                        border: none !important;
                    }
                    .recharts-bar-rectangle:active {
                        outline: none !important;
                        border: none !important;
                    }
                    .recharts-active-bar {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        opacity: 1 !important;
                        outline: none !important;
                    }
                    .recharts-bar {
                        filter: none !important;
                        box-shadow: none !important;
                        drop-shadow: none !important;
                        outline: none !important;
                    }
                    .recharts-layer {
                        filter: none !important;
                        outline: none !important;
                    }
                `}</style>
                <div className="h-[260px] w-full bg-gray-50 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={platformData}
                            margin={{ top: 30, right: 10, bottom: 20, left: 0 }}
                            style={{ filter: 'none' }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="platform"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                className="text-black text-xs"
                                angle={0}
                                textAnchor="middle"
                            />


                            {/* Stacked Bars with blue shades */}
                            <Bar
                                dataKey="positive"
                                stackId="a"
                                fill="#068FFF"
                                name="Positive"
                                radius={[0, 0, 0, 0]}
                                maxBarSize={40}
                                style={{ filter: 'none', dropShadow: 'none' }}
                            />
                            <Bar
                                dataKey="neutral"
                                stackId="a"
                                fill="#60A5FA"
                                name="Neutral"
                                radius={[0, 0, 0, 0]}
                                maxBarSize={40}
                                style={{ filter: 'none', dropShadow: 'none' }}
                            />
                            <Bar
                                dataKey="negative"
                                stackId="a"
                                fill="#93C5FD"
                                name="Negative"
                                radius={[8, 8, 0, 0]}
                                maxBarSize={40}
                                style={{ filter: 'none', dropShadow: 'none' }}
                                label={renderTotalLabel}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Color Legend */}
                <div className="mt-2 flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#068FFF]"></div>
                        <span className="text-gray-700">Positive</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#60A5FA]"></div>
                        <span className="text-gray-700">Neutral</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#93C5FD]"></div>
                        <span className="text-gray-700">Negative</span>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}

export default CostChart;