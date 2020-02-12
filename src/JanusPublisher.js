import React, { useRef, useState, useEffect } from 'react';
import Janus from './utils/janus';
import { publishToRoom, publishOwnFeed, unpublishOwnFeed, sendData, publishChatroom } from './utils/publisher';
import JanusPlayer from './JanusPlayer';
import JanusChat from './JanusChat';

const JanusPublisher = ({ janus, opaqueId, room, secret, pin, username, setRoom, setPubId, setPubPvtId, children }) => {
    const [playerState, setPlayerState] = useState("Ready");
    const [isMuted, setIsMuted] = useState(false);
    const [sfutest, setSfuTest] = useState(null);

    const videoArea = useRef(null);
    let mystream = null;
    
    useEffect(() => {
        publishToRoom(janus, opaqueId, room, secret, pin, username, true,
            (_sfutest, eventType, data) => {
                setSfuTest(_sfutest);
                if(eventType === "created"){
                    setRoom(data.room);
                }else if(eventType === "joined"){
                    const { id, private_id} = data;

                    setPubId(id);
                    setPubPvtId(private_id);

                    setPlayerState("Paused");
                }else if(eventType === "onlocalstream"){
                    mystream = data;
                    const videoContainer = videoArea.current;
                    const videoPlayer = videoContainer.querySelector(".janus-video-player")

                    Janus.attachMediaStream(videoPlayer, mystream);
                    if (_sfutest.webrtcStuff.pc.iceConnectionState !== "completed" &&
                        _sfutest.webrtcStuff.pc.iceConnectionState !== "connected") {
                        setPlayerState("Live");
                    }
                    var videoTracks = mystream.getVideoTracks();
                    if (videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
                        setPlayerState("Error");
                    }
                }else if(eventType === "oncleanup"){
                    setPlayerState("Paused");
                    setIsMuted(false);
                }else if(eventType === "error"){
                    setPlayerState("Error");
                    setIsMuted(false);
                }
            }
        )

    }, [janus])

    const onStartClick = () => {
        publishOwnFeed(sfutest, true);
    }

    const onStopClick = () => {
        unpublishOwnFeed(sfutest);
        setPlayerState("Paused");
    }   

    const onMuteClick = () => {
        if(!sfutest.isAudioMuted()){
            sfutest.muteAudio();
        }
        setIsMuted(sfutest.isAudioMuted());
    }

    const onUnMuteClick = () => {
        if(sfutest.isAudioMuted()){
            sfutest.unmuteAudio();
        }
        setIsMuted(sfutest.isAudioMuted());
    }

    const onBandwidthChange = (bitrate) => {
        sfutest.send({"message": { "request": "configure", "bitrate": bitrate }});
    }

    const playerElement = children ? children : <JanusPlayer />;

    return (
        <div className="janus-publisher">
            <div className="janus-video">
                { React.cloneElement(playerElement, { 
                    ref: videoArea,
                    isPublisher: true,
                    status:playerState,
                    isMuted:isMuted,
                    onStart:onStartClick,
                    onStop:onStopClick,
                    onMute:onMuteClick, 
                    onUnmute:onUnMuteClick, 
                    onBandwidthChange:onBandwidthChange
                }) }
            </div>
        </div>
    )
};

export default JanusPublisher;