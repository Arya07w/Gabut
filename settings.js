document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.getElementById("settingsButton");
    const settingsMenu = document.getElementById("settingsMenu");
    const toggleMusicButton = document.getElementById("toggleMusic");
    const backgroundMusic = document.getElementById("backgroundMusic");

    let musicOn = false;

    settingsButton.addEventListener("click", function () {
        settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
    });

    toggleMusicButton.addEventListener("click", function () {
        musicOn = !musicOn;
        backgroundMusic.volume = 0.5; // Set volume ke 50%
        if (musicOn) {
            backgroundMusic.play();
            toggleMusicButton.textContent = "Musik: Hidup";
        } else {
            backgroundMusic.pause();
            toggleMusicButton.textContent = "Musik: Mati";
        }
    });

    // Klik di luar menu untuk menutup
    document.addEventListener("click", function (event) {
        if (!settingsButton.contains(event.target) && !settingsMenu.contains(event.target)) {
            settingsMenu.style.display = "none";
        }
    });
});
