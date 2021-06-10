const initState = { 
    login_item: null,
    user_id: null,
    loading: false,
    error: null
}

const reducer = ( state = initState, action ) => {
    switch(action.type){
        case 'FETCH_LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            }
        case 'FETCH_LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                login_item: action.payload.access_token,
                user_id: action.payload.userId,
                error: null
            }
        case 'FETCH_LOGIN_FAILURE':
            return {
              ...state,
              loading: false,
              error: action.payload
            }
        default:
            return state
    }
}

export default reducer;


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