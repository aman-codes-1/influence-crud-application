import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showHighlightedMsg} from '../../utils/notification/Notification'

function ActivateEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    useEffect(() => {
        if(activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    }, [activation_token])
    return (
        <div>
            {err && showErrMsg(err)}
            {success && showHighlightedMsg(success)}
        </div>
    )
}

export default ActivateEmail
