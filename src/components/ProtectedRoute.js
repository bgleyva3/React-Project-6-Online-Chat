import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, ...props }) => {
    
    const login_item = useSelector(state => state.login_item)

    return (
      <Route
        {...props}
        render={({ location }) =>
          login_item ? (
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