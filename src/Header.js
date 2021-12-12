import React from 'react'
import {Link} from 'react-router-dom'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';

function Header( {searchValue, setSearchValue}) {
    return (
        <nav className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src = "https://i.ytimg.com/vi/StYmwk1xfH0/maxresdefault.jpg"
                    alt = "logo"
                />
            </Link>
            <div className="header__search">
                <input type="text"  className="header__searchInput" placeholder="Search" onChange={(event) => setSearchValue(event.target.value)}/>
                <SearchIcon className="header__searchIcon"/>
            </div>
            <div className="header__nav">
                <Link to="/Favourites">
                    <div className="header__favourites">
                        <span className='header__optionLine2'>Favourites</span>
                    </div>
                </Link>
                <Link to="/Login" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLine1">Hello Sir</span>
                        <span className="header__optionLine2">Sign In</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}


export default Header
