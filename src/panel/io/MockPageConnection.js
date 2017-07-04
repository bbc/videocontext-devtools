import mock from './mock.json'

export default class MockPageConnection {
    constructor (onJSON) {
        this._onJSON = onJSON
    }
    requestJSONFromBackground () {
        setTimeout(() => {
            this._onJSON(mock)
        }, 500)
    }

    togglePlay (id) {
        console.log(`Toggle play called for id ${id}. This does nothing.`)
    }

    seek (id, time) {
        console.log(`seek called with id ${id} and time ${time}. This does nothing.`)
    }
}
