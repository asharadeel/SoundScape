const genre = getQueryParam("genre");
document.getElementById("genre-title").textContent = genre;

fetch("/music")
  .then(res => res.json())
  .then(data => {
    const albums = data[genre];
    const container = document.getElementById("album-list");

    Object.keys(albums).forEach(album => {
      const div = document.createElement("div");
      div.className = "album";
      div.innerHTML = `<span class="album-text">${album}</span>`;


      // Compute album cover path
      const coverPath = `/audio/GENRE_${genre}/ALBUM_${album}/ACOVER_${album}.jpg`;

      const img = new Image();
      img.onload = () => {
        div.style.backgroundImage = `url('${coverPath}')`;
        div.style.backgroundSize = "cover";
        div.style.backgroundPosition = "center";
      };
      img.src = coverPath;

      div.onclick = () =>
        window.location.href =
          `songs.html?genre=${encodeURIComponent(genre)}&album=${encodeURIComponent(album)}`;

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading albums:", err));
