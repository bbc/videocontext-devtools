import React from 'react'
import { PageConnection as LivePageConnection, MockPageConnection } from '../io'
import TabManager from './TabManager.jsx'
import Loading from './Loading.jsx'
import './Connector.scss'

let PageConnection = LivePageConnection

if (process.env.NODE_ENV !== 'production') {
    PageConnection = MockPageConnection
}

export default class Connector extends React.Component {
    constructor (props) {
        super(props)
        this.conn = new PageConnection()
        this.state = {
            json: null,
        }
    }
    componentDidMount () {
        this._timer = setInterval(async () => {
            const json = await this.conn.requestJSONFromBackground()
            this.setState({ json })
        }, 100)
    }
    componentWillUnmount () {
        clearInterval(this._timer)
    }

    render () {
        return (<div styleName="main">
            {this.state.json ? <TabManager conn={this.conn} json={this.state.json} /> : <Loading />
            }
        </div>)
    }
}
