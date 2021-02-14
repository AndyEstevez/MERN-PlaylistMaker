import React, { Component } from 'react'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';

export default class TracksPage extends Component {
    constructor(props){
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getPlaylists = this.getPlaylists.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleButton = this.handlePlaylistChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            tracks: [],
            id: props.match.params.id,
            images: '',
            albumName: '',
            artistName: '',
            totalTracks: 0,
            releaseYear: 0,
            open: false,
            databasePlaylists: [],
            submitName: '',
            submitArtist: '',
            selectedPlaylist: '',
            indexPlaylist: 0,
        }
    }

    async componentDidMount(){
        const response = await fetch(`https://api.spotify.com/v1/albums/${this.state.id}/tracks?market=US&limit=50`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY }});

        const json = await response.json();
        this.setState({ tracks: json.items,});


        const responseAlbumInfo = await fetch(`https://api.spotify.com/v1/albums/${this.state.id}?market=US`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY }});
        const jsonAlbum = await responseAlbumInfo.json();
        // console.log(jsonAlbum)
        this.setState({ images: jsonAlbum.images[1].url, albumName: jsonAlbum.name, 
            artistName: jsonAlbum.artists[0].name, totalTracks: jsonAlbum.total_tracks, releaseYear: jsonAlbum.release_date.substring(0, 4) });
    }

    handleOpen = (e) => {
        e.preventDefault();

        this.setState({ open: true, submitName: e.target.value });
        console.log(e.target.value)
        this.getPlaylists();
    }    
    handleButton(name) {
        this.setState({submitName: name, open: true })
        console.log(this.state.submitName)
        this.getPlaylists();

    }
    handleClose() {
        this.setState({ open: false });
    }
    handlePlaylistChange = (event) => {
        console.log(this.state.submitName)
        this.setState({ selectedPlaylist: event.target.value, 
            indexPlaylist: this.state.databasePlaylists.
                findIndex(x => x.playlistName === event.target.value) })
        console.log(this.state.databasePlaylists.findIndex(x => x.playlistName === event.target.value))
    }
    handleAdd(e){
        e.preventDefault();
        const song = {
            name: this.state.submitName,
            artist: this.state.artistName,
            album: this.state.albumName
        }
        axios.post('/playlists/update/' + this.state.databasePlaylists[this.state.indexPlaylist]._id, song)
            .then(res => console.log(res.data))
        console.log(song)
        this.setState({ open: false });

    }
    handleSubmit() {

        const song = {
            name: this.state.submitName,
            artist: this.state.artistName,
            album: this.state.albumName
        }

        axios.post('/playlists/update/' + this.state.databasePlaylists[this.state.indexPlaylist]._id, song)
            .then(res => console.log(res.data))
        console.log(song)

        
    }
  
    async getPlaylists() {
        await axios.get('/playlists')
            .then(response => {
                this.setState({ databasePlaylists: response.data })
            })
            .catch((error) => console.log('Error: ' + error));

        console.log(this.state.databasePlaylists)
    }
    render() {
   
        // console.log(this.state.tracks)
        return (
            <div style={{width: "50%", margin: "auto", paddingBottom: '100px'}}>
                <div style={{padding: '25px 0px'}}>
                    <img style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} src={this.state.images}/>
                </div>
                
                <div style={{width: "50%", margin: "auto", textAlign: 'center', padding: '55px 0px'}}>
                    <h3>{this.state.albumName}</h3>
                    <h6>{this.state.artistName}</h6>
                    {this.state.totalTracks > 1 ? <h6>{this.state.totalTracks} songs</h6> : <h6>{this.state.totalTracks} song</h6>}
                    <h6>{this.state.releaseYear}</h6>
                </div>
               
                <table className="table center" style={{textAlign: "center",}} >
                    <thead className="thead-light">
                        <tr>
                            <td style={{fontWeight: '700', fontSize: '1.25em'}}>#</td>
                            <td style={{fontWeight: '700', fontSize: '1.25em'}}>Title</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tracks.map(index => {
                            return(
                                <tr key={index.name}>
                                    <td style={{fontSize: '1.1em'}}>{index.track_number}</td>
                                    <td style={{fontSize: '1.1em'}}>{index.name}</td>
                                    <td>
                                        <IconButton onClick={this.handleOpen} value={index.name}><LibraryAddIcon style={{color: '#1DB954'}}/></IconButton>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Dialog fullWidth={true} open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add to playlist</DialogTitle>
                    <DialogContentText>Add to which playlist</DialogContentText>
                    <form style={{margin: 'auto', width: 'fit-content', display: 'flex', flexDirection: 'column'}}>
                        <FormControl style={{minWidth: '120'}}>
                            <InputLabel>Playlists</InputLabel>
                                <Select autoFocus value={this.state.selectedPlaylist} onChange={this.handlePlaylistChange}>
                                {this.state.databasePlaylists.map(index => {
                                        return(
                                            <MenuItem value={index.playlistName} key={index._id}>{index.playlistName}</MenuItem>
                                        )
                                    })}
                                </Select>
                        </FormControl>
                    </form>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.handleAdd} color="primary" type="submit">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
