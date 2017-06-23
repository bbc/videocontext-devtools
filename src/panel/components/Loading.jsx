import React from 'react'
import IconSVG from 'svg-inline-react'
import spinner from '../img/spinner.svg'
import './Loading.scss'

export default () => (
    <div styleName="main">
        <div styleName="spinner"><IconSVG src={spinner} /></div>
        <div styleName="text">Connecting...</div>
    </div>
)
