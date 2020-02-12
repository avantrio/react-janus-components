import React, { useState } from 'react';
import './App.css';

import {  JanusComponent, 
          JanusVideoRoom, 
          JanusPublisher, 
          JanusSubscriber, JanusPlayer, JanusChat } from 'react-janus-components';

function App() {
  const [room, setRoom] = useState(null);
  const [pubId, setPubId] = useState(null);
  const [pubPvtId, setPubPvtId] = useState(null);

  const [chatroom, setChatroom] = useState(null);

  return (
    <div className="App">
      <JanusComponent 
        server="http://localhost:8088/janus"
      >
        <JanusVideoRoom>
          <JanusPublisher
            opaqueId="test12234"
            secret="1234"
            username="test_dude"
            setRoom={setRoom}
            setPubId={setPubId}
            setPubPvtId={setPubPvtId}
          >
            <JanusPlayer 
                readyText="Something"
              />
            </JanusPublisher>
          <JanusSubscriber
            opaqueId="test12234"
            room={room}
            pubId={pubId}
            pubPvtId={pubPvtId}
          >
              <JanusPlayer 
                readyText="Something"
              />
            </JanusSubscriber>

        </JanusVideoRoom>
        <JanusChat
          opaqueId="test12234"
          isPublisher={true}
          chatroom={chatroom}
          setChatroom={setChatroom}
          username="mainboi"
          display="Main guy 123"
        />

        { chatroom ? (
        <JanusChat
          opaqueId="test12234"
          isPublisher={false}
          chatroom={chatroom}
          setChatroom={setChatroom}
          username="subboi"
          display="Sub guy 456"
        />) : (<div></div>)
        }
      </JanusComponent>
    </div>
  );
}

export default App;
