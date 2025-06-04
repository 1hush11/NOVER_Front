export function getTrackCoverPath(fileName) {
    if (!fileName || fileName.trim() === '') {
        return 'http://localhost:5240/Resources/TrackCovers/empty.png'
    }
    return `http://localhost:5240/Resources/TrackCovers/${fileName}`
}  

export function getTrackAudioPath(audioFileName) {
    return `http://localhost:5240/Resources/TrackAudios/${audioFileName}`
}

export function getAlbumCoverPath(coverFileName) {
    if (!coverFileName || coverFileName.trim() === '') {
        return 'http://localhost:5240/Resources/AlbumCovers/empty.png'
    }
    return `http://localhost:5240/Resources/AlbumCovers/${coverFileName}`
}

export function getPlaylistCoverPath(coverFileName) {
    if (!coverFileName || coverFileName.trim() === '') {
        return 'http://localhost:5240/Resources/PlaylistCovers/empty.png'
    }
    return `http://localhost:5240/Resources/PlaylistCovers/${coverFileName}`
}

export function getSingerPhotoPath(photoFileName) {
    if (!photoFileName || photoFileName.trim() === '') {
        return 'http://localhost:5240/Resources/SingerCovers/empty.png'
    }
    return `http://localhost:5240/Resources/SingerCovers/${photoFileName}`
}

export function getGenreCoverPath(coverFileName) {
    if (!coverFileName || coverFileName.trim() === '') {
        return 'http://localhost:5240/Resources/GenreCovers/empty.png'
    }
    return `http://localhost:5240/Resources/GenreCovers/${coverFileName}`
}

export function getUserAvatarPath(fileName) {
    if (!fileName || fileName.trim() === '') {
        return 'http://localhost:5240/Resources/UserCovers/empty.png'
    }
    return `http://localhost:5240/Resources/UserCovers/${fileName}`
}