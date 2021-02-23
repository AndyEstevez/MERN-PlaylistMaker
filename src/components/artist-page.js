import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

export default class ArtistPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.id,
            artistData: [],
            albums: [],
            singles: [],
        }
    }

    // functions for separating albums and singles from the api request
    checkIfAlbum(data){
        return data.album_group === 'album';
    }

    checkIfSingle(data){
        return data.album_group === 'single';
    }

    // api request for an artists albums & singles
    async componentDidMount(){
        const response = await fetch(`https://api.spotify.com/v1/artists/${this.state.id}/albums?include_groups=album%2Csingle&market=US&limit=50`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY }});

        const json = await response.json();
        console.log(json.items)
        this.setState({ artistData: json.items, albums: json.items.filter(this.checkIfAlbum), singles: json.items.filter(this.checkIfSingle) })
    }

    render() {
        // console.log(this.state.albums)
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Albums</h1>
                <Grid container style={{alignItems:"center", justifyContent:"center"}}>
                    {this.state.albums.map(index => {
                        return(
                       
                            <Card style={{height: "350px", width: "250px"}}>
                                <a href={`/album/${index.id}`}>
                                <CardActionArea>
                                    {index.images.length > 0 ? <CardMedia style={{height: "auto", maxHeight: "250px", width: "auto", maxWidth: "250px"}} component="img" alt={index.name} image={index.images[1].url} /> : <CardMedia alt={index.name}/>}
                                </CardActionArea>
                                </a>
                                <CardContent>
                                    <Typography>{index.name}</Typography>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Grid>

                <br/>
                
                <h1 style={{textAlign: "center"}}>Singles</h1>
                <Grid container style={{alignItems:"center", justifyContent:"center"}}>
                    {this.state.singles.map(index => {
                        return(
                       
                            <Card style={{height: "350px", width: "250px"}}>
                                <a href={`/album/${index.id}`}>
                                <CardActionArea >
                                    {index.images.length > 0 ? <CardMedia style={{height: "auto", maxHeight: "250px", width: "auto", maxWidth: "250px"}} component="img" alt={index.name} image={index.images[1].url} /> : <CardMedia alt={index.name}/>}
                                </CardActionArea>
                                </a>
                                <CardContent>
                                    <Typography>{index.name}</Typography>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}
