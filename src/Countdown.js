import React from 'react';
import { Button } from 'antd';




class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            sec: 0,
        }
    }


    startCountdown = () => {
        if (this.timerId) {
            clearInterval(this.timerId)
            this.timerId = undefined
        } else {
            this.timerId = setInterval(this.secDec, 1000)
        }
    }

    stopCountdown = () => {
        clearInterval(this.timerId)
        this.timerId = undefined
        this.setState({
            min: 0,
            sec: 0,
        })
    }

    secDec = () => {
        let { sec, min } = this.state;

        if (sec <= 0 && min !== 0) {
            sec = 60;
            min -= 1;
        }

        if (min === 0 && sec === 0){

            clearInterval(this.timerId)
            this.timerId = undefined

        } else {
            this.setState({
                min: min,
                sec: sec - 1,
            })
        }
    }

    render() {
    const { min, sec } = this.state;

        return (
            <div>
                <div className='time'>
                    {min} : {sec}
                </div>
                <Button className='button' onClick={this.startCountdown} type="primary" size="small" >
                    Start/Pause
                </Button>
                <Button className='button' onClick={this.stopCountdown} type="primary" size="small" >
                    Stop
                </Button>
            </div>
        )

    }


}

export default Countdown;