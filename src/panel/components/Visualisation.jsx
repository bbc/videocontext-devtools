import React from 'react'
import VideoContextVisualisation from '@bbc/visualise-videocontext'
import InfoTable from './InfoTable.jsx'
import './Visualisation.scss'

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

export default class Visualisation extends React.Component {
    componentDidMount () {
        this._vis = new VideoContextVisualisation(this._ref)
        this._vis.setData(this.props.json)
        this._vis.render()
    }
    componentWillUpdate () {
        if (!this.props.detached) {
            this._vis.setData(this.props.json)
            this._vis.render()
        }
    }
    componentWillUnmount () {
        this._vis.destroy()
    }
    render () {
        return (
            <div styleName="main">
                <div
                    styleName="vis"
                    onMouseDown={this.props.onZoom}
                    onWheel={this.props.onZoom}
                >
                    <div
                        ref={(ref) => { this._ref = ref }}
                        styleName="rendering"
                    />
                </div>
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
