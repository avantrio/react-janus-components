import React, { useRef, useState, useEffect } from 'react';

const JanusPlayer = React.forwardRef((
    { 
        isPublisher, 
        status, 
        isMuted,
        onStart, 
        onStop, 
        onMute, 
        onUnmute, 
        onBandwidthChange,
        
        readyText,
        pausedText,
        liveText,
        errorText
    }, ref ) => {
    return (
        <div className="janus-video-container" ref={ref}>
            <div className="janus-video-status">
                {status === "Ready" && (
                    <span style={{color:"grey"}}>{ readyText ? readyText : 'Ready' }</span>
                )}
                {status === "Paused" && (
                    <span style={{color:"grey"}}>{ pausedText ? readyText : 'Paused' }</span>
                )}
                {status === "Live" && (
                    <span style={{color:"green"}}>{ liveText ? readyText : 'Live' }</span>
                )}
                {status === "Error" && (
                    <span style={{color:"red"}}>{ errorText ? readyText : 'Error' }</span>
                )}
            </div>
            <video 
                className="janus-video-player" 
                autoPlay 
                playsInline />
            
            {isPublisher && (
                <div className="janus-video-controls">
                    {status === "Paused" && (
                        <div className="janus-btn" onClick={onStart}>Start Recording</div>
                    )}
                    {status === "Live" && (
                        <div className="janus-btn" onClick={onStop}>Stop Recording</div>
                    )}

                    {status === "Live" && (
                        <React.Fragment>
                            {isMuted && (
                                <div className="janus-btn" onClick={onUnmute}>UnMute</div>
                            )}
                            {!isMuted && (
                                <div className="janus-btn" onClick={onMute}>Mute</div>
                            )}
                        </React.Fragment>  
                    )}

                    <div className="janus-select">
                        <select onChange={(e) => { onBandwidthChange(parseInt(e.target.value)*1000) }}>
                            <option value={0}>Auto</option>
                            <option value={128}>128 kbit</option>
                            <option value={256}>256 kbit</option>
                            <option value={512}>512 kbit</option>
                            <option value={1000}>1 mbit</option>
                            <option value={1500}>1.5 mbit</option>
                            <option value={2000}>2 mbit</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
})

export default JanusPlayer;