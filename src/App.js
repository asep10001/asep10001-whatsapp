import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const[messages, setMessages] = useState([])
  useEffect(() => {

    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data)
    })
  }, [])
  useEffect(() => {
    const pusher = new Pusher("5e1f0f586658d79d6cbc", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);


  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
