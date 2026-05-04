import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import '../styles/ProductSearch.css'

export default function ProductSearch({ placementId, onSuccess }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const searchProducts = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    setResults([])
    try {
      // UPCitemdb free tier search endpoint
      const res = await fetch(
        `https://api.upcitemdb.com/prod/trial/search?s=${encodeURIComponent(query)}&type=product`
      )
      const data = await res.json()
      setResults(data.items || [])
    } catch (err) {
      setError('Product search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectProduct = async (product) => {
    if (!placementId) return
    setSaving(true)
    try {
      // First create an intent log entry
      const { data: intentLog, error: intentError } = await supabase
        .from('intent_logs')
        .insert([
          {
            placement_id: placementId,
            raw_transcript: `Manual search: ${product.title}`,
          },
        ])
        .select()
        .single()

      if (intentError) throw intentError

      // Then link the product match
      const { error: matchError } = await supabase.from('product_matches').insert([
        {
          intent_log_id: intentLog.id,
          upc: product.upc || product.ean || '',
          product_name: product.title,
          brand: product.brand || '',
          image_url: product.images?.[0] || null,
        },
      ])

      if (matchError) throw matchError
      onSuccess()
    } catch (err) {
      console.error('Save error:', err)
      setError('Failed to save your selection. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="product-search">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product name or UPC..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
        />
        <button onClick={searchProducts} disabled={loading}>
          {loading ? '...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <ul className="results-list">
        {results.map((item, idx) => (
          <li key={idx} className="result-item">
            {item.images?.[0] && (
              <img src={item.images[0]} alt={item.title} className="product-img" />
            )}
            <div className="product-info">
              <strong>{item.title}</strong>
              <span>{item.brand}</span>
              <span className="upc">UPC: {item.upc || item.ean}</span>
            </div>
            <button
              className="select-btn"
              onClick={() => selectProduct(item)}
              disabled={saving}
            >
              This one
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
