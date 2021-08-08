import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmpty, isLength, isMatch} from '../../utils/validation/Validation'
import './assets/css/style.css'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword(props) {
    
    const {
        title = "Reset your Password",
        passwordTitle = "PASSWORD",
        confirmPasswordTitle = "CONFIRM PASSWORD",
        changePassTitle = "Change Password",
    } = props;

    const [data, setData] = useState(initialState)
    const {password, cf_password, err, success} = data
    const {token} = useParams()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {

        e.preventDefault()
        
        if(isEmpty(password) || isEmpty(cf_password))
            return setData({...data, err: "Please fill in all the fields.", success: ''})

        if(!isLength(password))
            return setData({...data, err: "Password must contain minimum eight characters, at least one letter, one number and one special character.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setData({...data, err: "Passwords do not match.", success: ''})

        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

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
                                    <div className="form-group">
                                        <label htmlFor="password" className="sr-only">{passwordTitle}</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="Enter New Password" value={password} onChange={handleChangeInput} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="cf_password" className="sr-only">{confirmPasswordTitle}</label>
                                        <input type="password" name="cf_password" id="cf_password" className="form-control" placeholder="Confirm New Password" value={cf_password} onChange={handleChangeInput} />
                                    </div>
                                    <div>
                                        {err && showErrMsg(err)}
                                        {(success && showSuccessMsg(success))}
                                    </div>
                                    <button className="btn btn-block login-btn mb-4" style={{cursor:"pointer"}} type="submit">{changePassTitle}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResetPassword
