import './App.css';
import { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"

const encoded = encodeURI("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6ImI5OWY1NDQzLTlmZjgtNDY4MS05MDI2LWY2MzlmZmY3MGQwOSIsImV4cCI6MTYyMzA5MjkwNiwidXNlcl9pZCI6IjEiLCJ1c2VyX25hbWUiOiJ0ZXN0QHRlc3QuY29tIn0.dF5_p56opFFuQjM95gBqdyFgiVsqShOOiVgyI_7R5kQ")

function App() {

  const [client, setClient] = useState(null)

  useEffect(() => {
    setClient(new W3CWebSocket('ws://acapp.herokuapp.com/ws', ['token', encoded]))
  }, [])

  useEffect(() => {
    
    if(client){
      
      const socketObj = {
        "action": "join-room",
        "message": "test",
        "target": null,
        "sender": {
          "id": 1,
          "name": "Carlos Reyes" // Sender es un usuario o el sistema
        }
      }

      setTimeout(function(){ client.send(JSON.stringify(socketObj)) }, 3000);

      const socketObj2 = {
        "action": "send-message",
        "message": "Hola, profe",
        "target": {
          "id": "a398a164-d05c-46a2-b710-66cc6dc6d060",
          "name": "test"
        },
        "sender": {
          "id": 1,
          "name": "Carlos Reyes" // Sender es un usuario o el sistema
        }
      }

      setTimeout(() => {
        client.send(JSON.stringify(socketObj2))
      }, 10000);
      

      client.onmessage = function(event) {
        console.log("WebSocket message received:", event);
        console.log(JSON.parse(event.data))
      };
    }
  }, [client])
  

  /* useEffect(() => {
    client.onopen = (e) => {
      console.log("LOOOG")
      console.log(e)
    }
  }, []) */

 /*  useEffect(() => {
    client.addEventListener('open', ()=>{
      console.log("Connected")
    })
  }, []) */


  return (
    <div className="App">
      <button>Send Message</button>
    </div>
  );
}

export default App;
