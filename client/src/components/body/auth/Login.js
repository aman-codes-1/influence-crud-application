import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {GoogleLogin} from 'react-google-login'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import './assets/css/style.css'
import loginCard from './assets/images/loginCard.svg'

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login(props) {
    
    const {
        word1 = "Manage",
        line1 = "Your Profile",
        word2 = "with One Tool",
        title = "Sign In to your account",
        usernameTitle = "EMAIL ADDRESS",
        passwordTitle = "PASSWORD",
        loginTitle = "Login",
        forgotPasswordTitle = "Forgot Password?",
        accountTitle = "Don't have an account?",
        registerHereTitle = "Register here",
        termsTitle = "Terms of use .",
        policyTitle = "Privacy policy" 
    } = props;

    const [user, setUser] = useState(initialState)
    const {email, password, err, success} = user
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {

        e.preventDefault()
        
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())

            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())

            history.push('/')
            
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <main className="d-flex align-items-center min-vh-90 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="row no-gutters">
                        <div className="col-md-5 bgClr">
                            <div className="svg-pic">
                                <span className="smallText">{word1}</span><span className="largeText"> {line1}</span><span className="smallText"> {word2}.</span>
                                <br></br>
                                <img src={loginCard} alt="login" className="login-card-img" />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <p className="login-card-description">{title}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email" className="sr-only">{usernameTitle}</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password" className="sr-only">{passwordTitle}</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="***********" value={password} onChange={handleChangeInput} />
                                    </div>
                                    <div>
                                        {err && showErrMsg(err)}
                                        {(success && showSuccessMsg(success))}
                                    </div>
                                    <button className="btn btn-block login-btn mb-4" style={{cursor:"pointer"}} type="submit">{loginTitle}</button>
                                    <GoogleLogin
                                        clientId="867527189229-5lena43s942l4d1ea69m1ern6p2t8mnp.apps.googleusercontent.com"
                                        buttonText="Login with google"
                                        onSuccess={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        className="login-btn"
                                    />
                                </form>
                                <Link to="/forgot_password" className="forgot-password-link">{forgotPasswordTitle}</Link>
                                <p className="login-card-footer-text">{accountTitle} <Link to="/register" className="text-reset">{registerHereTitle}</Link></p>
                                <nav className="login-card-footer-nav">
                                    <Link to="/">{termsTitle} </Link>
                                    <Link to="/">{policyTitle}</Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
