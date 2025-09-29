let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeDisplay = document.getElementById("current-time");
let durationTimeDisplay = document.getElementById("duration-time");

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

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

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

progress.oninput = function(){
    progress.dragging = true;
    currentTimeDisplay.textContent = formatTime(progress.value);
}

progress.onchange = function(){
    song.currentTime = progress.value;
    progress.dragging = false;
}