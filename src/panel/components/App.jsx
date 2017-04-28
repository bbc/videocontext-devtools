import React from 'react'
// import { PageConnection } from '../io'
import { MockPageConnection as PageConnection } from '../io'
import Visualisation from './Visualisation.jsx'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = { json: null }
    }
    componentDidMount () {
        const conn = new PageConnection((msg) => {
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
            <div>
                <div>Connected: {this.state.json ? 'YEP' : 'NOPE'}</div>
                { this.state.json ? <Visualisation json={this.state.json} /> : null }
            </div>
        )
    }
}

export default App
