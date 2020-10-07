import React from "react";
// import NewMemo from "./NewMemo";
// import MemoList from "./MemoList";
import { withFirestore, isLoaded } from "react-redux-firebase";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import SentimentAnalysis from './Sentiment'

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
        {/* <Header/> */}
          <Speech />
      </React.Fragment>
    );
  }
}

Control.propTypes = {
  formVisibleOnPage: PropTypes.bool,

};

export default Control;
