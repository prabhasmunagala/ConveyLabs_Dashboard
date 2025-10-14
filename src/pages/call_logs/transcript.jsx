'use client'

import { useEffect, useState } from 'react'

export default function TranscriptSection() {
  const [transcript, setTranscript] = useState([])

  useEffect(() => {
    fetch('/assets/transcript.json')
      .then(res => res.json())
      .then(data => setTranscript(data))
      .catch(err => console.error('Failed to load transcript:', err))
  }, [])

  return (
    <div className="mt-4 rounded-md border p-4 relative bg-white">
      <h4 className="mb-2 font-medium">Transcript</h4>


      <div className="space-y-3 mt-4">
        {transcript.map((entry, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[75%] px-4 py-2 rounded-lg text-sm relative leading-snug ${
              entry.speaker === 'Agent'
                ? 'bg-orange-100 text-black self-start'
                : 'bg-gray-200 text-black self-end ml-auto'
            }`}
          >
            {/* Speaker Line */}
            <span className="font-semibold text-sm mb-1">{entry.speaker}</span>

            {/* Text Line */}
            <span className="text-sm">{entry.text}</span>

           
          </div>
        ))}
      </div>
    </div>
  )
}



