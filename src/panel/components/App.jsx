import React from 'react'
import { PageConnection } from '../io'
// import { MockPageConnection as PageConnection } from '../io'
import Visualisation from './Visualisation.jsx'
import './App.css'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            json: null,
            detached: false,
        }
    }
    componentDidMount () {
        const conn = new PageConnection((msg) => {
            if (this.state.detached) {
                return
            }
            if (msg) {
                this.setState({ json: msg })
            } else {
                this.setState({ json: null })
            }
        })
        this._timer = setInterval(() => {
            conn.requestJSONFromBackground()
        }, 100)
    }
    componentWillUnmount () {
        clearInterval(this._timer)
    }

    render () {
        return (
            <div
                styleName="main"
                style={{
                    backgroundColor: this.state.detached ? '#ffeaea' : '#fff',
                    width: '100%',
                    height: '100%',
                }}
            >
                <button
                    onClick={() => this.setState({ detached: false })}
                    style={{ opacity: this.state.detached ? 1 : 0 }}
                >Undetach</button>
                { this.state.json ?
                    <Visualisation
                        json={this.state.json}
                        onZoom={() => {
                            if (!this.state.detached) {
                                // might be able to replace this with some logic
                                // in Visualisation
                                this.setState({ detached: true })
                            }
                        }}
                    /> :
                    <div>Connecting...</div>
                }
            </div>
        )
    }
}

export default App
