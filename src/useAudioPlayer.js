import { ref } from 'vue'

const currentTrack = ref(null)
const isPlaying = ref(false)

function playTrack(track, audioRef) {
    if (!track || !track.audioUrl || !audioRef?.value) return
    const audio = audioRef.value

    const isSameTrack = currentTrack.value?.id === track.id

    if (isSameTrack && isPlaying.value) {
        audio.pause()
        isPlaying.value = false
        return
    }

    if (!isSameTrack) {
        currentTrack.value = track
        if (audio.src !== track.audioUrl) {
            audio.src = track.audioUrl
        }
        audio.currentTime = 0
    }

    audio.play()
    isPlaying.value = true
}



export function useAudioPlayer() {
    return {
        currentTrack,
        isPlaying,
        playTrack
    }
}
