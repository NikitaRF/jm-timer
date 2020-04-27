import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs } from 'antd';
import App from './App';
import * as serviceWorker from './serviceWorker';
import InputTime from './InputTime';
import 'antd/dist/antd.css';
import './index.css';


const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}

ReactDOM.render(
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Секундомер" key="1">
      <App />
    </TabPane>
    <TabPane tab="Таймер" key="2">
      <InputTime />
    </TabPane>
  </Tabs>,

  document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
