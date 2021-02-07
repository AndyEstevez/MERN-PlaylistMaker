import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
// import Navbar from './components/navbar';
// import Sidebar from './components/sidebar-nav';
import HomePage from './components/home-page';
// import Probar from './components/pro-sidebar';
// import { ProSidebar, Menu, MenuItem, SidebarContent } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
// import { Link } from 'react-router-dom'
// import { NavbarItems } from './components/navbar-items'
import NavbarObject from './components/navbar';
import CreatePlaylist from './components/create-playlist';
import ViewAllPlaylists from './components/view-all-playlists';

function App() {
  return (
    <div>
 
      <Router>
        <NavbarObject/>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/create' component={CreatePlaylist}/>
        <Route exact path='/view' component={ViewAllPlaylists}/>
      </Router>
    </div>
  );
}

export default App;
