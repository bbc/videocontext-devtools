import React from 'react'

export default class Seekbar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isUserScrubbing: false,
            value: this.props.value,
        }

        this.handleSeek = this.handleSeek.bind(this)
    }

    handleSeek (value) {
        this.setState({ value })
        this.props.onUserSeek(value)
    }

    render () {
        return (
            <input
                type="range"
                max="1"
                min="0"
                step="0.005"
                value={this.state.isUserScrubbing ? this.state.value : this.props.value}
                onChange={e => this.handleSeek(e.target.value)}
                onMouseDown={() => this.setState({ isUserScrubbing: true })}
                onMouseUp={() => this.setState({ isUserScrubbing: false })}
            />
        )
    }
}
