const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
};

export class MusicPlayer {
    constructor(elements) {
        this.elements = elements;
        this.elements.progress.dragging = false;
    }

    initializeMetadata() {
        const { progress, song, durationTimeDisplay } = this.elements;
        progress.max = song.duration;
        durationTimeDisplay.textContent = formatTime(song.duration);
    }

    togglePlayPause() {
        const { song, ctrlIcon } = this.elements;
        
        if (song.paused) {
            song.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        } else {
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
        }
    }

    updateTime() {
        const { progress, song, currentTimeDisplay } = this.elements;
        if (!progress.dragging) {
            progress.value = song.currentTime;
            currentTimeDisplay.textContent = formatTime(song.currentTime);
        }
    }

    handleSongEnd() {
        const { ctrlIcon, progress, currentTimeDisplay } = this.elements;
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        progress.value = 0;
        currentTimeDisplay.textContent = '0:00';
    }

    startDragging() {
        const { progress, currentTimeDisplay } = this.elements;
        progress.dragging = true;
        currentTimeDisplay.textContent = formatTime(progress.value);
    }

    seekToNewTime() {
        const { song, progress } = this.elements;
        song.currentTime = progress.value;
        progress.dragging = false;
    }
}