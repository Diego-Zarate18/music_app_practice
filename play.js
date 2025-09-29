let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let currentTimeDisplay = document.getElementById("current-time");
let durationTimeDisplay = document.getElementById("duration-time");

let updateInterval;

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

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        clearInterval(updateInterval); 
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        
        updateInterval = setInterval(() => {
            progress.value = song.currentTime;
            currentTimeDisplay.textContent = formatTime(song.currentTime);
            
            if (song.ended) {
                clearInterval(updateInterval);
                ctrlIcon.classList.remove("fa-pause");
                ctrlIcon.classList.add("fa-play");
                progress.value = 0;
                currentTimeDisplay.textContent = '0:00';
            }
        }, 500);
    }
}

progress.onchange = function(){
    song.currentTime = progress.value; 
    
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        
        if (!updateInterval) {
            playPause(); 
        }
    }
    
    currentTimeDisplay.textContent = formatTime(song.currentTime); 
}