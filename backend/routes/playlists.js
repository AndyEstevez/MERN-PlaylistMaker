const router = require('express').Router();
const { db } = require('../models/playlist.model');
let Playlist = require('../models/playlist.model');
let Song = require('../models/playlist.model');

// show all the created playlists
router.route('/').get((req, res) => {
    Playlist.find()
        .then(playlists => res.json(playlists))
        .catch(error => res.status(400).json('Error: ' + error));
});

// create a playlist
router.route('/create').post((req, res) => {
    const playlistName = req.body.playlistName;
    const playlistDescription = req.body.playlistDescription;
    // const playlistCreator = req.body.playlistCreator;

    const newPlaylist = new Playlist({
        playlistName,
        playlistDescription,
        // playlistCreator,
    });

    newPlaylist.save()
        .then(() => res.json('Playlist created'))
        .catch(error => res.status(400).json('Error: ' + error));
});

// get specific playlist
// router.route('/:id').get((req, res) => {
//     Playlist.findById(req.params.id)
// })

// update specific playlist
router.route('/update/:id').post( async (req, res) => {
    const song = {
        name: req.body.name,
        artist: req.body.artist,
        album: req.body.album
    }
    await Playlist.findOneAndUpdate(
        { "_id": req.params.id },
        { $push: {
            "playlistSongs": {
                name: req.body.name,
                artist: req.body.artist,
                album: req.body.album
            }
        }}
    )
})

module.exports = router;