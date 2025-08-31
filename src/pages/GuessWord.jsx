import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { keyboard } from '../utils/keyboard'
import ModalPopup from '../components/ModalPopup'
import gsap from 'gsap'

export default function GuessWord() {
  const [guessWord, setGuessWord] = useState()
  const headRef = useRef()
  const bodyRef = useRef()
  const leftHandRef = useRef()
  const rightHandRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()


  const [isWinPopup, setIsWinPopup] = useState(false)
  const [isLosePopup, setIsLosePopup] = useState(false)

  const human = [headRef, bodyRef, leftHandRef, rightHandRef, leftLegRef, rightLegRef]

  const [successChoice, setSuccessChoice] = useState("")

  const [errors, setErrors] = useState({count: -1, letters: []});

  useLayoutEffect(() => {
    setGuessWord(localStorage.getItem("word"))
  }, [])

 useEffect(() => {
    if (errors.count === human.length - 1) {

    if (leftLegRef.current && rightLegRef.current && leftHandRef.current && rightHandRef.current) {
      gsap.to(leftLegRef.current, {
        rotation: "+=15",
        transformOrigin: "top center",
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.to(rightLegRef.current, {
        rotation: "-=15",
        transformOrigin: "top center",
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.3 
      });

      gsap.to(leftHandRef.current, {
        rotation: "+=55",
        transformOrigin: "top center",
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.to(rightHandRef.current, {
        rotation: "-=55",
        transformOrigin: "top center",
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    setTimeout(() => {
      setIsLosePopup(true);
    }, 3000)
  }
}, [errors]);



  useEffect(() => {
    if (successChoice.length == 0) return
    if (successChoice.split("").sort().join("") == guessWord.split("").sort().join("")) {
      setIsWinPopup(true)
    }
  }, [successChoice])

  const tryToGuess = letter => {
    if (successChoice.includes(letter)) return


    if (guessWord.includes(letter)) {
      const lettersElems = document.querySelectorAll('.guess-letter')
      lettersElems.forEach(l => {
        if (l.textContent == letter) {
          l.classList.add('active')
          setSuccessChoice(prev => prev += l.textContent)
        }
      })
    }else {
      human[errors.count + 1].current.classList.add('active')
      if (errors.letters.includes(letter)) return setErrors(prev => ({count: prev.count += 1, letters: prev.letters}))

      setErrors(prev => ({ 
        count: prev.count+=1, 
        letters: [...prev.letters, letter]
      }))
    }
  }

  return (
    <div className='app guess-block'>
      {isWinPopup && <ModalPopup text="WINNER" guessedWord={guessWord} />}
      {isLosePopup && <ModalPopup text="LOSER" guessedWord={guessWord} />}
      <div className="error-letters">
        {errors.count > -1 && errors.letters.map((error_letter, idx) => 
        <span key={error_letter + idx} style={{textDecoration: "line-through", textDecorationColor: "red", textDecorationStyle: "wavy"}}>{error_letter}</span>
        )}
      </div>
      <div className="handman" style={{padding: '2em', marginBottom: '5vh'}}>
        <div  style={{position: 'relative', width: 70, height: 170}}>
          <span style={{position: 'absolute', left:"50%", width: 2, height:'100%', background: '#fff'}}></span>
          <span style={{position: 'absolute', bottom: 0, width: '100%', height: 2, background: '#fff'}}></span>
          <span style={{position: 'absolute', left: '50%', width: "100%", height: 2, background:'#fff'}}></span>
          <span style={{position: 'absolute', right: '-50%', width: 2, height: 20, background:'#fff'}}></span>
          <div ref={headRef} className="head"></div>
          <div ref={bodyRef} className="body"></div>
          <div ref={leftHandRef} className="left-hand"></div>
          <div ref={rightHandRef} className="right-hand"></div>
          <div ref={leftLegRef} className="left-leg"></div>
          <div ref={rightLegRef} className="right-leg"></div>
        </div>
      </div>
        <div style={{margin: '5vh 0', display: 'flex', justifyContent: 'center'}}>{guessWord && guessWord.split("").map((letter, idx) => 
          <p key={letter + idx} className='letter-container'>
            <span className="guess-letter">{letter}</span>
          </p>)}
        </div>  
      <div className="keyboard">
        {keyboard.map((line, i) => (
          <div key={i} className="line">
            {line.map((letter, idx) => 
              <button key={letter + idx} onClick={() => tryToGuess(letter)}>{letter}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
