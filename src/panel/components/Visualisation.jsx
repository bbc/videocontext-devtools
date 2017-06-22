import React from 'react'
import VideoContextVisualisation from '@bbc/visualise-videocontext'
import './Visualisation.scss'

export default class Visualisation extends React.Component {
    componentDidMount () {
        const colours = {
            active: '#4CEE7E',
            inactive: '#6CA97F',
            error: '#F3516C',
            processing: '#EE4CBC',
            destination: '#000',
        }
        this._vis = new VideoContextVisualisation(this._ref, colours)
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
        )
    }
}
