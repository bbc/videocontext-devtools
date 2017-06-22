export default class PageConnection {
    constructor (onJSON) {
        // Create a connection to the background page
        this._backgroundPageConnection = chrome.runtime.connect()

        this._backgroundPageConnection.postMessage({
            name: 'init',
            tabId: chrome.devtools.inspectedWindow.tabId,
        })
        this._backgroundPageConnection.onMessage.addListener((msg) => {
            onJSON(msg.payload)
        })
    }
    requestJSONFromBackground () {
        this._backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            name: 'getJSON',
        })
    }

    togglePlay () {
        this._backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            name: 'togglePlay',
        })
    }

    seek (time) {
        this._backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            name: 'seek',
            time,
        })
    }
}
