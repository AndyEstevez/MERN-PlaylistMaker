import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

export default class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            artistImages: [],
            newReleases: [],
        }
    }

    async componentDidMount(){
        try {
            const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&format=json&api_key=${process.env.REACT_APP_LASTFM_APIKEY}`)
            const json = await response.json();
            this.setState({ data: json.artists.artist.slice(0, 9) });

            const responseNewReleases = await fetch("https://api.spotify.com/v1/browse/new-releases?country=US&limit=10", {
                method: 'GET', headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY }});
        
            const data = await responseNewReleases.json();
            console.log("NEW RELEASES")
            console.log(data.albums.items.slice(0, 9))
            this.setState({newReleases: data.albums.items.slice(0, 9)})

            for(let i = 0; i < this.state.data.length; i++){
                const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${this.state.data[i].name}`, {
                    method: 'GET', headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY }});
        
                const data = await response.json();
                let previousImages = [...this.state.artistImages];
                previousImages.push(data.artists.items[0].images[1].url)
                this.setState({artistImages: previousImages})
            }
        }
        catch (error) {
            console.log('Error in home page: ' + error);
        }
    }

    render() {
        // console.log(this.state.data)
        let indice = -1;
        return (
            <div style={{margin: "auto"}}>
                <h1 style={{textAlign: "center"}}>Top Artists</h1>
                <Grid container style={{alignItems:"center", justifyContent:"center"}}>
                    {this.state.data.map(index => {
                        indice += 1;
                        return(
                            <Card>
                                <CardActionArea>
                                    <CardMedia component="img" alt={index.name} image={this.state.artistImages[indice]} />
                                </CardActionArea>
                                <CardContent>
                                    <Typography>{index.name}</Typography>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Grid>
                <br/>
                <h1 style={{textAlign: "center"}}>New Releases</h1>
                <Grid container style={{alignItems:"center", justifyContent:"center"}}>
                    {this.state.newReleases.map(index => {
                        return(
                            <Card style={{height: "100%"}} xs>
                                <CardActionArea>
                                    <CardMedia component="img" alt={index.artists[0].name} image={index.images[1].url} />
                                </CardActionArea>
                                <CardContent>
                                    <Typography>{index.artists[0].name}</Typography>
                                </CardContent>
                            </Card>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}
