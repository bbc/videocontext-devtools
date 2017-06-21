import React from 'react'
import Visualisation from './Visualisation.jsx'
import './App.scss'

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
                <button
                    onClick={() => this.setState({ detached: false })}
                    style={{ opacity: this.state.detached ? 1 : 0 }}
                >Undetach</button>
                <Visualisation
                    detached={this.state.detached}
                    json={this.props.json}
                    onZoom={() => {
                        if (!this.state.detached) {
                            // might be able to replace this with some logic
                            // in Visualisation
                            this.setState({ detached: true })
                        }
                    }}
                />
            </div>
        )
    }
}
