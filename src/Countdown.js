import React from 'react';
import { Button } from 'antd';


class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sec: 0,
            startTimer: false,
            play: false,
            countOfPlay: 1,
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

    // secDec = () => {
    //     let { sec, min } = this.state;
    //
    //     if (sec <= 0 && min !== 0) {
    //         sec = 60;
    //         min -= 1;
    //     }
    //
    //     if (min === 0 && sec === 0){
    //         clearInterval(this.timerId)
    //         this.timerId = undefined
    //         this.StartPlaySound()
    //     } else {
    //         this.setState({
    //             min: min,
    //             sec: sec - 1,
    //             startTimer: true,
    //         })
    //     }
    // }
    //
    // playSound = () => {
    //     const { countOfPlay } = this.state;
    //     console.log("Время вышло!!!")
    //
    //     const audio = new Audio('./audio/alarm.mp3')
    //     audio.play();
    //
    //
    //     this.setState({ countOfPlay: countOfPlay + 1 })
    //
    //     if (countOfPlay === 2){
    //         this.setState({ countOfPlay: 1 })
    //         clearInterval(this.soundId)
    //         this.soundId = undefined;
    //     }
    // }
    //
    // StartPlaySound = () => {
    //     this.soundId = setInterval(this.playSound, 1000)
    // }



    render() {
    const { min, sec } = this.state;

        return (
            <div>
                <div className='time'>
                    {min} : {sec} 111
                </div>
                <Button className='time__input' onClick={this.startCountdown} type="primary" size="small" >
                    Start/Pause
                </Button>
                <Button className='time__input' onClick={this.stopCountdown} type="primary" size="small" >
                    Clear
                </Button>
            </div>
        )
    }
}

export default Countdown;