/* eslint-env browser */
var debuglog = true

const dB = (signal) => -Math.round(20 * Math.log10(1 / signal))

/**
 * speechDetectionListeners
 *
 */

function hystogramLine(value) {

    const maxCharsperLine = 200
    const valueInChars = maxCharsperLine * value
    const char = '█'

    return char.repeat(valueInChars)

}


//
// signal handler
//
document.addEventListener('signal', event => {

    const volume = event.detail.volume.toFixed(9)
    const timestamp = event.detail.timestamp
    const items = event.detail.items.toString().padEnd(3)
    const dBV = dB(event.detail.volume)

    const line = hystogramLine(volume)

    if (debuglog)
        console.log(`signal  ${timestamp} ${items} ${volume} ${dBV} ${line}`)


})

//
// silence handler
//
document.addEventListener('silence', event => {
    // let input = document.querySelector('#status')
    // input.textContent = "Silence"

    const volume = event.detail.volume.toFixed(9)
    const timestamp = event.detail.timestamp
    const items = event.detail.items.toString().padEnd(3)
    const dBV = dB(event.detail.volume)

    if (debuglog)
        console.log(`silence ${timestamp} ${items} ${volume} ${dBV}`)


})

//
// mute handler
//
document.addEventListener('mute', event => {
    let input = document.querySelector('#status')
    input.textContent = "Mute"
    const volume = event.detail.volume.toFixed(9)
    const timestamp = event.detail.timestamp
    const dBV = dB(event.detail.volume)

    if (debuglog)
        console.log(`mute    ${timestamp} ${volume} ${dBV}`)


})


//
// prespeechstart handler
//
document.addEventListener('prespeechstart', event => {

    if (debuglog) {

        //const volume = event.detail.volume.toFixed(9)
        const timestamp = event.detail.timestamp
        //const dBV = dB(event.detail.volume)

        //cosnsole.log(`%cPRE SPEECH START    ${timestamp} ${volume} ${dBV}`, 'color:yellow')
        console.log(`%cPRE SPEECH START   ${timestamp}`, 'color:blue')

    }

    restartRecording()

})


//
// speechstart handler
//
document.addEventListener('speechstart', event => {
    let input = document.querySelector('#status')
    done.style.display = 'none'
    Mute.style.display = 'none'
    playing.style.display='block'
    listen.style.display='none'
    info.innerText='Recording'
    input.textContent = "Speech Start"
    if (debuglog) {

        //speechstartTime = event.detail.timestamp
        console.log('%cSPEECH START', 'color:greenyellow')
    }

    //startRecording()

})

//
// speechstop handler
//
document.addEventListener('speechstop', event => {
    done.style.display = 'block'
    Mute.style.display = 'none'
    playing.style.display='none'
    listen.style.display='none'
    info.innerText='Done'

    const duration = event.detail.duration
    let input = document.querySelector('#status')

    if (debuglog) {

        const averageSignalLevel = averageSignal()

        console.log('%cSPEECH STOP', 'color:lime')
        console.log(`Total Duration in msecs  : ${duration}`)
        console.log(`Signal Duration in msecs : ${duration - MAX_INTERSPEECH_SILENCE_MSECS}`)
        console.log(`Average Signal level     : ${averageSignalLevel}`)
        console.log(`Average Signal dB        : ${dB(averageSignalLevel)}`)
        console.log(' ')
    }

    stopRecording()

})

//
// speechabort handler
//
document.addEventListener('speechabort', event => {
    done.style.display = 'none'
    Mute.style.display = 'none'
    playing.style.display='none'
    listen.style.display='block'
    info.innerText='listening...'
    const abort = event.detail.abort

    let input = document.querySelector('#status')
    input.textContent = "Abort"

    if (debuglog) {

        const duration = event.detail.duration
        const averageSignalLevel = averageSignal()

        console.log('%cSPEECH ABORT', 'color:red')
        console.log(`Abort reason             : ${abort}`)
        console.log(`Total Duration in msecs  : ${duration}`)
        console.log(`Signal Duration in msecs : ${duration - MAX_INTERSPEECH_SILENCE_MSECS}`)
        console.log(`Average Signal level     : ${averageSignalLevel}`)
        console.log(`Average Signal dB        : ${dB(averageSignalLevel)}`)
        console.log(' ')
    }

    abortRecording()

})

//
// mutedmic handler
//
document.addEventListener('mutedmic', event => {

    let input = document.querySelector('#status')
    input.textContent = "Muted Mic"

    console.log('%cMICROPHONE MUTED', 'color:red')
    console.log(' ')

})

//
// unmutedmic handler
//
document.addEventListener('unmutedmic', event => {


    console.log('%cMICROPHONE UNMUTED', 'color:green')
    console.log(' ')

})



