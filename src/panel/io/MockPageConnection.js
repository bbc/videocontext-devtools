import mock from './mock.json'

export default class MockPageConnection {
    constructor (onJSON) {
        this._onJSON = onJSON
    }
    requestJSONFromBackground () {
        setTimeout(() => {
            this._onJSON(mock)
        }, 0)
    }
}
