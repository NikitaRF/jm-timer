import React from 'react';
import {
  Slider, Row, Col, Button, Progress,
} from 'antd';


import sound from './audio/alarm.mp3';


class Countdown extends React.Component {
    state = {
      inputValueSec: 0,
      startTimer: false,
      timerStartTime: null,
      countOfPlay: 1,
    };

    onChangeSec = (value) => {
      this.setState({
        inputValueSec: value,
      });
    };

    incMin = (e) => {
      let min = Number(e.target.value);
      if (min > 720) {
        min = 720;
      }
      this.setState(({ inputValueSec }) => ({ inputValueSec: inputValueSec % 60 + min * 60 }));
    }

    incSec = (e) => {
      const sec = Number(e.target.value);
      this.setState(({ inputValueSec }) => ({ inputValueSec: Math.floor(inputValueSec / 60) * 60 + sec }));
    }

    handleSelect = (e) => {
      e.target.select();
    };

    blockInput = () => {
      const inputs = document.querySelectorAll('.timeInput');
      for (const i of inputs) {
        if (i.getAttribute('disabled') == null && i.classList.contains('timeInput--block') === false) {
          i.setAttribute('disabled', 'disabled');
          i.classList.add('timeInput--block');
        } else {
          i.removeAttribute('disabled');
          i.classList.remove('timeInput--block');
        }
      }
    }

    startCountdown = () => {
      this.blockInput();
      const { timerStartTime } = this.state;
      if (timerStartTime === null) {
        this.setState({
          timerStartTime: this.state.inputValueSec,
        });
      } else {
        this.setState({
          timerStartTime: null,
        });
      }


      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = undefined;
      } else {
        this.timerId = setInterval(this.secDec, 1000);
      }
    }

    stopCountdown = () => {
      const inputs = document.querySelectorAll('.timeInput');
      for (const i of inputs) {
        if (i.getAttribute('disabled') !== null && i.classList.contains('timeInput--block') === true) {
          i.removeAttribute('disabled');
          i.classList.remove('timeInput--block');
        }
      }

      clearInterval(this.timerId);
      this.timerId = undefined;
      this.setState({
        inputValueSec: 0,
        startTimer: false,
        timerStartTime: null,
      });
    }

    secDec = () => {
      const { inputValueSec } = this.state;

      if (inputValueSec === 0) {
        console.log('Время вышло!!!');
        const audio = new Audio(sound);
        audio.play();
        this.StartPlaySound();
        clearInterval(this.timerId);
        this.timerId = undefined;
        const inputs = document.querySelectorAll('.timeInput');
        for (const i of inputs) {
          if (i.getAttribute('disabled') !== null && i.classList.contains('timeInput--block') === true) {
            i.removeAttribute('disabled');
            i.classList.remove('timeInput--block');
          }
        }
        this.setState({
          timerStartTime: null,
        });
      } else {
        this.setState({
          inputValueSec: inputValueSec - 1,
        });
      }
    }

    playSound = () => {
      const { countOfPlay } = this.state;
      console.log('Время вышло!!!');
      const audio = new Audio(sound);
      audio.play();


      this.setState({ countOfPlay: countOfPlay + 1 });

      if (countOfPlay === 2) {
        this.setState({ countOfPlay: 1 });
        clearInterval(this.soundId);
        this.soundId = undefined;
      }
    }

    StartPlaySound = () => {
      this.soundId = setInterval(this.playSound, 2100);
    }

    render() {
      const { inputValueSec, timerStartTime } = this.state;
      const min = Math.floor(inputValueSec / 60);
      const sec = inputValueSec - (min * 60);
      const percent = 100 - Math.floor(inputValueSec * 100 / timerStartTime);

      return (
        <div>
          <div className="conclusionTime">
            <div className="conclusionTime__item conclusionTime__item--time">
              {min}
              {' '}
              :
              {' '}
              {sec}
            </div>
            <Progress type="circle" percent={percent} />
          </div>
          <div className="conclusionTime__item">
            {/* min */}
            <input
              className="timeInput"
              onClick={this.handleSelect}
              onChange={this.incMin}
              type="text"
              value={
                        timerStartTime == null ? min : Math.floor(timerStartTime / 60)
                    }
            />
            <span> : </span>
            {/* sec */}
            <input
              className="timeInput"
              onClick={this.handleSelect}
              onChange={this.incSec}
              type="text"
              value={
                        timerStartTime == null ? sec : timerStartTime - (min * 60)
                    }
            />
          </div>

          <Row>
            <Col span={12}>
              <Slider
                min={0}
                disabled={
                                timerStartTime == null ? '' : 'disabled'
                            }
                max={3600}
                step={15}
                onChange={this.onChangeSec}
                value={typeof inputValueSec === 'number' ? inputValueSec : 0}
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
