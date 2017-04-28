export default class PageConnection {
    constructor (onJSON) {
        // Create a connection to the background page
        this._backgroundPageConnection = chrome.runtime.connect()

        this._backgroundPageConnection.postMessage({
            name: 'init',
            tabId: chrome.devtools.inspectedWindow.tabId,
        })
        this._backgroundPageConnection.onMessage.addListener((msg) => {
            console.log('got a message bro')
            console.log(msg)
            // document.getElementById('json').innerHTML = JSON.stringify(msg.payload)
            onJSON(msg.payload)
        })
    }
    requestJSONFromBackground () {
        this._backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            name: 'getJSON',
        })
    }
}
