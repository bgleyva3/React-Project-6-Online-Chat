const initState = { 
    roomObj: null,
    client: null,
    roomID: null,
    roomName: null,
    allMessages: [],
    allSenders: [],
    conversation: [],
    messagesPosition: [],
    connectedUsers: [],
    userLeft: null,
    sesionClosed: null
}

const chatReducer = ( state = initState, action ) => {
    switch(action.type){
        case 'SET_ROOM_OBJ':
            return {
                ...state,
                roomObj: action.payload,
            }
        case 'SET_CLIENT':
            return {
                ...state,
                client: action.payload,
            }
        case 'SET_ROOM_ID':
            return {
                ...state,
                roomID: action.payload,
            }
        case 'SET_ROOM_NAME':
            return {
                ...state,
                roomName: action.payload,
            }
        case 'SET_ALL_MESSAGES':
            return {
                ...state,
                allMessages: [action.payload, ...state.allMessages],
            }
        case 'SET_ALL_SENDERS':
            return {
                ...state,
                allSenders: [action.payload, ...state.allSenders],
            }
        case 'SET_CONVERSATION':
            return {
                ...state,
                conversation: action.payload,
            }
        case 'SET_MESSAGES_POSITION':
            return {
                ...state,
                messagesPosition: [action.payload, ...state.messagesPosition],
            }
        case 'SET_CONNECTED_USERS':
            if(action.delete){
                return {
                    ...state,
                    connectedUsers: action.payload,
                }
            } else {
                return {
                    ...state,
                    connectedUsers: [...state.connectedUsers, action.payload],
                }
            }
            
        case 'SET_USER_LEFT':
            return {
                ...state,
                userLeft: action.payload
            }
        case 'SET_SESION_CLOSED':
            return {
                ...state,
                sesionClosed: action.payload
            }
        default:
            return state
    }
}

/* const [client, setClient] = useState(null)
    const [roomID, setRoomID] = useState(null)
    const [roomName, setRoomName] = useState(null)
    const [allMessages, setAllMessages] = useState([])
    const [allSenders, setAllSenders] = useState([])
    const [conversation, setConversation] = useState([])
    const [messagesPosition, setMessagesPosition] = useState([])
    const [connectedUsers, setConnectedUsers] = useState([]) */

export default chatReducer