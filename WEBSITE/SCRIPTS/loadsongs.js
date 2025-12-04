const genre = getQueryParam("genre");
const album = getQueryParam("album");

document.getElementById("album-title").textContent = `${genre} → ${album}`;

fetch("/music")
  .then(res => res.json())
  .then(data => {
    const songs = data[genre][album];
    const container = document.getElementById("song-list");

    songs.forEach(song => {
      const div = document.createElement("div");
      div.className = "song";
      div.innerHTML = `
        ${song.track}. ${song.title}<br>
        <audio controls src="${song.file}"></audio>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading songs:", err));
