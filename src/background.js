const connections = {}

chrome.runtime.onConnect.addListener((port) => {
    const extensionListener = (message) => {
        switch (message.name) {
        case 'init': {
            console.log('we have connected!!!')
            connections[message.tabId] = port
            break
        }
        case 'getJSON': {
            console.log('BG received message to get JSON')
            chrome.tabs.sendMessage(
                message.tabId,
                { type: 'askContentScriptForJSON' },
            )
            break
        }
        case 'togglePlay': {
            console.log('BG received message to toggle play')
            chrome.tabs.sendMessage(
                message.tabId,
                { type: 'tellContentScriptToTogglePlay', ctxId: message.ctxId },
            )
            break
        }
        case 'seek': {
            console.log('BG received message to seek to time ', message.time)
            chrome.tabs.sendMessage(
                message.tabId,
                { type: 'tellContentScriptToSeek', time: message.time, ctxId: message.ctxId },
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
        console.log('we are disconnecting!')
        const tabs = Object.keys(connections)

        tabs.forEach((tab) => {
            if (connections[tab] === port) {
                delete connections[tab]
            }
        })
    })
})

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener((request, sender) => {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
        const tabId = sender.tab.id
        if (tabId in connections) {
            connections[tabId].postMessage(request)
        } else {
            console.log('Tab not found in connection list.')
        }
    } else {
        console.log('sender.tab not defined.')
    }
    if (request.type === 'contentscriptSendingJSON') {
        console.log('json is', request.payload)
        console.log(sender.tab.id)
        console.log(connections)
        connections[sender.tab.id].postMessage(request)
    }
})
