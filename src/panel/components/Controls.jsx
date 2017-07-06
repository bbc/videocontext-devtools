import React from 'react'
import IconSVG from 'svg-inline-react'

import Seekbar from './Seekbar.jsx'
import play from '../img/play.svg'
import pause from '../img/pause.svg'
import { formatTime } from '../utils'
import './Controls.scss'

export default ({ currentTime, duration, state, onSeek, togglePlay }) => (
    <div styleName="main">
        <button
            styleName="toggleplay"
            onClick={() => togglePlay()}
        >
            <IconSVG src={state === 0 ? pause : play} />
        </button>
        <div styleName="seekbar">
            <Seekbar
                value={currentTime / duration}
                onUserSeek={onSeek}
            />
        </div>
        <span>
            {formatTime(currentTime)} / {formatTime(duration)}
        </span>
    </div>
)
