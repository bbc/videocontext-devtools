# Usage

To hook into this extension from a webpage running VideoContext, use the following:

```js
// create your VideoContext as normal
const ctx = new VideoContext(...)

// Now create a hook to let the extension retrieve the state of the VideoContext
window.__GET_VIDEOCONTEXT_JSON__ = () => VideoContext.exportToJSON(ctx)
```
