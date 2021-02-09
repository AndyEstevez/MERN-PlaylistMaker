import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

export default class TracksPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            tracks: [],
            id: props.match.params.id,
            images: '',
            albumName: '',
            artistName: '',
            totalTracks: 0,
            releaseYear: 0
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
        console.log(jsonAlbum)
        this.setState({ images: jsonAlbum.images[1].url, albumName: jsonAlbum.name, 
            artistName: jsonAlbum.artists[0].name, totalTracks: jsonAlbum.total_tracks, releaseYear: jsonAlbum.release_date.substring(0, 4) });
    
    }
    render() {
   
        console.log()
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
                                <tr>
                                    <td style={{fontSize: '1.1em'}}>{index.track_number}</td>
                                    <td style={{fontSize: '1.1em'}}>{index.name}</td>
                                    <td>
                                        <Link><LibraryAddIcon style={{color: '#1DB954'}}/></Link>
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
