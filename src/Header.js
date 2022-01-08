import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header({ searchValue, setSearchValue }) {

    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthenticaton = () => {
        if (user) {
            auth.signOut();
        }
    }
    
    return (
        <nav className="header">
            <Link to="/">
                <img
                    className="header__logo"
                    src="https://i.ytimg.com/vi/StYmwk1xfH0/maxresdefault.jpg"
                    alt="logo"
                />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" placeholder="Search" onChange={(event) => setSearchValue(event.target.value)} />
                <SearchIcon className="header__searchIcon" />
            </div>
            <div className="header__nav">
                <Link to="/Favourites">
                    <div className="header__favourites">
                        <span className='header__optionLine2'>Favourites</span>
                    </div>
                </Link>
                <Link to="/WatchLater">
                    <div className="header__favourites">
                        <span className='header__optionLine2'>Watch Later</span>
                    </div>
                </Link>
                <Link to="/Login" className="header__link">
                    <Link to={!user && '/login'} style={{ textDecoration: "none", color: "white" }}>
                        <div onClick={handleAuthenticaton} className="header__option">
                            <span className="header__optionLine1">Hello {!user ? 'Guest' : user.email}</span>
                            <span className="header__optionLine2">{user ? 'Sign Out' : 'Sign In'}</span>
                        </div>
                    </Link>
                </Link>
            </div>
        </nav>
    )
}


export default Header
