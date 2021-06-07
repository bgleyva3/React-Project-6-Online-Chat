import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, ...props }) => {
    
    const login_access = useSelector(state => state.login_access)

    return (
      <Route
        {...props}
        render={({ location }) =>
          login_access ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />
    )
  }
  
  export default ProtectedRoute