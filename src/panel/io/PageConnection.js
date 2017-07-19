const STORE_VARIABLE = '__VIDEOCONTEXT_REFS__'

const runScript = script => new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(`(function () { ${script} })()`, (result, isException) => {
        if (isException) {
            console.log(isException)
            reject()
        } else {
            resolve(result)
        }
    })
})

export default class PageConnection {
    async requestJSONFromBackground () {
        const json = await runScript(`
            if (window.${STORE_VARIABLE}) {
                var json = {}
                Object.keys(window.${STORE_VARIABLE}).map(id => {
                    json[id] = ${STORE_VARIABLE}[id].snapshot()
                });
                return json
            }
            return null
        `)

        return json
    }

    async togglePlay (id) {
        const script = `
            var ctxId = "${id}";
            if (window.${STORE_VARIABLE} && window.${STORE_VARIABLE}[ctxId]) {
                var ctx = ${STORE_VARIABLE}[ctxId];
                if (ctx.state === 0) {
                    ctx.pause()
                } else {
                    ctx.play()
                }
            }`
        await runScript(script)
    }

    async seek (id, time) {
        const script = `
            var ctxId = "${id}";
            if (window.${STORE_VARIABLE} && window.${STORE_VARIABLE}[ctxId]) {
                var ctx = ${STORE_VARIABLE}[ctxId];
                ctx.currentTime = ${time};
            }`
        await runScript(script)
    }
}
