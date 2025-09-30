song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
    durationTimeDisplay.textContent = formatTime(song.duration);
}

song.ontimeupdate = function() {
    if (!progress.dragging) {
        progress.value = song.currentTime;
        currentTimeDisplay.textContent = formatTime(song.currentTime);
    }
}

song.onended = function() {
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    progress.value = 0;
    currentTimeDisplay.textContent = '0:00';
}

progress.oninput = function(){
    progress.dragging = true;
    currentTimeDisplay.textContent = formatTime(progress.value);
}

progress.onchange = function(){
    song.currentTime = progress.value;
    progress.dragging = false;
}