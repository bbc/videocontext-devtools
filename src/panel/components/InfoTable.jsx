import React from 'react'
import './InfoTable.scss'

export default ({ rows }) => (
    <table>
        <tbody>
            {rows.map(row => (
                <tr key={row[0]}>
                    <td styleName="key">{row[0]}:</td><td styleName="value">{row[1]}</td>
                </tr>
            ))}
        </tbody>
    </table>
)
