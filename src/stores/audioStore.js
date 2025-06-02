import { ref } from 'vue'

const currentTrack = ref(null)
const isPlaying = ref(false)

const duration = ref(0)
const currentTime = ref(0)
const audioRef = ref(null)

const trackQueue = ref([])
const queueIndex = ref(0)

const isShuffle = ref(false)
const repeatMode = ref('off') // 'off' | 'all' | 'one'

function setAudioRef(ref) {
    audioRef.value = ref

    if (audioRef.value) {
        audioRef.value.onended = () => {
            handleTrackEnd()
        }
    }
}

function setTrack(track) {
    currentTrack.value = track
}

async function playCurrent() {
    const track = trackQueue.value[queueIndex.value]

    if (!track) return

    const isSameTrack = currentTrack.value?.id === track.id

    currentTrack.value = track
    isPlaying.value = true

    try {
        await fetch(`http://localhost:5240/api/track/${track.id}/play`, {
            method: 'POST'
        })
    } catch (e) {
        console.error('Не удалось увеличить playCount:', e)
    }

    if (audioRef.value) {
        audioRef.value.src = track.audio
        audioRef.value.load()
        audioRef.value.oncanplay = async () => {
            try {
                await audioRef.value.play()
            } catch (e) {
                console.error('Ошибка при воспроизведении:', e)
            }
        }
    }
}


function playNext() {
    const isLastTrack = queueIndex.value + 1 >= trackQueue.value.length

    if (repeatMode.value === 'one') {
        if (audioRef.value) {
            audioRef.value.currentTime = 0
            audioRef.value.pause()
            audioRef.value.load()
            audioRef.value.oncanplay = () => {
                audioRef.value.play()
            }
        }
        return
    }

    if (!isLastTrack) {
        queueIndex.value++
        playCurrent()
    } else if (repeatMode.value === 'all') {
        queueIndex.value = 0
        playCurrent()
    } else {
        isPlaying.value = false
    }
}

function playPrev() {
    if (queueIndex.value > 0) {
        queueIndex.value--
        playCurrent()
    }
}

function setQueue(tracks, index) {
    if (isShuffle.value) {
        const firstTrack = tracks[index]
        const remaining = tracks.slice()
        remaining.splice(index, 1)
        const shuffled = [firstTrack, ...shuffleArray(remaining)]
        trackQueue.value = shuffled
        queueIndex.value = 0
    } else {
        trackQueue.value = tracks
        queueIndex.value = index
    }
}

async function play(track) {
    if (!track) return

    currentTrack.value = track
    isPlaying.value = true

    try {
        await fetch(`http://localhost:5240/api/track/${track.id}/play`, {
            method: 'POST'
        })
    } catch (e) {
        console.error('Не удалось увеличить playCount:', e)
    }

    if (audioRef.value) {
        audioRef.value.src = track.audio
        audioRef.value.load()

        audioRef.value.oncanplay = async () => {
            try {
                await audioRef.value.play()
            } catch (err) {
                console.error('Ошибка при воспроизведении:', err)
            }
        }
    }
}

function pause() {
    isPlaying.value = false
    if (audioRef.value) audioRef.value.pause()
}

function togglePlay() {
    isPlaying.value ? pause() : play(currentTrack.value)
}

function setCurrentTime(value) {
    currentTime.value = value
}

function setDuration(value) {
    duration.value = value
}

function toggleShuffle() {
    isShuffle.value = !isShuffle.value

    if (isShuffle.value) {
        const current = trackQueue.value[queueIndex.value]
        const remaining = trackQueue.value.slice()
        remaining.splice(queueIndex.value, 1)
        const shuffled = [current, ...shuffleArray(remaining)]
        trackQueue.value = shuffled
        queueIndex.value = 0
    }
}

function shuffleArray(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

function toggleRepeatMode() {
    if (repeatMode.value === 'off') {
        repeatMode.value = 'all'
    } else if (repeatMode.value === 'all') {
        repeatMode.value = 'one'
    } else {
        repeatMode.value = 'off'
    }
}

function handleTrackEnd() {
    if (repeatMode.value === 'one') {
        audioRef.value.currentTime = 0
        audioRef.value.play()
        return
    }

    if (queueIndex.value + 1 < trackQueue.value.length) {
        queueIndex.value++
        playCurrent()
    } else if (repeatMode.value === 'all') {
        queueIndex.value = 0
        playCurrent()
    } else {
        isPlaying.value = false
    }
}

async function fetchRecommendations(userId) {
    try {
        const response = await fetch(`http://localhost:5240/api/user/recommendations/${userId}`);
        if (!response.ok) {
            console.error('Ошибка при запросе рекомендаций:', response.statusText);
            return;
        }
        const recommendedTracks = await response.json();
        if (recommendedTracks.length > 0) {
            setQueue(recommendedTracks, 0);
        }
    } catch (e) {
        console.error('Не удалось получить рекомендации:', e);
    }
}

export function useAudioStore() {
    return {
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        queueIndex,
        trackQueue,
        setTrack,
        setAudioRef,
        setQueue,
        playCurrent,
        playNext,
        playPrev,
        togglePlay,
        play,
        pause,
        setCurrentTime,
        setDuration,
        isShuffle,
        toggleShuffle,
        shuffleArray,
        repeatMode,
        toggleRepeatMode,
        fetchRecommendations,
    }
}
