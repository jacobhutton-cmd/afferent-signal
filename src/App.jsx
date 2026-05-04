import React, { useState, useEffect } from 'react'
import VoiceCapture from './components/VoiceCapture.jsx'
import ProductSearch from './components/ProductSearch.jsx'
import ConfirmationScreen from './components/ConfirmationScreen.jsx'
import './styles/App.css'

export default function App() {
  const [placementId, setPlacementId] = useState(null)
  const [activeTab, setActiveTab] = useState('voice') // 'voice' | 'search'
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('placement_id')
    if (id) {
      setPlacementId(id)
    } else {
      setError('No placement ID found in URL. Please scan a valid QR code.')
    }
  }, [])

  if (submitted) return <ConfirmationScreen />

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Afferent Signal</h1>
        <p className="subtitle">Tell us what you're looking for</p>
      </header>

      {error && (
        <div className="error-banner">{error}</div>
      )}

      {!error && (
        <>
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
              onClick={() => setActiveTab('voice')}
            >
              🎙 Voice
            </button>
            <button
              className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              🔍 Search
            </button>
          </div>

          <main className="app-main">
            {activeTab === 'voice' ? (
              <VoiceCapture
                placementId={placementId}
                onSuccess={() => setSubmitted(true)}
              />
            ) : (
              <ProductSearch
                placementId={placementId}
                onSuccess={() => setSubmitted(true)}
              />
            )}
          </main>
        </>
      )}
    </div>
  )
}
