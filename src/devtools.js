chrome.devtools.panels.create("VideoContext",
    "icon.png",
    "panel/index.html",
    function(panel) {
      // code invoked on panel creation
    //   console.log("i made a panel");
      setInterval(() => {
        //   console.log("some regular task");
        //   console.log(panel);
      }, 1000)
    }
);
