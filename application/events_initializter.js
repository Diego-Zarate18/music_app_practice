import { elements } from './html_elements.js';
import { MusicPlayer } from './player.js';

export function initializeEvents() {
    const player = new MusicPlayer(elements);

    const { song, progress, ctrlIcon } = elements;

    song.onloadedmetadata = () => player.initializeMetadata();
    song.ontimeupdate = () => player.updateTime();
    song.onended = () => player.handleSongEnd();

    ctrlIcon.parentElement.onclick = () => player.togglePlayPause();

    progress.oninput = () => player.startDragging();
    progress.onchange = () => player.seekToNewTime();
}
