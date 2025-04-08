import { ref } from 'vue'

const currentTrack = ref(null)
const isPlaying = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const audioRef = ref(null)

function setTrack(track) {
    currentTrack.value = track
}

function setAudioRef(ref) {
    audioRef.value = ref
}

function play(track) {
    currentTrack.value = track
    isPlaying.value = true

    if (audioRef.value) {
        audioRef.value.src = track.audioUrl
        audioRef.value.play()
    }
}

function togglePlay() {
    if (audioRef.value) {
        if (isPlaying.value) {
            audioRef.value.pause()
        } else {
            audioRef.value.play()
        }
    }
    isPlaying.value = !isPlaying.value
}

function pause() {
    isPlaying.value = false
    if (audioRef.value) {
        audioRef.value.pause()
    }
}

function setCurrentTime(value) {
    currentTime.value = value
}

function setDuration(value) {
    duration.value = value
}

export function useAudioStore() {
    return {
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        setTrack,
        play,
        pause,
        togglePlay,
        setCurrentTime,
        setDuration,
        setAudioRef,
    }
}
