import flvjs from 'flv.js'

const $ = document.getElementById.bind(document)

const videoContainer = $('video_container')!
const video = $('main_video') as HTMLVideoElement
const overArea = $('over_area')!
const fsBtn = $('fs')!
const playpause = $('playpause')!
const mute = $('mute')!
const volume = $('volume') as HTMLInputElement
const streamInput = $('stream_url') as HTMLInputElement
let flvPlayer: flvjs.Player | undefined

const savedVolume = localStorage.getItem('volume')
console.log('savedVolume', Number.parseFloat(savedVolume!))
video.volume = Number.parseFloat(savedVolume!) || 0.1
video.addEventListener('volumechange', () => {
  localStorage.setItem('volume', video.volume.toString())
})

video.addEventListener('playing', () => {
  videoContainer.style.width = video.videoWidth / devicePixelRatio + 'px'
  volume.value = (video.volume*100).toString()
})
playpause.addEventListener('click', () => {
  if (video.paused || video.ended) video.play()
  else video.pause()
})
mute.addEventListener('click', () => {
  video.muted = !video.muted
})
fsBtn.addEventListener('click', () => {
  if (document.fullscreen) {
    document.exitFullscreen()
  } else {
    videoContainer.requestFullscreen()
  }
})
volume.addEventListener('input', () => {
  video.volume = Number.parseInt(volume.value) / 100
})

overArea.addEventListener('mouseenter', (event) => {
  overArea.dataset.controlsState = 'show'
})
overArea.addEventListener('mouseleave', (event) => {
  overArea.dataset.controlsState = 'hide'
})

$('load')?.addEventListener('submit', event => {
  event.preventDefault()
  const url = streamInput.value
  if (flvPlayer) {
    flvPlayer.detachMediaElement()
    flvPlayer.destroy()
  }
  flvPlayer = flvjs.createPlayer({
    type: 'flv',
    isLive: true,
    url,
  }, {
    enableStashBuffer: false,
  })
  flvPlayer.attachMediaElement(video)
  flvPlayer.load()
  flvPlayer.play()

  if (url) {
    const params = new URLSearchParams(location.search)
    const stream = params.get('stream')
    if (stream !== url) history.pushState(null, '', '?stream=' + encodeURIComponent(url))
  }
})

window.addEventListener('popstate', insertURL)
window.addEventListener('load', insertURL)
function insertURL () {
  const params = new URLSearchParams(location.search)
  const url = params.get('stream')
  if (url) {
    streamInput.value = url
  }
}
