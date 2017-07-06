import React from 'react'
import App from './App.jsx'
import './TabManager.scss'

export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            activeId: Object.keys(this.props.json)[0],
            detached: false,
        }
    }
    render () {
        return (
            <div styleName="main">
                <header styleName="tabbar">
                    {Object.keys(this.props.json).map(id => (
                        <button
                            styleName={id === this.state.activeId ? 'tab-active' : 'tab'}
                            key={id}
                            onClick={() => this.setState({ activeId: id, detached: false })}
                            disabled={id === this.state.activeId}
                        >
                            {id}
                        </button>
                    ))}
                </header>
                <div styleName="app">
                    <App
                        json={this.props.json[this.state.activeId]}
                        togglePlay={() => this.props.conn.togglePlay(this.state.activeId)}
                        seek={time => this.props.conn.seek(this.state.activeId, time)}
                        detached={this.state.detached}
                        setDetached={(detached) => { this.setState({ detached }) }}
                    />
                </div>
            </div>
        )
    }
}
