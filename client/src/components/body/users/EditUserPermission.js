import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'


function EditUserPermission() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id){
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            })
        }else{
            history.push('/profile')
        }
    },[users, id, history])

    const handleUpdate = async e => {

        e.preventDefault()

        try {
            if(num % 2 !== 0){
                const res = await axios.patch(`/user/update_role/${editUser._id}`, {
                    role: checkAdmin ? 1 : 0
                }, {
                    headers: {Authorization: token}
                })

                setSuccess(res.data.msg)
                setNum(0)
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    return (
        <main className="d-flex align-items-center min-vh-90 py-3 py-md-0">
            <div className="container">
                <div className="card login-card">
                    <div className="profile_page">
                        <div className="col-left">
                            <div className="card-body">
                                <p className="login-card-description">Edit User Permission</p>
                                <form onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input type="text" name="name" className="form-control" defaultValue={editUser.name} disabled/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" className="form-control" defaultValue={editUser.email} disabled />
                                    </div>
                                    <div className="form-group mb-4">
                                        <input type="checkbox" id="isAdmin" checked={checkAdmin} onChange={handleCheck} />
                                        <label htmlFor="isAdmin">isAdmin</label>
                                    </div>
                                    <div>
                                        {err && showErrMsg(err)}
                                        {(success && showSuccessMsg(success))}
                                    </div>
                                    <button className="btn btn-block login-btn mb-4" style={{cursor:"pointer"}} type="submit">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>    
    )
}

export default EditUserPermission
