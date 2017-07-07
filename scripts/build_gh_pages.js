const fs = require('fs-extra')
const path = require('path')
const exec = require('child_process').exec

const EXT_ID = 'jdeljafnglpkijfpgljefaeldobnobpn'
const PRIVATE_KEY_PATH = './scripts/videocontext-devtools.pem'
const UNPACKED_BUILD_FOLDER = './dist'
const BUILD_FOLDER = './docs'

const VERSION = JSON.parse(
    fs.readFileSync('./package.json'),
).version

const CRX_FILENAME = `videocontext-devtools_${VERSION}.crx`

const updatesXML = `<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='${EXT_ID}'>
    <updatecheck
        codebase='https://bbc.github.io/videocontext-devtools/${CRX_FILENAME}'
        version='${VERSION}'
    />
  </app>
</gupdate>
`

const indexHTML = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Install VideoContext dev tools</title>
    </head>
    <body>
        <h1>VideoContext Chrome DevTools Extension</h1>
        <p>To install the VideoContext DevTools extension (version ${VERSION}), follow these steps:
            <ol>
                <li>Download <a href="./${CRX_FILENAME}" download>this file</a>.</li>
                <li>Go to <code>chrome://extensions</code></li>
                <li>Drag the .crx file you just downloaded onto the extensions page.</li>
            </ol>
        </p>
        <p>Once you've done this, open your dev tools panel and look for the VideoContext dev tools.</p>
        <p>You only have to do this procedure once - from now on your browser should automatically keep the extension up to date.</p>
    </body>
</html>
`

const execPromise = cmd => new Promise((res, rej) => {
    exec(cmd, (error) => {
        if (error) {
            rej(error)
        } else {
            res()
        }
    })
})

async function main () {
    await fs.emptyDir(BUILD_FOLDER)

    console.log(`Packaging videocontext-devtools version ${VERSION}...`)
    console.log('')
    console.log('Packing crx...')

    const crxPath = path.join(BUILD_FOLDER, CRX_FILENAME)
    await execPromise(`extensionator -d ${UNPACKED_BUILD_FOLDER} -i ${PRIVATE_KEY_PATH} -o ${crxPath}`)
    console.log(`Created crx at ${crxPath}`)

    console.log('Creating new updates xml...')
    const updatesPath = path.join(BUILD_FOLDER, 'updates.xml')
    await fs.writeFile(updatesPath, updatesXML)
    console.log(`Wrote XML at ${updatesPath}`)

    console.log('Creating homepage xml...')
    const indexPath = path.join(BUILD_FOLDER, 'index.html')
    await fs.writeFile(indexPath, indexHTML)
    console.log(`Wrote HTML at ${indexPath}`)
}

main()
