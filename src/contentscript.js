const STORE_VARIABLE = '__VIDEOCONTEXT_REFS__'

function retrieveJson () {
    const tempAttrName = '__VIDEOCONTEXT_EXTENSION_tmp_json'
    const tempScriptId = '__VIDEOCONTEXT_EXTENSION_tmpScript'

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

    const script = document.createElement('script')
    script.id = tempScriptId
    script.appendChild(document.createTextNode(scriptContent))
    const scriptOwner = (document.body || document.head || document.documentElement)
    scriptOwner.appendChild(script)

    let result = null
    if (document.body.hasAttribute(tempAttrName)) {
        result = JSON.parse(document.body.getAttribute(tempAttrName))
        document.body.removeAttribute(tempAttrName)
    }
    scriptOwner.removeChild(document.getElementById(tempScriptId))

    return result
}

function executeScript (scriptContent, id) {
    const tempScriptId = `__VIDEOCONTEXT_EXTENSION_${id}__`
    const script = document.createElement('script')
    script.id = tempScriptId
    script.appendChild(document.createTextNode(scriptContent))
    const scriptOwner = (document.body || document.head || document.documentElement)
    scriptOwner.appendChild(script)
    scriptOwner.removeChild(document.getElementById(tempScriptId))
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
    case 'askContentScriptForJSON': {
        chrome.runtime.sendMessage({
            type: 'contentscriptSendingJSON',
            payload: retrieveJson(),
        })
        break
    }
    case 'tellContentScriptToTogglePlay': {
        togglePlay(msg.ctxId)
        break
    }
    case 'tellContentScriptToSeek': {
        seek(msg.ctxId, msg.time)
        break
    }
    default:
        break
    }
})
