import React from 'react'
import rubberDuck from '../assets/rubberDuck.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Header () {
  return (
    <React.Fragment>
    <im src={rubberDuck} alt="ducky"/>
    {/* <h1 style={{textAlign: 'center'}}>The Rubber Ducky Method</h1>
      <ButtonGroup aria-label="Basic example">
        <Button variant="outline-light">
          Ask Question
        </Button>
        <Button variant="outline-light">
          Start/Stop
        </Button>
      </ButtonGroup> */}
    </React.Fragment>
  )
}
export default Header