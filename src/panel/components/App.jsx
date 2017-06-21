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
                style={{
                    backgroundColor: this.state.detached ? '#ffeaea' : '#fff',
                }}
            >
                <div styleName="vis">
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
                    onClick={() => this.setState(state => ({ detached: !state.detached }))}
                >
                    {this.state.detached ? 'Undetach' : 'Detach'}
                </button>

                <div styleName="other-info">
                    <InfoTable
                        rows={[
                            ['Current time', this.props.json.videoContext.currentTime],
                            ['Duration', this.props.json.videoContext.duration],
                            ['State', convertStateEnum(this.props.json.videoContext.state)],
                            ['Playback rate', this.props.json.videoContext.playbackRate],
                        ]}
                    />
                </div>
            </div>
        )
    }
}
