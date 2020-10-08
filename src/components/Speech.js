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
  const [analytics, setAnalitics] = useState([])
  const [ratings, setRatings] = useState([])

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
    //create objects
    const keyPhraseResults = await keyPhraseExtraction(textAnalyticsClient, [note]);
    const linkedEntityResults = await linkedEntityRecognition(textAnalyticsClient, [note]);
    const sentimentResults = await sentimentAnalysis(textAnalyticsClient, [note])
    //set objects
    setAnalitics(keyPhraseResults[0].keyPhrases)
    
    //set ratings
    setRatings([
      sentimentResults[0].confidenceScores.positive.toFixed(2),
      sentimentResults[0].confidenceScores.neutral.toFixed(2),
      sentimentResults[0].confidenceScores.negative.toFixed(2)
    ])
    console.log(ratings[0])
    console.log(linkedEntityResults[0])
    console.log(keyPhraseResults[0])
    // setAnalitics([...analitics, linkedEntityResults[0]])
    //   result.map(document => {
      //     console.log(`ID: ${document.id}`);
      //     console.log(`\tDocument Key Phrases: ${document.keyPhrases}`);
      // });
      
      setNote('')
    }

    function handleResponse () {
      if (ratings[0] > ratings[1] && ratings[0] > ratings [2] ){
        const response = "It sounds like you have a good grasp on {analytics[0]}"
        return response
      } else if (ratings[1] > ratings[0] && ratings[1] > ratings [2] ){
        const response = "What do you know you don't know about " + analytics[0] + "?"
        return response
      } else if (ratings[2] > ratings[1] && ratings[2] > ratings [0] ){
        const response = "What do you know you don't know about " + analytics[0] + "?"
        return response
      } else {
        const response = "can you tell me more about " + analytics[0] + "?"
        return response
      }
    }

    console.log(analytics)
    console.log(ratings[0])
    
  return (
    <>
      <div className="container2">
        <Container>
          <Row >
            <div style={{textAlign: 'center'}} className="box">
              <h1 style={{textAlign: 'center', padding: "5%"}}> The Rubber Ducky Method </h1>
              <h2 style={{textAlign: 'center'}}>What are you working on?</h2>
              {isListening ? <p>Listening</p> : <p>Not Listening</p>}
              <br/>
              <ButtonGroup aria-label="Basic example">
              <Button  variant="outline-light" onClick={handleSaveNote} disabled={!note}>
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
              <h3>Your Question:</h3>
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