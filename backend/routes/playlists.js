const router = require('express').Router();
let Playlist = require('../models/playlist.model');

// show all the created playlists
router.get('/', (req, res) => {
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
router.route('/:id').get((req, res) => {
    Playlist.findById(req.params.id)
        .then(playlist => res.json(playlist))
        .catch(error => res.status(400).json('Error: ' + error));
})

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

// delete song from playlist
router.route('/delete/:songId/:playlistId').delete(async (req, res) => {
    await Playlist.findOneAndUpdate(
        {"_id": req.params.playlistId},
        {$pull: {
            "playlistSongs": {
                _id: req.params.songId,
            }
        }}, { safe: true, multi: true}
    )
})

module.exports = router;