import React from 'react'
import './navbar.css'
import { Navbar, Nav } from 'react-bootstrap';

function NavbarObject() {
    return (
        // <div className="nav-bar">
        //     <Link to="/" className="navbar-brand" style={{fontSize: "2em", textAlign: "center", color: "#1DB954", display: "grid", height: "70px"}} 
        //         onClick={() => { window.location.pathname = '/' }}>Playlist Maker</Link>
        //     <ul className="nav-list-container">
        //     {NavbarItems.map((index) => {
        //         return(
        //             <li className="nav-row" id={ window.location.pathname === index.link ? "active" : ""} onClick={() => { window.location.pathname = index.link }}>
        //                 <div id="logo">{index.logo}</div>
        //                 <div id="name">{index.name}</div>
        //             </li>
        //         )
        //     })}
        //     </ul>
        // </div>
        <Navbar className="color-nav" bg="dark" variant="dark">
            <Navbar.Brand href="/" style={{color: "#1DB954", fontWeight: "500", fontSize: "2em"}}>Playlist Maker</Navbar.Brand>
            <Nav className="mr-auto" style={{fontWeight: "400", fontSize: "1em", height: "50%" }}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/create">Create Playlist</Nav.Link>
                <Nav.Link href="/view">Playlists</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavbarObject;
