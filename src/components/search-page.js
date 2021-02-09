import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

export default class SearchPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            searchData: [],
            query: '',
            searchQuery: ''
        }
    }

    searchRequest = async value => {
        value = value.trim();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${value}&type=artist&market=US&limit=10`, { 
            method: 'GET', headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY }});

        const json = await response.json();
        console.log(json.artists)
        this.setState({ searchData: json.artists.items})

    }

    onChangeHandler = async e => {
        e.preventDefault();
        if(e.target.value.trim() !== ''){
            this.searchRequest(e.target.value);
            this.setState({ searchQuery: e.target.value })
        }
        this.setState({ searchQuery: e.target.value });
        this.setState({ searchData: [] });
        // this.props.history.push(`/search/${this.state.searchQuery}`)
    }

    render() {

        console.log(this.state.searchQuery)
        return (
            <div>
                <input type="text" placeholder="Search for Artists" 
                    value={this.state.searchQuery} onChange={e => this.onChangeHandler(e)} />
                <Grid container style={{alignItems:"center", justifyContent:"center"}}>
                    {this.state.searchData.map(index => {
                        return(
                            <Card>
                                <a href={`/artist/${index.id}`}>
                                <CardActionArea>
                                    {index.images.length > 0 ? <CardMedia component="img" alt={index.name} image={index.images[2].url} /> : <CardMedia alt={index.name}/>}
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
