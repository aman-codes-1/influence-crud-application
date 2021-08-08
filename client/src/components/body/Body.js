import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoginBody from './login_body/LoginBody'
import Login from './auth/Login'
import Register from './auth/Register'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import ActivateEmail from './auth/ActivateEmail'
import HomePath from '../utils/HomePath/HomePath'
import NotFound from '../utils/NotFound/NotFound'
import Profile from '../body/profile/Profile'
import Users from './users/Users'
import EditUserPermission from './users/EditUserPermission'
import Pictures from './pictures/Pictures'

function Body() {

  const auth = useSelector(state => state.auth)
  const {isLogged, isAdmin} = auth

  return (
    <section>
      <Switch>
        <Route path="/" render={() => {return (isLogged ? <LoginBody /> : <Redirect to="/login" />)}} exact/>
        <Route path="/login" component={isLogged ? HomePath : Login} exact />
        <Route path="/register" component={isLogged ? HomePath : Register} exact />
        <Route path="/forgot_password" component={isLogged ? HomePath : ForgotPassword} exact />
        <Route path="/user/reset/:token" component={isLogged ? HomePath : ResetPassword} exact />
        <Route path="/user/activate/:activation_token" component={ActivateEmail} exact />
        <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
        <Route path="/all_users" component={isAdmin ? Users : NotFound} exact />
        <Route path="/edit_user/:id" component={isAdmin ? EditUserPermission : NotFound} exact />
        <Route path="/" component={isLogged ? Pictures : NotFound} exact />
        <Route path="/create_assessment" component={isLogged ? LoginBody : NotFound} exact/>
        <Route render={() => <Redirect to={{pathname: "/"}} />} />
      </Switch>
    </section>
  )
}

export default Body