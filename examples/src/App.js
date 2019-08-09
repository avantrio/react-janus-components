import React, { useState } from 'react';
import './App.css';

import {  JanusComponent, 
          JanusVideoRoom, 
          JanusPublisher, 
          JanusSubscriber } from 'react-janus-components';

function App() {
  const [room, setRoom] = useState(null);
  const [pubId, setPubId] = useState(null);
  const [pubPvtId, setPubPvtId] = useState(null);

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
          />
          <JanusSubscriber
            opaqueId="test12234"
            room={room}
            pubId={pubId}
            pubPvtId={pubPvtId}
          />
        </JanusVideoRoom>
      </JanusComponent>
    </div>
  );
}

export default App;
