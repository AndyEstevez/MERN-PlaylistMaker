const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    num: { type: String },
    image: { type: String },
    name: { type: String },
    artist: { type: String },
    album: { type: String },
    duration: { type: String }
})

const playlistSchema = new Schema({
    playlistName:{ type: String, required: true },
    playlistDescription:{ type: String, default: 'none', maxLength: 50},
    playlistSongs: [songSchema],
    playlistCreator: { type: String,  },
}, {
    timestamps: true,
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;