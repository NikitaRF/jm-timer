import React from "react";
import { Slider, Row, Col } from 'antd';
import { Button } from 'antd';
import { Progress } from 'antd';

class InputTime extends React.Component {
    state = {
        inputValueSec: 0,
        startTimer: false,
        onStart: null,
    };

    onChangeSec = value => {
        this.setState({
            inputValueSec: value,
        });
    };

    incMin = (e) => {
        let min = Number(e.target.value);
        this.setState(({ inputValueSec }) => ({ inputValueSec: inputValueSec % 60 + min * 60}))
    }
    incSec = (e) => {
        let sec = Number(e.target.value);
        this.setState(({ inputValueSec }) => ({ inputValueSec: Math.floor(inputValueSec / 60) * 60 + sec}))
    }

    handleSelect = (e) => {
        e.target.select();
    };

    blockInput = () => {
        let inputs = document.querySelectorAll('.timeInput')
        for (const i of inputs){
            if (i.getAttribute('disabled') == null && i.classList.contains('timeInput--block') === false){
                i.setAttribute('disabled', 'disabled')
                i.classList.add('timeInput--block')
            } else {
                i.removeAttribute('disabled')
                i.classList.remove('timeInput--block')
            }
        }
    }

    startCountdown = () => {
        this.blockInput();
        this.setState({
            onStart: this.state.inputValueSec,
        })

        if (this.timerId) {
            clearInterval(this.timerId)
            this.timerId = undefined

        } else {

            this.timerId = setInterval(this.secDec, 1000)
        }
    }

    stopCountdown = () => {
        let inputs = document.querySelectorAll('.timeInput')
        for (const i of inputs) {
            if (i.getAttribute('disabled') !== null && i.classList.contains('timeInput--block') === true) {
                i.removeAttribute('disabled')
                i.classList.remove('timeInput--block')
            }
        }

        clearInterval(this.timerId)
        this.timerId = undefined
        this.setState({
            inputValueSec: 0,
            startTimer: false,
            onStart: null,
        })
    }

    secDec = () => {
        let { inputValueSec } = this.state;

        if (inputValueSec === 0) {
            clearInterval(this.timerId)
            this.timerId = undefined
        } else {
            this.setState({
                inputValueSec: inputValueSec - 1,
            })
        }
    }

    render() {
        const { inputValueSec, onStart } = this.state;
        let min = Math.floor(inputValueSec / 60);
        let sec = inputValueSec - (min * 60)

        let percent = 100 -  Math.floor(inputValueSec * 100 / onStart)
        console.log(onStart)
        return (
            <div>
                <div className='conclusionTime'>
                <div className='conclusionTime__item conclusionTime__item--time'>{min} : {sec}</div>
                <Progress type="circle" percent={percent} />
                </div>
                <div className='conclusionTime__item'>
                    {/*min*/}
                    <input className='timeInput' onClick={this.handleSelect} onChange={this.incMin} type="text" value={
                        onStart == null ? min : Math.floor(onStart / 60)
                    } />
                    <span> : </span>
                    {/*sec*/}
                    <input className='timeInput' onClick={this.handleSelect} onChange={this.incSec} type="text" value={
                        onStart == null ? sec : onStart - (min * 60)
                    } />
                </div>

                <Row>
                    <Col span={12}>
                        <Slider
                            min={0}
                            max={3600}
                            step={15}
                            onChange={this.onChangeSec}
                            value={typeof inputValueSec === 'number' ? inputValueSec : 0}
                        />
                    </Col>

                </Row>

                <div>
                    <Button className='button' onClick={this.startCountdown} type="primary" size="small" >
                        Start/Pause
                    </Button>
                    <Button className='button' onClick={this.stopCountdown} type="primary" size="small" >
                        Clear
                    </Button>
                </div>

            </div>

        );
    }
}


export default InputTime;