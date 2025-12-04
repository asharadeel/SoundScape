const genre = getQueryParam("genre");
document.getElementById("genre-title").textContent = genre || "Albums";

fetch("/music")
  .then(res => res.json())
  .then(data => {
    const albums = data[genre];
    const container = document.getElementById("album-list");

    Object.keys(albums).forEach(album => {
      const div = document.createElement("div");
      div.className = "album";
      div.textContent = album;

      div.onclick = () => {
        window.location.href =
          `songs.html?genre=${encodeURIComponent(genre)}&album=${encodeURIComponent(album)}`;
      };

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading albums:", err));
