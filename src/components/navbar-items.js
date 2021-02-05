import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import ListIcon from '@material-ui/icons/List';

export const NavbarItems = [
    {
        name: 'Home',
        logo: <HomeRoundedIcon/>,
        link: '/',
        cName: 'nav-text'
    },
    {
        name: 'Search',
        logo: <SearchIcon/>,
        link: '/search',
        cName: 'nav-text'
    },
    {
        name: 'Create Playlist',
        logo: <PlaylistAddOutlinedIcon/>,
        link: '/create-playlist',
        cName: 'nav-text'
    },
    {
        name: 'Playlists',
        logo: <ListIcon/>,
        link: '/playlists',
        cName: 'nav-text'
    },
]