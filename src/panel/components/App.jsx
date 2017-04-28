import React from 'react'
import VideoContextVisualisation from '@bbc/visualise-videocontext'
import { PageConnection } from '../io'
// import { MockPageConnection as PageConnection } from '../io'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = { connected: false }
    }
    componentDidMount () {
        const vis = new VideoContextVisualisation(this._ref)

        const conn = new PageConnection((msg) => {
            if (msg) {
                vis.setData(msg)
                vis.render()
                this.setState({ connected: true })
            } else {
                this.setState({ connected: false })
            }
        })
        this._timer = setInterval(() => {
            conn.requestJSONFromBackground()
        }, 100)
    }

    render () {
        return (
            <div>
                <div>Connected: {this.state.connected ? 'YEP' : 'NOPE'}</div>
                <div
                    ref={(ref) => { this._ref = ref }}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>
        )
    }
}

export default App
