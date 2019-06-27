import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Successindicator from "../../components/success/success";

import { setGuess } from "../../actions/game";
import { fetchRandomNumber } from "../../actions/fetch";

export class UnconnectedAdvanced extends Component {
  state = {
    guess1: "",
    guess2: "",
    guess3: ""
  };

  handleChange = event => {
    const { target } = event;
    this.setState({
      [target.name]: Number(target.value)
    });
  };

  componentDidMount() {
    this.props.fetchRandomNumber();
  }

  handleSubmitGuesses = event => {
    const { guess1, guess2, guess3 } = this.state;
    this.props.setGuess([guess1, guess2, guess3]);
  };

  handleReload = event => {
    window.location.reload();
  };
  render() {
    const { guess1, guess2, guess3 } = this.state;
    const { game, lasterror } = this.props;
    return (
      <div>
        {lasterror ? (
          <div data-test="error-message">{lasterror.message}</div>
        ) : null}
        <br />
        <div>
          {!game.success ? (
            <div>
              <input
                type="number"
                name="guess1"
                data-test="guess1-input"
                value={guess1}
                placeholder="guess 1"
                onChange={this.handleChange}
              />
              <input
                type="number"
                name="guess2"
                data-test="guess2-input"
                value={guess2}
                placeholder="guess 2"
                onChange={this.handleChange}
              />
              <input
                type="number"
                name="guess3"
                data-test="guess3-input"
                value={guess3}
                placeholder="guess 3"
                onChange={this.handleChange}
              />

              <br />
              <br />
              <button onClick={this.handleSubmitGuesses}>Submit Guesses</button>
            </div>
          ) : (
            <Successindicator game={game} playAgain={this.handleReload} />
          )}
        </div>

        <div
          style={{
            height: 50
          }}
        />

        <Link to="/">
          <button>Play easy version</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { game, errors } = state;
  const lasterror = errors.length ? errors.slice(-1)[0] : null;
  return { game, lasterror };
};

export default connect(
  mapStateToProps,
  {
    setGuess,
    fetchRandomNumber
  }
)(UnconnectedAdvanced);
