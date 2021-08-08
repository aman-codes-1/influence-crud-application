import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../utils/validation/Validation'
import loginCard from './assets/images/loginCard.svg'
import './assets/css/style.css'

const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register(props) {
    
    const {
        word1 = "Manage",
        line1 = "Your Profile",
        word2 = "with One Tool",
        title = "Create an account",
        fullNameTitle = "FULL NAME",
        usernameTitle = "EMAIL ADDRESS",
        passwordTitle = "PASSWORD",
        confirmPasswordTitle = "CONFIRM PASSWORD",
        registerTitle = "Register",
        alreadyTitle = "Already have an account?",
        loginTitle = "Sign In",
        termsTitle = "Terms of use .",
        policyTitle = "Privacy policy" 
    } = props;

    const [user, setUser] = useState(initialState)
    const {name, email, password, cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {

        e.preventDefault()
        
        if(isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(cf_password))
            return setUser({...user, err: "Please fill in all the fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid Email.", success: ''})

        if(!isLength(password))
            return setUser({...user, err: "Password must contain minimum eight characters, at least one letter, one number and one special character.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Passwords do not match.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})

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
                                        <label htmlFor="name" className="sr-only">{fullNameTitle}</label>
                                        <input type="text" name="name" id="name" className="form-control" placeholder="Enter Full Name" value={name} onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email" className="sr-only">{usernameTitle}</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Enter Email Address" value={email} onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password" className="sr-only">{passwordTitle}</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" value={password} onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="cf_password" className="sr-only">{confirmPasswordTitle}</label>
                                        <input type="password" name="cf_password" id="cf_password" className="form-control" placeholder="Confirm Password" value={cf_password} onChange={handleChangeInput} />
                                    </div>
                                    <div>
                                        {err && showErrMsg(err)}
                                        {(success && showSuccessMsg(success))}
                                    </div>
                                    <button className="btn btn-block login-btn mb-4" style={{cursor:"pointer"}} type="submit">{registerTitle}</button>
                                </form>
                                <p className="login-card-footer-text">{alreadyTitle} <Link to="/login" className="text-reset">{loginTitle}</Link></p>
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

export default Register;
