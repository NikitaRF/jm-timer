import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs } from 'antd';
import Stopwatch from './Stopwatch';
import * as serviceWorker from './serviceWorker';
import Countdown from './Countdown';
import 'antd/dist/antd.css';
import './index.css';

const { TabPane } = Tabs;

ReactDOM.render(
  <Tabs defaultActiveKey="1">
    <TabPane tab="Секундомер" key="1">
      <Stopwatch />
    </TabPane>
    <TabPane tab="Таймер" key="2">
      <Countdown />
    </TabPane>
  </Tabs>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
