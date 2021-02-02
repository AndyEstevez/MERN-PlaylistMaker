const router = require('express').Router();
let Playlist = require('../models/playlist.model');

// show all the created playlists
router.route('/').get((req, res) => {
    Playlist.find()
        .then(playlists => res.json(playlists))
        .catch(error => res.status(400).json('Error: ' + error));
});

// create a playlist
router.route('/create').post((req, res) => {
    const playistName = req.body.playistName;
    const playlistDescription = req.body.playlistDescription;
    const playlistCreator = req.body.playlistCreator;

    const newPlaylist = new Playlist({
        playistName,
        playlistDescription,
        playlistCreator,
    });

    newPlaylist.save()
        .then(() => res.json('Playlist created'))
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;