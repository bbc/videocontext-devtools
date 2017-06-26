import React from 'react'
import Slider from 'rc-slider'
import './Seekbar.scss'

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
            <Slider
                styleName="main"
                max={1}
                min={0}
                step={0.005}
                value={this.state.isUserScrubbing ? this.state.value : this.props.value}
                onChange={val => this.handleSeek(val)}
                onBeforeChange={() => this.setState({ isUserScrubbing: true })}
                onAfterChange={() => this.setState({ isUserScrubbing: false })}
                tipFormatter={null}
                trackStyle={{ backgroundColor: '#454545' }}
                handleStyle={{
                    borderColor: '#454545',
                    backgroundColor: '#454545',
                }}
            />
        )
    }
}
