import React from "react";
import { Slider, InputNumber, Row, Col } from 'antd';
import Countdown from './Countdown.js';

class InputTime extends React.Component {
    state = {
        inputValueMin: 0,
        inputValueSec: 0,
    };

    onChangeMin = value => {
        this.setState({
            inputValueMin: value,
        });
    };

    onChangeSec = value => {
        this.setState({
            inputValueSec: value,
        });
    };

    render() {
        const { inputValueMin, inputValueSec } = this.state;
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Slider
                            min={0}
                            max={60}
                            step={15}
                            onChange={this.onChangeMin}
                            value={typeof inputValueMin === 'number' ? inputValueMin : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={0}
                            max={720}
                            style={{ margin: '0 16px' }}
                            value={inputValueMin}
                            onChange={this.onChangeMin}
                        />
                        <p>Минуты</p>
                    </Col>
                    <Col span={12}>
                        <Slider
                            min={0}
                            max={60}
                            step={15}
                            onChange={this.onChangeSec}
                            value={typeof inputValueSec === 'number' ? inputValueSec : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={0}
                            max={60}
                            style={{ margin: '0 16px' }}
                            value={inputValueSec}
                            onChange={this.onChangeSec}
                        />
                        <p>Секунды</p>
                    </Col>
                </Row>
                <Countdown min={this.state.inputValueMin} sec={this.state.inputValueSec}/>
            </div>

        );
    }
}





export default InputTime;