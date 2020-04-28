import React from 'react';
import { Button } from 'antd';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      sec: 0,
      mSec: 0,
    };
  }

  start = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    } else {
      this.timerId = setInterval(this.mSecInc, 10);
    }
  }

  stop = () => {
    clearInterval(this.timerId);
    this.timerId = undefined;
    this.setState({
      min: 0,
      sec: 0,
      mSec: 0,
    });
  }


  mSecInc = () => {
    let { mSec, sec, min } = this.state;

    if (mSec === 1000) {
      sec += 1;
      mSec = 0;
    }
    if (sec === 60) {
      min += 1;
      sec = 0;
    }
    // let sec = Math.floor(mSec % 60000 / 1000)
    // let minutes = Math.floor(mSec / 60000)
    this.setState({
      min,
      sec,
      mSec: mSec + 10,
    });
  }

  formatNumber = (item) => {
    if (String(item).length < 2) {
      return 0 + String(item);
    }
    return item;
  }

  formatNumberMsec = (item) => {
    if (item === 0) {
      return String('00') + item;
    }
    return item;
  }

  render() {
    const { min, sec, mSec } = this.state;

    return (
      <div>
        <div className="time">
          {this.formatNumber(min)}
          {' '}
          :
          {' '}
          {this.formatNumber(sec)}
          {' '}
          :
          {' '}
          <span className="mSec">{this.formatNumberMsec(mSec)}</span>
        </div>
        <Button className="button" onClick={this.start} type="primary" size="small">
          Start/Pause
        </Button>
        <Button className="button" onClick={this.stop} type="primary" size="small">
          Clear
        </Button>
      </div>
    );
  }
}

export default Stopwatch;
