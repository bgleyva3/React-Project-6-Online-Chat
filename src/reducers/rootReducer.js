import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import chatReducer from './chatReducer'


export default combineReducers({
  loginReducer,
  chatReducer
})

/* 


const fakeAuthService = {

  logout: cb => {
    setTimeout(cb, 500)
  }
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const signIn = (LOGIN_OBJ) => {
    console.log(LOGIN_OBJ)
    fetch("https://acapp.herokuapp.com/login", {
        method: "POST",
        body: JSON.stringify(LOGIN_OBJ),
        headers: new Headers().set("content-type", "application/json")
    })
    .then(res => res.json())
    .then(data => setUser(data.access_token))
    }

  const signOut = cb => {
    fakeAuthService.logout(() => {
      setUser(null)
      cb()
    })
  }

  return {
    user,
    signIn,
    signOut
  }
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext) */