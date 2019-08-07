import React, { useRef, useState, useEffect } from 'react';
import Janus from './utils/janus';

const JanusVideoRoom = ({ children, janus, roomId }) => {
    useEffect(() => {
        if(janus){
            
        }
    }, [janus])
    return (
        <div className="janus-video-room">
            {children &&
                children.length && 
                    children.map((child, i) => (
                        React.cloneElement(child, { janus: janus, key: i })
                    ))
            }
            {children &&
                !children.length && 
                    React.cloneElement(children, { janus: janus })
            }
        </div>
    );
}

export default JanusVideoRoom