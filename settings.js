const settingsButton = document.getElementById("settingsButton");
const settingsMenu = document.getElementById("settingsMenu");
const toggleMusicButton = document.getElementById("toggleMusic");
const backgroundMusic = document.getElementById("backgroundMusic");
let isMusicPlaying = false;

settingsButton.addEventListener("click", () => {
    settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
});

toggleMusicButton.addEventListener("click", () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        toggleMusicButton.textContent = "Musik: Mati";
    } else {
        backgroundMusic.play();
        toggleMusicButton.textContent = "Musik: Nyala";
    }
    isMusicPlaying = !isMusicPlaying;
});
