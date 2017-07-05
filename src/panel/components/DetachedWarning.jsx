import React from 'react'
import './DetachedWarning.scss'

export default ({ onClick }) => (
    <div styleName="main">
        <p styleName="copy">
            <span styleName="bold">Warning:</span>{` You are now in 'detached' mode. This lets you inspect
            the VideoContext graph without it constantly re-rendering while
            you inspect it. To get the graph updating again, press the
            'Undetach' button.`}
        </p>
        <button
            onClick={onClick}
        >
            Undetach
        </button>
    </div>
)
