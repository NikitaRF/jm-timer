import React from 'react';
import { Button } from 'antd';


class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            sec: 0,
            startTimer: false,
            countOfPlay: 1,
        }
    }

    static getDerivedStateFromProps(props, state){
        let currentSecounds = props.sec;
        let minutes = Math.floor(currentSecounds / 60);
        let secounds = currentSecounds - (minutes * 60);
        if (state.startTimer !== false){
            return {
                min: state.min,
                sec: state.sec,
            }
        } else {
            return {
                min: minutes,
                sec: secounds,
            }
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
            startTimer: false,
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
            this.StartPlaySound()
        } else {
            this.setState({
                min: min,
                sec: sec - 1,
                startTimer: true,
            })
        }
    }

    playSound = () => {
        const { countOfPlay } = this.state;
        console.log("Время вышло!!!")
        this.setState({ countOfPlay: countOfPlay + 1 })

        if (countOfPlay === 2){
            this.setState({ countOfPlay: 1 })
            clearInterval(this.soundId)
            this.soundId = undefined;
        }
    }

    StartPlaySound = () => {
        this.soundId = setInterval(this.playSound, 1000)
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
                    Clear
                </Button>
            </div>
        )
    }
}

export default Countdown;