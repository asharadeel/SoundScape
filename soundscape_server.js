const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const ROOT = "./SS_DIRECTORY";

// Serve audio files
app.use("/audio", express.static(ROOT));

app.use(express.static("./WEBSITE"));

app.get("/music", (req, res) => {
    const data = {};
    
    // Read GENRE folders
    const genreFolders = fs.readdirSync(ROOT)
        .filter(name => name.startsWith("GENRE_"));

    for (const genreFolder of genreFolders) {
        const genreName = genreFolder.replace("GENRE_", "");
        const genrePath = path.join(ROOT, genreFolder);

        data[genreName] = {};

        // Read ALBUM folders
        const albumFolders = fs.readdirSync(genrePath)
            .filter(name => name.startsWith("ALBUM_"));

        for (const albumFolder of albumFolders) {
            const albumName = albumFolder.replace("ALBUM_", "");
            const albumPath = path.join(genrePath, albumFolder);

            // Read songs in album
            const songs = fs.readdirSync(albumPath)
                .filter(name => /^\d+_/.test(name)) // starts with number_
                .map(filename => {
                    const track = parseInt(filename.split("_")[0]);
                    return {
                        track,
                        title: filename.replace(/^\d+_/, ""),
                        file: `/audio/${genreFolder}/${albumFolder}/${filename}`,
                    };
                })
                .sort((a, b) => a.track - b.track);

            data[genreName][albumName] = songs;
        }
    }

    res.json(data);
});

app.listen(3000, () =>
    console.log("Music server running at http://localhost:3000/music")
);

