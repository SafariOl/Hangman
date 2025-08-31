// App.jsx
import React from 'react'
import { Link } from 'react-router'

export default function App() {
  return (
    <div className="app">
      <h1 className="title">Welcome to the Game</h1>
      <Link to="/create" className="start-btn">
        START
      </Link>
    </div>
  )
}
