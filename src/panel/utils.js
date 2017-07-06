export const leftPad = (num, size) => (`000000000${num}`).substr(-size)

export const toTwoDecimalPlaces = num => Math.round(num * 100) / 100

export const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - (minutes * 60))
    return `${minutes}:${leftPad(toTwoDecimalPlaces(seconds), 2)}`
}

export const maxStopTimeForNodes = nodes => Math.max(...nodes
    .map(n => n.stop)
    .filter(t => t != null)) // filter out any that we don't yet know the time for.

export const convertStateEnum = (num) => {
    switch (num) {
    case 0:
        return 'Playing'
    case 1:
        return 'Paused'
    case 2:
        return 'Stalled'
    case 3:
        return 'Ended'
    case 4:
        return 'Broken'
    default:
        return `ERROR: unknown state with code ${num}`
    }
}
