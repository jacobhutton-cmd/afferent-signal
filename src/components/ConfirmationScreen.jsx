import React from 'react'
import '../styles/ConfirmationScreen.css'

export default function ConfirmationScreen() {
  return (
    <div className="confirmation">
      <div className="checkmark">✅</div>
      <h2>Thank you!</h2>
      <p>Your feedback has been recorded. We'll use it to stock the shelves with what you need.</p>
    </div>
  )
}
