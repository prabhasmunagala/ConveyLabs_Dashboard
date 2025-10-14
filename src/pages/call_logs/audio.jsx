'use client'

import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { Download } from 'lucide-react'

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#fb6c1c',
  progressColor: '#fb6c1c',
  barWidth: 2,
  barGap: 1.5,
  barRadius: 2,
  height: 50,
  responsive: true,
  normalize: true,
  partialRender: true,
})

export default function CustomWaveform({ audioUrl }) {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState('0:00')

  useEffect(() => {
    if (!waveformRef.current) return

    // Create WaveSurfer instance
    const ws = WaveSurfer.create(formWaveSurferOptions(waveformRef.current))
    wavesurfer.current = ws

    ws.load(audioUrl)

    ws.on('ready', () => {
      setDuration(formatDuration(ws.getDuration()))
    })

    ws.on('finish', () => {
      setIsPlaying(false)
    })

    return () => {
      try {
        ws.destroy()
      } catch (err) {
        // Non-TypeScript-safe runtime check for AbortError
        const name = err && err.name ? err.name : undefined
        if (name !== 'AbortError') {
          console.warn('WaveSurfer cleanup error:', err)
        }
      }
      wavesurfer.current = null
    }
  }, [audioUrl])

  const handlePlayPause = () => {
    if (!wavesurfer.current) return
    wavesurfer.current.playPause()
    setIsPlaying(prev => !prev)
  }

  const handleDownload = async () => {
    try {
      const res = await fetch(audioUrl, { mode: 'cors' })
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'recording.ogg' // Custom filename
      document.body.appendChild(a)
      a.click()
      a.remove()

      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed', err)
    }
  }

  const formatDuration = (sec) => {
    const secondsNum = Number(sec) || 0
    const minutes = Math.floor(secondsNum / 60)
    const seconds = Math.floor(secondsNum % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="rounded-md bg-gray-100 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">Audio Recording</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="text-black hover:underline flex items-center text-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
          <button
            onClick={handlePlayPause}
            className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold border-none outline-none focus:outline-none"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      <div ref={waveformRef} />

      <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
        <span>0:00</span>
        <span>{duration}</span>
      </div>
    </div>
  )
}

