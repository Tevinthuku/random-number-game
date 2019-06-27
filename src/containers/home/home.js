import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Successindicator from "../../components/success/success";

import { setGuess } from "../../actions/game";
import { fetchRandomNumber } from "../../actions/fetch";
export class Home extends Component {
  state = {
    guess: ""
  };
  handleInputChange = event => {
    this.setState({
      guess: Number(event.target.value)
    });
  };

  handleSubmit = event => {
    const { setGuess } = this.props;
    const { guess } = this.state;
    setGuess([guess]);
  };

  handleReload = event => {
    window.location.reload();
  };

  componentDidMount() {
    const { fetchRandomNumber } = this.props;
    fetchRandomNumber();
  }
  render() {
    const { game, lasterror } = this.props;
    const { guess } = this.state;
    return (
      <div>
        {lasterror ? (
          <div data-test="error-message">{lasterror.message}</div>
        ) : null}
        <div
          style={{
            height: 50
          }}
        />
        {!game.success ? (
          <div>
            <input
              type="number"
              data-test="play-input"
              onChange={this.handleInputChange}
              placeholder={"Enter your guess"}
              value={guess}
            />
            <button onClick={this.handleSubmit} data-test="submit-guess">
              Guess
            </button>
          </div>
        ) : (
          <Successindicator game={game} playAgain={this.handleReload} />
        )}

        <br />
        <Link to="/advanced">
          <button>Play the advanced game</button>
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
  { setGuess, fetchRandomNumber }
)(Home);
