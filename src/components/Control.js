import React from "react";
import PropTypes from "prop-types";
import { withFirestore, isLoaded } from "react-redux-firebase";
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";

import Speech from './Speech'

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      memoList: [],

    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }

  handleAddMemoryToList = () => {
    this.setState({
      formVisibleOnPage: false,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Header/>
          </Row>
          <Row>
            <Speech />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

Control.propTypes = {
  formVisibleOnPage: PropTypes.bool,

};

export default Control;
