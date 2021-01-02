import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LogIn from "./LogIn";
import { useStateValue } from "./StateProvider";

function App() {
  const [{user}, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("5e1f0f586658d79d6cbc", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="App">
      {!user ? (
        <LogIn/>
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat messages={messages} />
              </Route>
              <Route path="/">
                <Chat messages={messages} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
