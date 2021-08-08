import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {isEmpty, isLength, isMatch} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import './profile.css'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is not supported.." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }


    const updateInfo = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "All details are updated."})
            history.go(0)
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const updatePassword = () => {

        if(isEmpty(name) || isEmpty(password) || isEmpty(cf_password))
            return setData({...data, err: "Please fill in all the fields.", success: ''})
        
        if(!isLength(password))
            return setData({...data, err: "Password must contain minimum eight characters, at least one letter, one number and one special character.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "All details are updated."})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = e => {
        e.preventDefault();
        if(name || avatar) updateInfo()
        if(password) updatePassword()
    }
    
    return (
        <main className="d-flex align-items-center min-vh-90 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="profile_page">
                        <div className="col-left">
                            <div className="card-body">
                                <p className="login-card-description alignCen">{isAdmin ? "Edit Admin Profile": "Edit your Profile"}</p>
                                <div className="avatar">
                                    <img src={avatar ? avatar : user.avatar} alt=""/>
                                    <span>
                                        <i className="fas fa-camera"></i>
                                        <p>Change</p>
                                        <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                                    </span>
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input type="text" name="name" id="name" className="form-control" defaultValue={user.name} placeholder="Enter Full Name" onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" id="cf_password" className="form-control" defaultValue={user.email} placeholder="Enter Email Address" onChange={handleChange} disabled/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email" className="sr-only">New Password</label>
                                        <input type="password" name="password" id="password" className="form-control" value={password} placeholder="Enter New Password" onChange={handleChange} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email" className="sr-only">Confirm New Password</label>
                                        <input type="password" name="cf_password" id="cf_password" className="form-control" value={cf_password} placeholder="Confirm New Password" onChange={handleChange} />
                                    </div>
                                    <div style={{color: "crimson", marginBottom: "10px"}}>
                                        <em style={{color: "crimson"}}> 
                                            * If you update your password here, you will not be able to login quickly using Google and Facebook.
                                        </em>
                                    </div>
                                    <div>
                                        {err && showErrMsg(err)}
                                        {(success && showSuccessMsg(success))}
                                    </div>
                                    <button className="btn btn-block login-btn mb-4" style={{cursor:"pointer"}} type="submit" disabled={loading}>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile
