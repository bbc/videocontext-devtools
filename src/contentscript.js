function retrieveJson() {
    var clientFunctionName = "__GET_VIDEOCONTEXT_JSON__"
    var tempAttrName = "__VIDEOCONTEXT_EXTENSION_tmp_json"
    var tempScriptId = "__VIDEOCONTEXT_EXTENSION_tmpScript"

    var scriptContent = "";
    scriptContent += "if (typeof " + clientFunctionName + " !== 'undefined') document.body.setAttribute('" + tempAttrName + "', JSON.stringify(" + clientFunctionName + "()));\n"

    var script = document.createElement('script');
    script.id = tempScriptId;
    script.appendChild(document.createTextNode(scriptContent));
    var scriptOwner = (document.body || document.head || document.documentElement)
    scriptOwner.appendChild(script);

    var result = null;
    if (document.body.hasAttribute(tempAttrName)) {
        result = JSON.parse(document.body.getAttribute(tempAttrName));
        document.body.removeAttribute(tempAttrName);
    }
    scriptOwner.removeChild(document.getElementById(tempScriptId))

    return result;
}

function togglePlay() {
    var videoContextVariable = "__VIDEOCONTEXT_REF__"
    var tempScriptId = "__VIDEOCONTEXT_EXTENSION_togglePlayScript"

    var scriptContent = "";
    scriptContent += "if (window." + videoContextVariable + ") { if (" + videoContextVariable + ".state === 0) { " + videoContextVariable + ".pause() } else { " + videoContextVariable + ".play() } }"

    var script = document.createElement('script');
    script.id = tempScriptId;
    script.appendChild(document.createTextNode(scriptContent));
    var scriptOwner = (document.body || document.head || document.documentElement)
    scriptOwner.appendChild(script);
    // scriptOwner.removeChild(document.getElementById(tempScriptId))
}

chrome.runtime.onMessage.addListener(msg => {
    if(msg.type === "askContentScriptForJSON") {
        chrome.runtime.sendMessage({
            type: "contentscriptSendingJSON",
            payload: retrieveJson(),
        });
        return;
    }

    if(msg.type === "tellContentScriptToTogglePlay") {
        togglePlay();
    }
})
