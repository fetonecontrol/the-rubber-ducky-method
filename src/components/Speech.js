import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {linkedEntityRecognition, keyPhraseExtraction, textAnalyticsClient} from './Sentiment';

// const styleObject = {
//     position: "top",
//     marginTop: "5%",
//     borderRadius: "10px",
//     maxWidth: "600px",
//     padding: "50px",
//     paddingTop: "50px",
//     background: "rgba(0, 45, 48, 0.5)",
//     boxShadow: "x 50px 50px rgba(0, 255, 242, 0.5)",
// }

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function Speech() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    linkedEntityRecognition(textAnalyticsClient, [note]);
    keyPhraseExtraction(textAnalyticsClient, [note]);

    setNote('')
  }

  return (
    <>
      <div className="container1">
        <div style={{textAlign: 'center'}} className="box">
          <h1 style={{textAlign: 'center'}}>What are you working on?</h1>
          {isListening ? <p>Hot </p> : <p>Off </p>}
          <br/>
          <ButtonGroup aria-label="Basic example">
          <Button varient="primary" onClick={handleSaveNote} disabled={!note}>
            Save Memo
          </Button>
          <Button variant="danger" onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </Button>
          </ButtonGroup>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Saved memos</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  )
}

export default Speech;