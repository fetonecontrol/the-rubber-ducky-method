import React from 'react'
import rubberDuck from '../assets/rubberDuck.jpg'

function Header () {
  return (
    <React.Fragment>
    <h1 style={{textAlign: 'center'}}>The Rubber Ducky Method</h1>
    <im src={rubberDuck} alt="ducky"/>
    </React.Fragment>
  )
}
export default Header