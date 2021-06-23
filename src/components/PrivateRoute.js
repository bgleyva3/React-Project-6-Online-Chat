import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({children, ...props})=>{  

    const accessToken = useSelector(state => state.accessToken) 
    console.log("LEEEEEEEEL")

    return <Route {...props} 
    render={({location})=> accessToken ? (children) 
    : <Redirect 
        to={{
        pathname: '/',
        state: {from: location},
        }}
      />
    }
    />
}
export default PrivateRoute;