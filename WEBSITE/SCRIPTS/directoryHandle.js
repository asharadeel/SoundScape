fetch("/music")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("genres");

        Object.keys(data).forEach(genre => {
            const genreDiv = document.createElement("div");
            genreDiv.className = "genre";
            genreDiv.textContent = genre;

            const albumsDiv = document.createElement("div");
            albumsDiv.style.display = "none";

            genreDiv.onclick = () => {
                albumsDiv.style.display =
                    albumsDiv.style.display === "none" ? "block" : "none";
            };

            Object.keys(data[genre]).forEach(album => {
                const albumDiv = document.createElement("div");
                albumDiv.className = "album";
                albumDiv.textContent = album;

                const songsDiv = document.createElement("div");
                songsDiv.className = "songs";
                songsDiv.style.display = "none";

                albumDiv.onclick = () => {
                    songsDiv.style.display =
                        songsDiv.style.display === "none" ? "block" : "none";
                };

                data[genre][album].forEach(song => {
                    const songDiv = document.createElement("div");
                    songDiv.className = "song";
                    songDiv.innerHTML = `
                        ${song.track}. ${song.title}
                        <audio controls src="${song.file}"></audio>
                    `;
                    songsDiv.appendChild(songDiv);
                });

                albumsDiv.appendChild(albumDiv);
                albumsDiv.appendChild(songsDiv);
            });

            container.appendChild(genreDiv);
            container.appendChild(albumsDiv);
        });
    });


function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
