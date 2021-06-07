import { Redirect, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Application from './Application'
import ProtectedRoute from './ProtectedRoute'

const Routes = () => {
    return(
        <Switch>
            <ProtectedRoute path="/home">
                <Application />
            </ProtectedRoute>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <Redirect to="/login" />
            </Route>
        </Switch>
    )
}

export default Routes