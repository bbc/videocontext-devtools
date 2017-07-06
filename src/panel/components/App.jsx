import React from 'react'

import Visualisation from './Visualisation.jsx'
import InfoTable from './InfoTable.jsx'
import DetachedWarning from './DetachedWarning.jsx'
import Controls from './Controls.jsx'
import { maxStopTimeForNodes, toTwoDecimalPlaces, convertStateEnum } from '../utils'
import './App.scss'

export default ({ json, setDetached, detached, seek, togglePlay }) => {
    const ctx = json.videoContext
    const nodes = Object.values(json.nodes)
    const duration = ctx.duration || maxStopTimeForNodes(nodes)
    return (
        <div
            styleName="main"
        >
            <section styleName={detached ? 'vis-detached' : 'vis'}>
                <Visualisation
                    detached={detached}
                    json={json}
                    onZoom={() => { setDetached(true) }}
                />
            </section>
            <section
                styleName="detached-warning"
                style={{ visibility: detached ? 'visible' : 'hidden' }}
            >
                <DetachedWarning onClick={() => { setDetached(false) }} />
            </section>
            <section styleName="other-info">
                <InfoTable
                    rows={[
                        ['Current time', `${toTwoDecimalPlaces(ctx.currentTime)}s`],
                        ['Duration', `${toTwoDecimalPlaces(duration)}s`],
                        ['State', convertStateEnum(ctx.state)],
                        ['Playback rate', ctx.playbackRate],
                    ]}
                />
            </section>
            <section>
                <Controls
                    currentTime={ctx.currentTime}
                    duration={duration}
                    state={ctx.state}
                    onSeek={val => seek(val * duration)}
                    togglePlay={() => { togglePlay() }}
                />
            </section>
        </div>
    )
}
