import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isEmail} from '../../utils/validation/Validation'
import './assets/css/style.css'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword(props) {

    const {
        title = "Reset your Password",
        usernameTitle = "EMAIL ADDRESS",
        verifyTitle = "VERIFY YOUR EMAIL",
        alreadyTitle = "Already have an account?",
        loginTitle = "Sign In"
    } = props;

    const [data, setData] = useState(initialState)
    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {

        e.preventDefault()

        if(isEmpty(email))
            return setData({...data, err: "Please fill in all the fields.", success: ''})

        if(!isEmail(email))
            return setData({...data, err: 'Invalid Email.', success: ''})
        try {
            const res = await axios.post('/user/forgot', {email})

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <main className="d-flex align-items-center min-vh-90 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="profile_page">
                        <div className="col-left">
                            <div className="card-body">
                                <p className="login-card-description alignCen">{title}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email" className="sr-only">{usernameTitle}</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Enter Registered Email Address" value={email} onChange={handleChangeInput} />
                                    </div>
                                    <div>
                                        {err && showErrMsg(err)}
                                        {(success && showSuccessMsg(success))}
                                    </div>
                                    <button className="btn btn-block login-btn mb-4" style={{cursor:"pointer"}} type="submit">{verifyTitle}</button>
                                </form>
                                <p className="login-card-footer-text">{alreadyTitle} <Link to="/login" className="text-reset">{loginTitle}</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ForgotPassword