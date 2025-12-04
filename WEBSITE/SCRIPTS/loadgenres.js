fetch("/music")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("genre-list");

    Object.keys(data).forEach(genre => {
      const div = document.createElement("div");
      div.className = "genre";
      div.textContent = genre;

      div.onclick = () => {
        window.location.href = `albums.html?genre=${encodeURIComponent(genre)}`;
      };

      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading genres:", err));
