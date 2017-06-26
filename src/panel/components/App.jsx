import React from 'react'
import Visualisation from './Visualisation.jsx'
import InfoTable from './InfoTable.jsx'
import IconSVG from 'svg-inline-react'
import Seekbar from './Seekbar.jsx'
import play from '../img/play.svg'
import pause from '../img/pause.svg'

import './App.scss'

const convertStateEnum = (num) => {
    switch (num) {
    case 0:
        return 'Playing'
    case 1:
        return 'Paused'
    case 2:
        return 'Stalled'
    case 3:
        return 'Ended'
    case 4:
        return 'Broken'
    default:
        return `ERROR: unknown state with code ${num}`
    }
}

const leftPad = (num, size) => (`000000000${num}`).substr(-size)

const toTwoDecimalPlaces = num => Math.round(num * 100) / 100

const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - (minutes * 60))
    return `${minutes}:${leftPad(toTwoDecimalPlaces(seconds), 2)}`
}

const maxStopTimeForNodes = nodes => Math.max(...nodes
    .map(n => n.stop)
    .filter(t => t != null)) // filter out any that we don't yet know the time for.

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            detached: false,
        }
    }
    render () {
        const ctx = this.props.json.videoContext
        const nodes = Object.values(this.props.json.nodes)
        const duration = ctx.duration || maxStopTimeForNodes(nodes)
        return (
            <div
                styleName="main"
            >
                <section styleName={this.state.detached ? 'vis-detached' : 'vis'}>
                    <Visualisation
                        detached={this.state.detached}
                        json={this.props.json}
                        onZoom={() => {
                            if (!this.state.detached) {
                                this.setState({ detached: true })
                            }
                        }}
                    />
                </section>

                <button
                    styleName="detach-button"
                    onClick={() => this.setState(state => ({ detached: !state.detached }))}
                >
                    {this.state.detached ? 'Undetach' : 'Detach'}
                </button>
                <div styleName="other-info">
                    <InfoTable
                        rows={[
                            ['Current time', `${toTwoDecimalPlaces(ctx.currentTime)}s`],
                            ['Duration', `${toTwoDecimalPlaces(duration)}s`],
                            ['State', convertStateEnum(ctx.state)],
                            ['Playback rate', ctx.playbackRate],
                        ]}
                    />
                </div>
                <section styleName="controls">
                    <button
                        styleName="toggleplay"
                        onClick={() => this.props.togglePlay()}
                    >
                        <IconSVG src={ctx.state === 0 ? pause : play} />
                    </button>
                    <div styleName="seekbar">
                        <Seekbar
                            value={ctx.currentTime / duration}
                            onUserSeek={value => this.props.seek(value * duration)}
                        />
                    </div>
                    <span>
                        {formatTime(ctx.currentTime)} / {formatTime(duration)}
                    </span>
                </section>
            </div>
        )
    }
}
