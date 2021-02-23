const router = require('express').Router();
let Playlist = require('../models/playlist.model');


// show all the created playlists / GET request
router.get('/', (req, res) => {

    // find() gets all the entries from the database
    Playlist.find()
        .then(playlists => res.json(playlists))
        .catch(error => res.status(400).json('Error: ' + error));

});


// create a playlist / CREATE request
router.route('/create').post((req, res) => {
    const playlistName = req.body.playlistName;
    const playlistDescription = req.body.playlistDescription;

    // creating a playlist Schema
    const newPlaylist = new Playlist({
        playlistName,
        playlistDescription,
        // playlistCreator,
    });

    // save() updates the database with adding the new entry of newPlaylist
    newPlaylist.save()
        .then(() => res.json('Playlist created'))
        .catch(error => res.status(400).json('Error: ' + error));

});


// get specific playlist / GET request
router.route('/:id').get((req, res) => {

    // .findById() finds unique entry based on its ID value
    Playlist.findById(req.params.id)
        .then(playlist => res.json(playlist))
        .catch(error => res.status(400).json('Error: ' + error));

})


// update specific playlist / POST request
router.route('/update/:id').post(async (req, res) => {
 
    // findOneAndUpdate() updates an entry in database 
    // push = add to entry
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


// delete song from playlist / DELETE request
router.route('/delete/:songId/:playlistId').delete(async (req, res) => {

    // findOneAndUpdate() updates an entry in database 
    // pull = remove from entry
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