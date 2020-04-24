import React from "react";
import { Slider, InputNumber, Row, Col } from 'antd';
import Countdown from './Countdown.js';

class InputTime extends React.Component {
    state = {
        inputValueSec: 0,
    };

    onChangeSec = value => {
        this.setState({
            inputValueSec: value,
        });
    };

    incMin = () => {
        this.setState({
            inputValueSec: 60 + this.state.inputValueSec,
        })
    }
    incSec = () => {
         this.setState({
            inputValueSec: 1 + this.state.inputValueSec,
        })
    }


    render() {
        const { inputValueSec } = this.state;
        let min = Math.floor(inputValueSec / 60);
        let sec = inputValueSec - (min * 60)

        return (
            <div>
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

                {/*min*/}
                <input onChange={this.incMin} type="number" value={min} />
                {/*sec*/}
                <input onChange={this.incSec} type="number" value={sec}/>


            </div>

        );
    }
}


export default InputTime;