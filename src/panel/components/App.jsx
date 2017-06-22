import React from 'react'
import Visualisation from './Visualisation.jsx'
import InfoTable from './InfoTable.jsx'

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
        return (
            <div
                styleName="main"
            >
                <div styleName={this.state.detached ? 'vis-detached' : 'vis'}>
                    <Visualisation
                        detached={this.state.detached}
                        json={this.props.json}
                        onZoom={() => {
                            if (!this.state.detached) {
                                this.setState({ detached: true })
                            }
                        }}
                    />
                </div>

                <button
                    styleName="detach-button"
                    onClick={() => this.setState(state => ({ detached: !state.detached }))}
                >
                    {this.state.detached ? 'Undetach' : 'Detach'}
                </button>
                <button
                    styleName="toggleplay-button"
                    onClick={() => this.props.togglePlay()}
                >
                    {this.props.json.videoContext.state === 0 ? 'Pause' : 'Play'}
                </button>
                <button
                    styleName="toggleplay-button"
                    onClick={() => this.props.seek(0)}
                >
                    Restart
                </button>
                <div styleName="other-info">
                    <InfoTable
                        rows={[
                            ['Current time', `${formatTime(this.props.json.videoContext.currentTime)}s`],
                            ['Duration', `${formatTime(this.props.json.videoContext.duration)}s`],
                            ['State', convertStateEnum(this.props.json.videoContext.state)],
                            ['Playback rate', this.props.json.videoContext.playbackRate],
                        ]}
                    />
                </div>
            </div>
        )
    }
}
