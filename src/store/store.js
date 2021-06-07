import { createStore } from 'redux'

const INITIAL_STATE = { 
    login_petition: false,
    login_access: false,
    loading: false
}

const reducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type){
        case 'login_petition':
            return {
                ...state,
                login_petition: action.payload,
                loading: action.payload
            }
        case 'login_access':
            return {
                ...state,
                login_access: true,
                loading: false
            }
        default:
            return state
    }
}

const store = createStore(reducer)

export default store;


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