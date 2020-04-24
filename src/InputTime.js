import React from "react";
import { Slider, InputNumber, Row, Col } from 'antd';
import { Button } from 'antd';
import { Progress } from 'antd';

class InputTime extends React.Component {
    state = {
        inputValueSec: 0,
        startTimer: false,
        onStart: 0,
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

    startCountdown = () => {

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
        clearInterval(this.timerId)
        this.timerId = undefined
        this.setState({
            inputValueSec: 0,
            startTimer: false,
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

        let percent = Math.floor(onStart / inputValueSec * 100 - 100)

        return (
            <div>

                <div className='time'>
                    {/*min*/}
                    <input className='time__input' onClick={this.handleSelect} onChange={this.incMin} type="text" value={min} />
                    <span> : </span>
                    {/*sec*/}
                    <input className='time__input' onClick={this.handleSelect} onChange={this.incSec} type="text" value={sec} />
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
                    <Col span={4}>
                        <InputNumber
                            min={0}
                            max={3600}
                            style={{ margin: '0 16px' }}
                            value={inputValueSec}
                            onChange={this.onChangeSec}
                        />
                        <p>Секунды</p>
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

                <Progress type="circle" percent={percent} />


            </div>

        );
    }
}


export default InputTime;