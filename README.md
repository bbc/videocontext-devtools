# Usage

To hook into this extension from a webpage running VideoContext, use the following:

```js
// create your VideoContext as normal
const ctx = new VideoContext(...)

// Now create a hook to let the extension retrieve the state of the VideoContext
window.__GET_VIDEOCONTEXT_JSON__ = () => VideoContext.snapshot(ctx)
window.__VIDEOCONTEXT_REF__ = ctx
```

These refs need a tidy up. Hopefully soon we can just let videocontext hook itself into `window` itself so we don't need any user interaction (except maybe for setting an ID).
