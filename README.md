# VideoContext Dev Tools

A handy addition to your Chrome Dev Tools for VideoContext. Requires VideoContext v0.50+.

To install it, follow the instructions at <https://bbc.github.io/videocontext-devtools/>. Once the extension is installed, open an app with a running instance of VideoContext (you can find a ready-made one [here](http://bbc.github.io/VideoContext/examples/transitions.html)), open your Chrome DevTools and navigate to the VideoContext DevTools tab.

## Identifying running instances

VideoContext automatically registers instances with the Dev Tools and identifies it with an amusing randomly generated name. If you want to manually specify the name that appears in the Dev Tools, then set the VideoContext ID:

```js
const ctx = new VideoContext(canvas)
ctx.id = "my chosen id"
```

## Developing
This extension is formed of two parts - the frontend (the user-facing UI), and the backend (underlying machinery to allow the dev tools extension to pull data from the DOM about running VideoContext instances).

To develop the frontend, run `yarn start`. This starts a webpack dev server which lets you tweak the frontend (which is backed by a mock data source).

Developing the backend is a little odd as Chrome requires you to jump through some weird hoops to read the DOM/JS environment of the main web page. A Dev Tools UI extension is only allowed to talk to a "Background Script". The Background Script can then send messages to a "Content Script". A Content Script is a JavaScript file that **does** have access to the DOM but **doesn't** share JS context with the main web page (ie, they have different `window` variables).

So the way the Content Script gets the state of a VideoContext is:
1. When a user instantiates a VideoContext instance, VideoContext will automatically attach a reference to a global variable: `window.__VIDEOCONTEXT_REFS__[ctx.id] = ctx`.
2. The Dev Tools UI sends a message to the Background Script asking for the state of all registered VideoContext instances.
3. The Background Script forwards this message to the running Content Script.
4. The Content Script attaches a temporary `<script>` tag to the DOM that calls `JSON.stringify(ctx.snapshot())` for each VideoContext instance, and puts the resulting string into a temporary DOM element.
5. The Content Script then reads the JSON string from the temporary DOM element, and then deletes the temporary DOM element and script tag. It forwards the JSON to the Background Script, which forwards it to the Dev Tools UI.

A similar procedure happens to make the play/pause/scrub controls work.
