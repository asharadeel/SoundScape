fetch("/music")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("genre-list");

    Object.keys(data).forEach(genre => {
      const div = document.createElement("div");
      div.className = "genre";
      div.innerHTML = `<span class="genre-text">${genre}</span>`;

      // Compute expected cover path
      const coverPath = `/audio/GENRE_${genre}/GCOVER_${genre}.jpg`;

      // Check if cover exists
      const img = new Image();
      img.onload = () => {
        div.style.backgroundImage = `url('${coverPath}')`;
        div.style.backgroundSize = "cover";
        div.style.backgroundPosition = "center";
      };
      img.src = coverPath;

      div.onclick = () =>
        window.location.href = `albums.html?genre=${encodeURIComponent(genre)}`;

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading genres:", err));
