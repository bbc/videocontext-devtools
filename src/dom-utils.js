export function executeScript (scriptContent, id) {
    const tempScriptId = `__VIDEOCONTEXT_EXTENSION_${id}__`
    const script = document.createElement('script')
    script.id = tempScriptId
    script.appendChild(document.createTextNode(scriptContent))
    const scriptOwner = (document.body || document.head || document.documentElement)
    scriptOwner.appendChild(script)
    scriptOwner.removeChild(document.getElementById(tempScriptId))
}

export function executeScriptAndReadResultFromDOM (scriptContent, id, tempAttrName) {
    executeScript(scriptContent, id)

    // We expect that the script put some content into the DOM via the given
    // attribute name. If so, let's read it and remove the attr.
    let result = null
    if (document.body.hasAttribute(tempAttrName)) {
        result = document.body.getAttribute(tempAttrName)
        document.body.removeAttribute(tempAttrName)
    }
    return result
}
