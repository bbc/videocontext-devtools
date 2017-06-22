var VIDEOCONTEXT_VARIABLE = "__VIDEOCONTEXT_REF__"

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

function executeScript(scriptContent, id) {
    var tempScriptId = "__VIDEOCONTEXT_EXTENSION_" + id + "__"
    var script = document.createElement('script');
    script.id = tempScriptId;
    script.appendChild(document.createTextNode(scriptContent));
    var scriptOwner = (document.body || document.head || document.documentElement)
    scriptOwner.appendChild(script);
    scriptOwner.removeChild(document.getElementById(tempScriptId))
}

function togglePlay() {
    var scriptContent = "if (window." + VIDEOCONTEXT_VARIABLE + ") { if (" + VIDEOCONTEXT_VARIABLE + ".state === 0) { " + VIDEOCONTEXT_VARIABLE + ".pause() } else { " + VIDEOCONTEXT_VARIABLE + ".play() } }";
    executeScript(scriptContent, "togglePlay");
}


function seek (time) {
    var scriptContent = "if (window." + VIDEOCONTEXT_VARIABLE + ") { " + VIDEOCONTEXT_VARIABLE + ".currentTime = " + time + "; }";
    executeScript(scriptContent, "seek");
}

chrome.runtime.onMessage.addListener(msg => {
    switch (msg.type) {
    case "askContentScriptForJSON": {
        chrome.runtime.sendMessage({
            type: "contentscriptSendingJSON",
            payload: retrieveJson(),
        });
        return;
    }
    case "tellContentScriptToTogglePlay": {
        togglePlay();
        return;
    }
    case "tellContentScriptToSeek": {
        seek(msg.time);
        return;
    }
    default:
        return;
    }
})
