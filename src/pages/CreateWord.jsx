import React, { useState } from 'react'
import { keyboard } from '../utils/keyboard';
import { Link, useNavigate } from 'react-router';


export default function CreateWord() {
  const [word, setWord] = useState('');
  const navigate = useNavigate()

  const handleSubmit = () => {
    if(!word) return
    localStorage.setItem('word', word)
    navigate('/game')
  }

  return (
    <div className='app guess-block'>
      <div className="word">{word}</div>
      <div className="keyboard">
        {keyboard.map((line, i) => (
          <div key={i} className="line">
            {line.map(letter => 
              <button key={letter} onClick={() => setWord(prev => prev + letter)}>{letter}</button>
            )}
          </div>
        ))}
      </div>
      <div className="keyboard-controls">
        <button className='cancel-btn' onClick={() => setWord(prev => prev.slice(0, prev.length-1))}>x</button>
        <button className='done-btn' onClick={handleSubmit}>DONE</button>
      </div>

    </div>
  )
}
