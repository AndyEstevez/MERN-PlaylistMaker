import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import NavbarObject from './components/navbar';
import HomePage from './components/home-page';
import SearchPage from './components/search-page';
import ArtistPage from './components/artist-page';
import CreatePlaylist from './components/create-playlist';
import ViewAllPlaylists from './components/view-all-playlists';


function App() {
  return (
    <div>
 
      <Router>
        <NavbarObject/>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/search/' component={SearchPage}/>
        <Route exact path='/artist/:id' component={ArtistPage}/>
        <Route exact path='/create' component={CreatePlaylist}/>
        <Route exact path='/view' component={ViewAllPlaylists}/>
      </Router>
    </div>
  );
}

export default App;
