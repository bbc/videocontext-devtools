export default class PageConnection {
    constructor (onJSON) {
        // Create a connection to the background page
        this._backgroundPageConnection = chrome.runtime.connect()

        this._backgroundPageConnection.postMessage({
            name: 'INIT',
            tabId: chrome.devtools.inspectedWindow.tabId,
        })
        this._backgroundPageConnection.onMessage.addListener((msg) => {
            onJSON(msg.payload)
        })
    }
    requestJSONFromBackground () {
        this._backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            name: 'GET_JSON',
        })
    }

    togglePlay (id) {
        this._backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            name: 'TOGGLE_PLAY',
            ctxId: id,
        })
    }

    seek (id, time) {
        this._backgroundPageConnection.postMessage({
            tabId: chrome.devtools.inspectedWindow.tabId,
            name: 'SEEK',
            time,
            ctxId: id,
        })
    }
}
