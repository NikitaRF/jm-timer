import React from 'react';
import {
  Slider, Row, Col, Button, Progress,
} from 'antd';
import sound from './audio/alarm.mp3';

class Countdown extends React.Component {
  state = {
    inputValueSec: 0,
    timerStartTime: null,
    countOfPlay: 1,
  };

  onChangeSec = (value) => {
    this.setState({
      inputValueSec: value,
    });
  };

  incMin = (event) => {
    let min = Number(event.target.value);
    if (min > 720) {
      min = 720;
    }
    this.setState(({ inputValueSec }) => ({ inputValueSec: (inputValueSec % 60) + min * 60 }));
  };

  incSec = (event) => {
    const sec = Number(event.target.value);
    this.setState(({ inputValueSec }) => ({
      inputValueSec: Math.floor(inputValueSec / 60) * 60 + sec,
    }));
  };

  handleSelect = (event) => {
    event.target.select();
  };

  startCountdown = () => {
    const { timerStartTime, inputValueSec } = this.state;
    if (timerStartTime === null) {
      this.setState({
        timerStartTime: inputValueSec,
      });
    }
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    } else {
      this.timerId = setInterval(this.secDec, 1000);
    }
  };

  stopCountdown = () => {
    clearInterval(this.timerId);
    this.timerId = undefined;
    this.setState({
      inputValueSec: 0,
      timerStartTime: null,
    });
  };

  secDec = () => {
    const { inputValueSec } = this.state;

    if (inputValueSec === 0) {
      const audio = new Audio(sound);
      audio.play();
      this.startPlaySound();
      clearInterval(this.timerId);
      this.timerId = undefined;
      this.setState({
        timerStartTime: null,
      });
    } else {
      this.setState({
        inputValueSec: inputValueSec - 1,
      });
    }
  };

  playSound = () => {
    const { countOfPlay } = this.state;
    const audio = new Audio(sound);
    audio.play();

    this.setState({ countOfPlay: countOfPlay + 1 });

    if (countOfPlay === 2) {
      this.setState({ countOfPlay: 1 });
      clearInterval(this.soundId);
      this.soundId = undefined;
    }
  };

  startPlaySound = () => {
    this.soundId = setInterval(this.playSound, 2100);
  };

  formatNumber = (item) => {
    if (String(item).length < 2) {
      return 0 + String(item);
    }
    return item;
  };

  sliderValueRestriction = (inputValueSec) => {
    if (inputValueSec >= 3600) {
      return 3600;
    }
    return inputValueSec;
  };

  render() {
    const { inputValueSec, timerStartTime } = this.state;
    const min = Math.floor(inputValueSec / 60);
    const sec = inputValueSec - min * 60;
    const percent = 100 - Math.floor((inputValueSec * 100) / timerStartTime);
    const classNameBlockInput = 'timeInput timeInput--block';
    const returnClassInput = () => {
      if (timerStartTime === null) {
        return 'timeInput';
      }
      return classNameBlockInput;
    };
    return (
      <div>
        <div className="conclusionTime">
          <div className="conclusionTime__item conclusionTime__item--time">
            {this.formatNumber(min)}
            {' '}
            :
            {this.formatNumber(sec)}
          </div>
          <Progress type="circle" percent={percent} />
        </div>
        <div className="conclusionTime__item">
          {/* min */}
          <input
            className={returnClassInput()}
            onClick={this.handleSelect}
            onChange={this.incMin}
            type="text"
            disabled={timerStartTime == null ? '' : 'disabled'}
            value={timerStartTime == null ? min : Math.floor(timerStartTime / 60)}
          />
          <span> : </span>
          {/* sec */}
          <input
            className={returnClassInput()}
            onClick={this.handleSelect}
            onChange={this.incSec}
            type="text"
            disabled={timerStartTime == null ? '' : 'disabled'}
            value={
              timerStartTime == null ? sec : timerStartTime - Math.floor(timerStartTime / 60) * 60
            }
          />
        </div>

        <Row>
          <Col span={12}>
            <Slider
              min={0}
              disabled={timerStartTime == null ? '' : 'disabled'}
              max={3600}
              step={15}
              onChange={this.onChangeSec}
              value={
                timerStartTime === null
                  ? this.sliderValueRestriction(inputValueSec)
                  : timerStartTime
              }
            />
          </Col>
        </Row>

        <div>
          <Button className="button" onClick={this.startCountdown} type="primary" size="small">
            Start/Pause
          </Button>
          <Button className="button" onClick={this.stopCountdown} type="primary" size="small">
            Clear
          </Button>
        </div>
      </div>
    );
  }
}

export default Countdown;
