import React, { Component } from 'react'

export default class TracksPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            tracks: [],
            id: props.match.params.id
        }
    }

    async componentDidMount(){
        const response = await fetch(`https://api.spotify.com/v1/albums/${this.state.id}/tracks?market=US`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY }});

        const json = await response.json();
        this.setState({ tracks: json.items });
    }
    render() {
        console.log(this.state.tracks)
        return (
            <div>
                
            </div>
        )
    }
}
