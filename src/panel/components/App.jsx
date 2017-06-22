import React from 'react'
import Visualisation from './Visualisation.jsx'
import InfoTable from './InfoTable.jsx'
import Seekbar from './Seekbar.jsx'

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

const formatTime = time => ((Math.round(time * 100)) / 100).toString()

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            detached: false,
        }
    }
    render () {
        const ctx = this.props.json.videoContext
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
                <section styleName="controls">
                    <button
                        styleName="toggleplay"
                        onClick={() => this.props.togglePlay()}
                    >
                        {this.props.json.videoContext.state === 0 ? 'Pause' : 'Play'}
                    </button>
                    <div styleName="seekbar">
                        <Seekbar
                            value={ctx.currentTime / ctx.duration}
                            onUserSeek={value => this.props.seek(value * ctx.duration)}
                        />
                    </div>
                </section>
                <div styleName="other-info">
                    <InfoTable
                        rows={[
                            ['Current time', `${formatTime(ctx.currentTime)}s`],
                            ['Duration', `${formatTime(ctx.duration)}s`],
                            ['State', convertStateEnum(ctx.state)],
                            ['Playback rate', ctx.playbackRate],
                        ]}
                    />
                </div>
            </div>
        )
    }
}
