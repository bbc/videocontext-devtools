var connections = {};

chrome.runtime.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {

        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
            console.log("we have connected!!!");
          connections[message.tabId] = port;
          return;
        }

        // other message handling
        if (message.name === "getJSON") {
            console.log("BG received message to get JSON");
            chrome.tabs.sendMessage(
                message.tabId,
                { type: "askContentScriptForJSON" }
            )
            // console.log(chrome.tabs);
            //SEND MESSAGE TO CONTENT SCRIPT USING chrome.tabs.sendMessage. this will then send a message which we deal with in chrome.runtime.onMessage, which will then pass the result to panel.js
            return
        }

        if (message.name === "togglePlay") {
            console.log("BG received message to toggle play");
            chrome.tabs.sendMessage(
                message.tabId,
                { type: "tellContentScriptToTogglePlay" }
            )
            return
        }

        if (message.name === "seek") {
            console.log("BG received message to seek to time ", message.time);
            chrome.tabs.sendMessage(
                message.tabId,
                { type: "tellContentScriptToSeek", time: message.time }
            )
        }
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);
        console.log("we are disconnecting!");
        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]]
            break;
          }
        }
    });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
      var tabId = sender.tab.id;
      if (tabId in connections) {
        connections[tabId].postMessage(request);
      } else {
        console.log("Tab not found in connection list.");
      }
    } else {
      console.log("sender.tab not defined.");
    }
    if (request.type === "contentscriptSendingJSON") {
        console.log("json is", request.payload);
        console.log(sender.tab.id);
        console.log(connections);
        connections[sender.tab.id].postMessage(request);
    }
    return true;
});
