import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Playlist = props => (
    <tr>
        <td>{props.playlist.playlistName}</td>
        <td>{props.playlist.playlistDescription}</td>
        <td>
            <Link to={`/view/${props.playlist._id}`}>View</Link>
        </td>
    </tr>
)

export default class ViewAllPlaylists extends Component {
    constructor(props){
        super(props);

        this.state = {
            playlists: [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/playlists/')
            .then(response => {
                this.setState({ playlists: response.data }, console.log(response.data));
            })
            .catch((error) => { 
                console.log(error);
            });
    }

    allPlaylistsList(){
        return this.state.playlists.map(current => {
            return (<Playlist playlist={current} key={current._id}/>)
        })
    }

    render() {
        return (
            <div style={{width: "50%", margin: "auto"}}>
                <h3 style={{textAlign: "center"}}>User Curated Playlists</h3>
                <table className="table center" style={{textAlign: "center"}}>
                    <thead className="thead-light">
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        { this.allPlaylistsList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
