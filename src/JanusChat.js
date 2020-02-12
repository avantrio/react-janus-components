import React, { useRef, useState, useEffect } from 'react';
import { publishChatroom, sendData } from './utils/chatroom';

const JanusChat = ({ janus, opaqueId, isPublisher, chatroom, setChatroom, username, display }) => {
    const [chatroomHandler, setChatroomHandler] = useState(null);

    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [recvObj, setRecvObj] = useState(null);

    useEffect(() => {
        publishChatroom(janus, opaqueId, isPublisher, chatroom, username, display,
            (_chatroomHandler, eventType, data) => {
                if(eventType === "created"){
                    setChatroom(data);
                }else if(eventType === "joined"){
                    setChatroomHandler(_chatroomHandler);
                }else if(eventType === "ondata"){
                    setRecvObj(data);
                    console.log(data);
                }
            }
        );
        
    }, [janus]);

    useEffect(() => {
        if(recvObj !== null){
            setMessages([...messages, recvObj]);
        }        
    }, [recvObj])

    const onMessageSend = () => {
        // setMessages([...messages, currentMessage]);
        sendData(chatroomHandler, chatroom, currentMessage);
        setCurrentMessage("");
    }

    function getDateString(jsonDate) {
        var when = new Date();
        if(jsonDate) {
            when = new Date(Date.parse(jsonDate));
        }
        var dateString =
                ("0" + when.getUTCHours()).slice(-2) + ":" +
                ("0" + when.getUTCMinutes()).slice(-2) + ":" +
                ("0" + when.getUTCSeconds()).slice(-2);
        return dateString;
    }

    return (
        <div className="janus-chat-container">
            <div className="janus-chat-history">
                {messages && messages.map((message, idx) => (
                    <div className="janus-chat-display" key={idx}>
                        <span className="date">[{getDateString(message.date)}]</span>
                        <span className="user">{message.user}:</span>
                        <span className="message">{message.data}</span>    
                    </div>
                ))}
            </div>
            <div className="janus-chat-control">
                <div className="janus-chat-message">
                    <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                    <button onClick={onMessageSend}>Send</button>
                </div>
            </div>
        </div>
    )
};

export default JanusChat;