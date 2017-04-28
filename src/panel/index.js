import ReactDOM from 'react-dom'
import React from 'react'
// import { PageConnection } from './io'
import { MockPageConnection as PageConnection } from './io'

function main () {
    const conn = new PageConnection((msg) => {
        console.log(msg)
    })
    conn.requestJSONFromBackground()
}

ReactDOM.render(
    <div>Hello world!!!!</div>,
    document.getElementById('app'),
    main,
)
