import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';


export default class PlaylistPage extends Component {
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            id: props.match.params.id,
            playlistSongs: [],
            playlistName: ''
        }
    }

    componentDidMount(){
        // GET request to the backend to show the songs in the specific playlist from the ID
        axios.get(`/playlists/` + this.state.id)
            .then(response => { console.log(response)
                this.setState({
                    playlistSongs: response.data.playlistSongs,
                    playlistName: response.data.playlistName
                })
            })
            .catch(function (error){
                console.log(error)
            })
    }

    // DELETE request of song from playlist and updates the state to show that the song is removed
    handleDelete(e){
        axios.delete(`/playlists/delete/${e.target.value}/${this.state.id}`)
            .then(response => console.log("Delete request: " + response.data)); 
        
        this.setState({ playlistSongs: this.state.playlistSongs.filter(element => element._id !== e.target.value)})
            
    }

    render() {
        console.log(this.state.id)
        console.log(this.state.playlistSongs)
        return (
            <div>
                <h2 style={{width: "50%", margin: "auto", textAlign: 'center'}} >{this.state.playlistName}</h2>
                <br/>
                <table className="table center" style={{textAlign: "center",}}>
                    <thead className="thead-light">
                        <tr>
                            <td style={{width: "33%", fontWeight: "700"}}>Name</td>
                            <td style={{width: "33%", fontWeight: "700"}}>Artist</td>
                            <td style={{width: "33%", fontWeight: "700"}}>Album</td>
                        </tr>
                    </thead>
               
                    <tbody>
                        {this.state.playlistSongs.map(index => {
                            return(
                                <tr key={index._id}>
                                    <td>{index.name}</td>
                                    <td>{index.artist}</td>
                                    <td>{index.album}</td>
                                    <td>
                                    <Button variant="danger" value={index._id} onClick={this.handleDelete}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
