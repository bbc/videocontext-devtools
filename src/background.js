const CONNECTIONS = {}

chrome.runtime.onConnect.addListener((port) => {
    const extensionListener = (message) => {
        switch (message.name) {
        case 'INIT': {
            console.log('Connected!')
            CONNECTIONS[message.tabId] = port
            break
        }
        case 'GET_JSON': {
            // console.log('BG received message to get JSON')
            chrome.tabs.sendMessage(
                message.tabId,
                { type: 'ASK_CONTENT_SCRIPT_FOR_JSON' },
            )
            break
        }
        case 'TOGGLE_PLAY': {
            // console.log('BG received message to toggle play')
            chrome.tabs.sendMessage(
                message.tabId,
                { type: 'TELL_CONTENT_SCRIPT_TO_TOGGLE_PLAY', ctxId: message.ctxId },
            )
            break
        }
        case 'SEEK': {
            // console.log('BG received message to seek to time ', message.time)
            chrome.tabs.sendMessage(
                message.tabId,
                { type: 'TELL_CONTENT_SCRIPT_TO_SEEK', time: message.time, ctxId: message.ctxId },
            )
            break
        }
        default:
            break
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener)

    port.onDisconnect.addListener(() => {
        port.onMessage.removeListener(extensionListener)
        console.log('Disconnecting!')
        const tabs = Object.keys(CONNECTIONS)

        tabs.forEach((tab) => {
            if (CONNECTIONS[tab] === port) {
                delete CONNECTIONS[tab]
            }
        })
    })
})

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener((request, sender) => {
    // Messages from content scripts should have sender.tab set
    if (!sender.tab) {
        console.log('Sender.tab is not defined.')
        return
    }

    const tabId = sender.tab.id
    if (!(tabId in CONNECTIONS)) {
        console.log('Tab not found in connection list.')
        return
    }

    // Respond to the message.
    switch (request.type) {
    case 'contentscriptSendingJSON':
        // console.log('BG sending JSON to devtools')
        CONNECTIONS[sender.tab.id].postMessage(request)
        break
    default:
        break
    }
})
