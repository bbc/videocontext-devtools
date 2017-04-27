// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect();

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

const time = document.getElementById("time");
let i = 0
setInterval(() => {
    time.innerHTML = i;
    i++;
    backgroundPageConnection.postMessage({
        tabId: chrome.devtools.inspectedWindow.tabId,
        name: 'getJSON',
    })
}, 1000)

backgroundPageConnection.onMessage.addListener((msg) => {
    console.log("got a message bro");
    console.log(msg);
    document.getElementById("json").innerHTML = JSON.stringify(msg.payload);
})
