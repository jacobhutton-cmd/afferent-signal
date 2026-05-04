import React, { useState, useRef } from 'react'
import { supabase } from '../supabaseClient.js'
import '../styles/VoiceCapture.css'

export default function VoiceCapture({ placementId, onSuccess }) {
  const [recording, setRecording] = useState(false)
  const [status, setStatus] = useState('idle') // 'idle' | 'recording' | 'processing' | 'done' | 'error'
  const [transcript, setTranscript] = useState('')
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = handleRecordingStop
      mediaRecorder.start()
      setRecording(true)
      setStatus('recording')
    } catch (err) {
      setStatus('error')
      console.error('Microphone access denied:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
      setStatus('processing')
    }
  }

  const handleRecordingStop = async () => {
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(',')[1]
      try {
        const { data, error } = await supabase.functions.invoke('process-voice-intent', {
          body: { audio_base64: base64Audio, placement_id: placementId },
        })
        if (error) throw error
        setTranscript(data.transcript)
        setStatus('done')
        setTimeout(onSuccess, 1500)
      } catch (err) {
        console.error('Processing error:', err)
        setStatus('error')
      }
    }
    reader.readAsDataURL(blob)
  }

  return (
    <div className="voice-capture">
      <p className="instruction">
        Press and hold the button, speak your need, then release.
      </p>

      <button
        className={`record-btn ${recording ? 'recording' : ''}`}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        disabled={status === 'processing'}
      >
        {recording ? '🔴 Recording...' : '🎙 Hold to Speak'}
      </button>

      {status === 'processing' && <p className="status-msg">Processing your input...</p>}
      {status === 'done' && <p className="status-msg success">Got it: "{transcript}"</p>}
      {status === 'error' && <p className="status-msg error">Something went wrong. Please try again.</p>}
    </div>
  )
}
