import React from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'
import logo from './assets/images/INFLUENCE-colour-100ppi.png'
import smallLogo from './assets/images/INFLUENCE-colour-100ppi@1x.png'
import largeLogo from './assets/images/INFLUENCE-colour-100ppi@2x.png'
import './assets/css/Header.css'

function Header() {

    window.$(document).ready(function() {
        window.$(".dropdown-toggle").dropdown();
    });

    const auth = useSelector(state => state.auth)
    const {user, isLogged, isAdmin} = auth

    const history = useHistory()

    const handleLogo = async () => {
        try {
            history.push('/')
            history.go(0)
        } catch (err) {
            window.location.href = "/";
        }
    }

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return (
            <nav className="navbar-dark navbar-expand-md navigation-clean-search">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav">
                            <li className="nav-item dropdown">
                                <button className="dropdown btn btn-primary active action-button dropdown-toggle" type="button" data-toggle="dropdown">
                                    <img className="avatar-image" src={user.avatar} alt=""/>
                                    <span style={{paddingLeft: '11px'}}>{user.name}</span>
                                </button>
                                <div className="dropdown-menu" role="menu">
                                    <Link to="/profile" className="dropdown-item" role="presentation">Edit Profile</Link>
                                    {isAdmin 
                                    ? <Link to="/all_users" className="dropdown-item" role="presentation">All Users</Link>
                                    : <Link to="/" className="dropdown-item" role="presentation">My Profile</Link>}
                                </div>
                            </li>
                            <span className="nav-item" role="presentation"><Link to="" className="nav-link" onClick={handleLogout}>Logout</Link></span>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <header>
            <div>
                <div className="header-dark">
                    <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
                        <div className="container">
                            <Link to="/" className="navbar-brand" onClick={handleLogo}>               
                                <img id="INFLUENCE-colour-100ppi" alt="" src={logo} srcSet={`${smallLogo} 1x, ${largeLogo} 2x`} />
                            </Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only"></span><span className="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse" id="navcol-1">
                                <form className="form-inline mr-auto" target="_self"></form>
                                {
                                    isLogged
                                    ? userLink()
                                    : 
                                    <>
                                        <ul className="nav nav-pills">
                                            <li style={{paddingRight: "15px"}}><NavLink data-toggle="pill" className="nav-link navLink2" to="/register">Sign Up</NavLink></li>
                                            <li className="active"><NavLink exact data-toggle="pill" className="nav-link navLink2" to="/login">Log In</NavLink></li>
                                        </ul>
                                    </>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;