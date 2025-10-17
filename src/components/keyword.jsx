"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function KeywordTable() {
    // Sample data for top 10 real estate keywords
    const allKeywordData = [
        { sno: 1, keyword: "Property Price", occurrence: 245 },
        { sno: 2, keyword: "Floor Plan", occurrence: 198 },
        { sno: 3, keyword: "Amenities", occurrence: 187 },
        { sno: 4, keyword: "Location Details", occurrence: 165 },
        { sno: 5, keyword: "Payment Plan", occurrence: 142 },
        { sno: 6, keyword: "Possession Date", occurrence: 128 },
        { sno: 7, keyword: "Parking Space", occurrence: 115 },
        { sno: 8, keyword: "Construction Status", occurrence: 98 },
        { sno: 9, keyword: "Loan Assistance", occurrence: 87 },
        { sno: 10, keyword: "Resale Value", occurrence: 76 }
    ]

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const totalPages = Math.ceil(allKeywordData.length / itemsPerPage)

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = allKeywordData.slice(startIndex, endIndex)

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
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
            <CardHeader className="pb-2">
                <CardTitle>Most Asked Keywords by Customer</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 px-4 pb-4 flex flex-col h-[300px]">
                <div className="flex-1 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 sticky top-0 bg-white">
                                <th className="text-left py-2 px-4 font-semibold text-gray-700 w-16">S.No</th>
                                <th className="text-left py-2 px-4 font-semibold text-gray-700">Keyword</th>
                                <th className="text-left py-2 px-4 font-semibold text-gray-700 w-20">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-2 px-4 text-gray-600 text-center">{item.sno}</td>
                                    <td className="py-2 px-4 font-medium text-gray-900">{item.keyword}</td>
                                    <td className="py-2 px-4 text-center">
                                        <span className="font-semibold text-blue-600">{item.occurrence}</span>
                                    </td>
                                </tr>
                            ))}
                            {/* Fill empty rows to maintain consistent height */}
                            {Array.from({ length: itemsPerPage - currentData.length }).map((_, index) => (
                                <tr key={`empty-${index}`} className="border-b border-gray-100">
                                    <td className="py-2 px-4">&nbsp;</td>
                                    <td className="py-2 px-4">&nbsp;</td>
                                    <td className="py-2 px-4">&nbsp;</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <span className="text-sm text-gray-500">
                        {startIndex + 1}-{Math.min(endIndex, allKeywordData.length)} of {allKeywordData.length}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

export default KeywordTable;