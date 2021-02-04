import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { TagFaces } from '@material-ui/icons';

export default class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            artistImages: [],
        }
    }

    async componentDidMount(){
        try {
            const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&format=json&api_key=${process.env.REACT_APP_LASTFM_APIKEY}`)
            const json = await response.json();
            this.setState({ data: json.artists.artist.slice(0, 8) });

            for(let i = 0; i < this.state.data.length; i++){
                const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${this.state.data[i].name}`, {
                method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY}
                 });
        
               const data = await response.json();
                console.log("IN GET FUNCTION")
                 console.log(data.artists.items[0].images[0].url)
                 let previousImages = [...this.state.artistImages];
                 previousImages.push(data.artists.items[0].images[2].url)

                 this.setState({artistImages: previousImages})
            }
        }
        catch (error) {
            console.log('Error in home page: ' + error);
        }
    }

    async getImage(artistName){
 
        
        const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${artistName}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY}
        });
        const data = await response.json();
        let imageUrl = data.artists.items.images[2].url;
        console.log(imageUrl)
        return imageUrl;
        // let imageArr = [];
        // for(let i = 0; i < artistName.length; i++){
        //     const response = await fetch(`https://api.spotify.com/v1/search?type=artist&q=${artistName[i].name}`, {
        //     method: 'GET',
        //     headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY}
        //     });

        //     const data = await response.json();
        //     // console.log("IN GET FUNCTION")
        //      console.log(data.artists.items[0].images[0].url)
        //     imageArr.push(data.artists.items[0].images[0].url)
        // }
        // // }
        // console.log(imageArr[0])
        // return imageArr;
    }

    render() {
        // console.log(this.state.data)
        let indice = -1;
        return (
            <div>
                <h1>Top Artists</h1>
                <div className="card-deck">
                    {this.state.data.map(index => {
                        indice += 1;
                        return(
                            <Card className="card">
                                <CardActionArea>
                                    <CardMedia component="img" alt={index.name} image={this.state.artistImages[indice]} style={{objectFit: "scale-down"}}>
                                    </CardMedia>
                                    {/* {console.log(this.state.artistImages[indice])} */}
                                </CardActionArea>
                                <CardContent>
                                    <Typography>
                                        {index.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                            // <div>
                            //     <img src={this.state.artistImages[indice]}/>
                            //     <div>{index.name}</div>
                            // </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
