// Get URL parameters
const genre = getQueryParam("genre");
const album = getQueryParam("album");

// Set the title: album name + link back to genre page
const titleEl = document.getElementById("album-title");

titleEl.innerHTML = `
  <span class="album-title-text">${album}</span>
  <a href="albums.html?genre=${encodeURIComponent(genre)}" class="back-genre-link">
    ← Back to ${genre}
  </a>
`;

// Fetch music data
fetch("/music")
  .then(res => res.json())
  .then(data => {
    const songs = data[genre][album];
    const container = document.getElementById("song-list");

    songs.forEach(song => {
      // Remove file extension
      const cleanName = song.title.replace(/\.(mp3|wav|ogg)$/i, "");

      // Create song container with 3 inner divs
      const div = document.createElement("div");
      div.className = "song";

      div.innerHTML = `
        <div class="song-track">${song.track}</div>
        <div class="song-name">${cleanName}</div>
        <div class="song-audio">
          <audio controls src="${song.file}"></audio>
        </div>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading songs:", err));


// Utility: read URL parameter
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}


