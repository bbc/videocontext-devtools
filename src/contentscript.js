function retrieveWindowVariables(variables) {
    var ret = {};

    var scriptContent = "";
    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i];
        scriptContent += "if (typeof " + currVariable + " !== 'undefined') document.body.setAttribute('tmp_" + currVariable + "', JSON.stringify(" + currVariable + "));\n"
    }

    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    (document.body || document.head || document.documentElement).appendChild(script);

    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i];
        ret[currVariable] = JSON.parse(document.body.getAttribute("tmp_" + currVariable));
        document.body.removeAttribute("tmp_" + currVariable);
    }

     document.body.removeChild(document.getElementById("tmpScript"))

    return ret;
}

chrome.runtime.onMessage.addListener(() => {
    chrome.runtime.sendMessage({ type: "contentscriptSendingJSON", payload: retrieveWindowVariables(["foo"]) })
    console.log("I got a message!!!");
})
