import React from 'react'
import '../App.css'
import { NavbarItems } from './navbar-items';
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <div className="nav-bar">
            <Link to="/" className="navbar-brand" style={{fontSize: "2em", textAlign: "center", color: "#1DB954", display: "grid", height: "70px"}} 
                onClick={() => { window.location.pathname = '/' }}>Playlist Maker</Link>
            <ul className="nav-list-container">
            {NavbarItems.map((index) => {
                return(
                    <li className="nav-row" id={ window.location.pathname == index.link ? "active" : ""} onClick={() => { window.location.pathname = index.link }}>
                        <div id="logo">{index.logo}</div>
                        <div id="name">{index.name}</div>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Navbar
