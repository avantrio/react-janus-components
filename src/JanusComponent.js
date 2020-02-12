import React, { useRef, useState, useEffect } from 'react';
import Janus from './utils/janus';

const JanusComponent = ({ children, server }) => {
    const janusEl = useRef(null);
    const [janusInstance, setJanusInstance] = useState(null);

    useEffect(() => {

        Janus.init({debug: "all", callback: function() {
            if(!Janus.isWebrtcSupported()) {
				console.log("No WebRTC support... ");
				return;
            }
            
            const janus = new Janus(
				{
					server: server,
					// No "iceServers" is provided, meaning janus.js will use a default STUN server
					// Here are some examples of how an iceServers field may look like to support TURN
					// 		iceServers: [{urls: "turn:yourturnserver.com:3478", username: "janususer", credential: "januspwd"}],
					// 		iceServers: [{urls: "turn:yourturnserver.com:443?transport=tcp", username: "janususer", credential: "januspwd"}],
					// 		iceServers: [{urls: "turns:yourturnserver.com:443?transport=tcp", username: "janususer", credential: "januspwd"}],
					// Should the Janus API require authentication, you can specify either the API secret or user token here too
					//		token: "mytoken",
					//	or
					//		apisecret: "serversecret",
					success: function() {
						// Attach to echo test plugin
                        console.log("Janus loaded");
                        setJanusInstance(janus);
					},
					error: function(error) {
						Janus.error(error);
                        setJanusInstance(null);
					},
					destroyed: function() {
                        setJanusInstance(null);
					}
                });
        }});

    }, [])
    
    return (
        <div className="janus-container" ref={janusEl}>
            {children &&
                children.length && 
                    children.map((child, i) => (
                        React.cloneElement(child, { janus: janusInstance, key: i })
                    ))
            }
            {children &&
                !children.length && 
                    React.cloneElement(children, { janus: janusInstance })
            }    
        </div>
    );
}

export default JanusComponent;