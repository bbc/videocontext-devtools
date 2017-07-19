import mock from './mock.json'

export default class MockPageConnection {
    async requestJSONFromBackground () {
        return new Promise((res) => {
            setTimeout(() => {
                res(mock)
            }, 500)
        })
    }

    async togglePlay (id) {
        console.log(`Toggle play called for id ${id}. This does nothing.`)
    }

    async seek (id, time) {
        console.log(`seek called with id ${id} and time ${time}. This does nothing.`)
    }
}
