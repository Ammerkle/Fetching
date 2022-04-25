import React from 'react'
import "../Styles/Header.css"
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import IconButton from "@material-ui/core/IconButton"
//import HomeIcon from '@mui/icons-material/Home';


export default function Header() {
    return (
        <nav className="header">
            <IconButton>
            <PersonIcon className="headericons" fontSize="large"/>
            <a href ="/Profile"></a>
            </IconButton>
            <h2 className="title" >FETCHING</h2>
            <IconButton> 
            <PetsIcon className="headericons" fontSize="large"/>
            <a href ="/Matches"></a>
            </IconButton>
        </nav>
    )
}
