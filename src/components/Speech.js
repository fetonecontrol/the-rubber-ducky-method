import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {linkedEntityRecognition, keyPhraseExtraction, sentimentAnalysis, textAnalyticsClient} from './Sentiment';

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
  const [analitics, setAnalitics] = useState([])

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

  async function handleSaveNote () {
    setSavedNotes([...savedNotes, note])
    const keyPhraseResults = await keyPhraseExtraction(textAnalyticsClient, [note]);
    const linkedEntityResults = await linkedEntityRecognition(textAnalyticsClient, [note]);
    const sentimentResults = await sentimentAnalysis(textAnalyticsClient, [note])
    setAnalitics([...analitics, keyPhraseResults[0].keyPhrases])
    console.log(sentimentResults)
    console.log(linkedEntityResults)
    console.log(keyPhraseResults)
    // setAnalitics([...analitics, linkedEntityResults[0]])
    //   result.map(document => {
      //     console.log(`ID: ${document.id}`);
      //     console.log(`\tDocument Key Phrases: ${document.keyPhrases}`);
      // });
      
      setNote('')
    }
    function handleResponse () {
      
    }

  return (
    <>
      <div className="container2">
        <Container>
          <Row >
            <div style={{textAlign: 'center'}} className="box">
              <h1 style={{textAlign: 'center', background: 'rgba(12, 10, 10, 0.719)', borderRadius: "5px", padding: "2%"}}> The Rubber Ducky Method </h1>
              <h1 style={{textAlign: 'center'}}>What are you working on?</h1>
              {isListening ? <p>Hot</p> : <p>Off</p>}
              <br/>
              <ButtonGroup aria-label="Basic example">
              <Button variant="outline-light" onClick={handleSaveNote} disabled={!note}>
                Ask Question
              </Button>
              <Button variant="outline-light" onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </Button>
              </ButtonGroup>
              <p>{note}</p>
            </div>
          </Row>
            <div className="box">
              <h2>Your Question:</h2>
              {savedNotes.map(n => (
                <p key={n}>{n}</p>
                ))}
            </div>
            <div className="box">
              <h2>{handleResponse}</h2>
            </div>
        </Container>
      </div>

    </>
  )
}

export default Speech;