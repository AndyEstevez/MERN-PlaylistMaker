import React, { Component } from 'react';
import axios from 'axios';

class CreatePlaylist extends Component {
    constructor(props){
        super(props);

        this.onChangePlaylistName = this.onChangePlaylistName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            playlistName: '',
            playlistDescription: '',
        }
    }

    // functions to update state from user inputs 
    onChangePlaylistName(e) {
        this.setState({
            playlistName: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            playlistDescription: e.target.value
        })
    }

    // POST request to create a playlist entry in the database
    // create a object based on the state's values and send back to home page
    onSubmit(e){
        e.preventDefault();

        const playlist = {
            playlistName: this.state.playlistName,
            playlistDescription: this.state.playlistDescription,
        }

        console.log(playlist);

        axios.post(`/playlists/create`, playlist)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <br/>
                <h3 style={{ textAlign: "center" }}>Create Playlist</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{ textAlign: "center" }}>
                        <label>Playlist Name: </label>
                        <input style={{ width: "50%", margin: "auto" }} className="form-control" 
                            type="text" required value={this.state.playlistName} 
                            onChange={this.onChangePlaylistName}/>
                    </div>

                    <div className="form-group" style={{ textAlign: "center" }}>
                        <label>Description: </label>
                        <input style={{ width: "50%", margin: "auto" }} className="form-control" 
                        type="text" required value={this.state.playlistDescription} 
                        onChange={this.onChangeDescription}/>
                    </div>

                    <div className="form-group" style={{ justifyContent: "center", display: "flex" }}>
                        <input type="submit" value="Create Playlist" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreatePlaylist;