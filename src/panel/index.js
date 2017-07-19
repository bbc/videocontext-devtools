// Ben Robinson, © BBC Research & Development, 2017

import 'babel-polyfill'
import ReactDOM from 'react-dom'
import React from 'react'

import Connector from './components/Connector.jsx'
import './index.scss'
import 'rc-slider/assets/index.css'

ReactDOM.render(
    <Connector />,
    document.getElementById('app'),
)
