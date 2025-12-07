function setupCustomPlayers() {
  document.querySelectorAll(".song").forEach(songEl => {
    const audio = new Audio(songEl.dataset.src);
    const playBtn = songEl.querySelector(".play-btn");
    const seek = songEl.querySelector(".seek-bar");
    const time = songEl.querySelector(".time");

    let seeking = false;

    // Toggle play/pause
    playBtn.onclick = () => {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
      } else {
        audio.pause();
        playBtn.textContent = "▶";
      }
    };

    // Update seek bar as audio plays
    audio.ontimeupdate = () => {
      if (!seeking) {
        const percent = (audio.currentTime / audio.duration) * 100;
        seek.value = percent;
      }
      time.textContent = formatTime(audio.currentTime);
    };

    // User drags seek bar
    seek.oninput = () => {
      seeking = true;
    };

    seek.onchange = () => {
      audio.currentTime = (seek.value / 100) * audio.duration;
      seeking = false;
    };

    // Helper: display mm:ss
    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60).toString().padStart(2, "0");
      return `${m}:${s}`;
    }
  });
}

