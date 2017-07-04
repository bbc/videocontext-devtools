import { executeScript, executeScriptAndReadResultFromDOM } from './dom-utils'

const STORE_VARIABLE = '__VIDEOCONTEXT_REFS__'

function readStateOfVideoContextInstances () {
    const tempAttrName = '__VIDEOCONTEXT_EXTENSION_tmp_json'

    const scriptContent = `
        if (window.${STORE_VARIABLE}) {
            var json = {}
            Object.keys(window.${STORE_VARIABLE}).map(id => {
                json[id] = ${STORE_VARIABLE}[id].snapshot()
            });
            document.body.setAttribute(
                '${tempAttrName}',
                JSON.stringify(json)
            );
        }`

    return JSON.parse(executeScriptAndReadResultFromDOM(scriptContent, 'getJSON', tempAttrName))
}

function togglePlay (ctxId) {
    const scriptContent = `
        var ctxId = "${ctxId}";
        if (window.${STORE_VARIABLE} && window.${STORE_VARIABLE}[ctxId]) {
            var ctx = ${STORE_VARIABLE}[ctxId];
            if (ctx.state === 0) {
                ctx.pause()
            } else {
                ctx.play()
            }
        }`
    executeScript(scriptContent, 'togglePlay')
}

function seek (ctxId, time) {
    const scriptContent = `
        var ctxId = "${ctxId}";
        if (window.${STORE_VARIABLE} && window.${STORE_VARIABLE}[ctxId]) {
            var ctx = ${STORE_VARIABLE}[ctxId];
            ctx.currentTime = ${time};
        }`

    executeScript(scriptContent, 'seek')
}

chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.type) {
    case 'ASK_CONTENT_SCRIPT_FOR_JSON': {
        chrome.runtime.sendMessage({
            type: 'contentscriptSendingJSON',
            payload: readStateOfVideoContextInstances(),
        })
        break
    }
    case 'TELL_CONTENT_SCRIPT_TO_TOGGLE_PLAY': {
        togglePlay(msg.ctxId)
        break
    }
    case 'TELL_CONTENT_SCRIPT_TO_SEEK': {
        seek(msg.ctxId, msg.time)
        break
    }
    default:
        break
    }
})
