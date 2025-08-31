import React from 'react'
import { Link } from 'react-router'

export default function ModalPopup({text, guessedWord}) {
  return (
    <div className="modal">
    <div className='modal-container'>
      <h1>{text}</h1>
      <p style={{marginBottom:'1.5em', fontStyle: 'italic', color: "#000", fontWeight: 'bold'}}>"{guessedWord}"</p>
      <div style={{display: 'flex', gap: '1em'}}>
        <Link to="/create">RESTART</Link>
        <Link to="/">EXIT</Link>
      </div>
    </div>
    </div>
  )
}
