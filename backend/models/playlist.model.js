const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for song in the array of playlistSongs
const songSchema = new Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
})

// schema for playlist
const playlistSchema = new Schema({
    playlistName:{ type: String, required: true, unique: true },
    playlistDescription:{ type: String, default: 'none', maxLength: 50},
    playlistSongs: [songSchema],
}, {
    timestamps: true,
});

const Playlist = mongoose.model("Playlist", playlistSchema);
// const Song = mongoose.model("Song", songSchema);

module.exports = Playlist;
// module.exports = Song;