import React, { Component } from 'react'
import axios from 'axios';

export default class PlaylistPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.id,
            playlistSongs: [],
            playlistName: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/playlists/' + this.state.id)
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
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
