import io from 'socket.io-client'
import React, { useEffect, useRef, useState } from "react"
import Peer from 'simple-peer'
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsPhone, BsFillMicFill, BsCameraVideoFill, BsFillTelephoneFill, BsFillPersonFill } from "react-icons/bs";
import { MDBIcon } from 'mdb-react-ui-kit';
const socket = io.connect('http://localhost:5002')
  
export default function Test3(){
  
  const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")

	const myVideo = useRef(null) 
	const userVideo = useRef()
	const connectionRef= useRef()
  
  useEffect(() => {       
    // allow to use the webcam and the micro
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			 myVideo.current.srcObject = stream
		})

	socket.on("me", (id) => {
    console.log("Received ID:", id);
      console.log(id);
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})

    socket.on("me", (id) => {
			setMe(id)
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})   
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

  const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

  const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

  return(         
    <>
    <div className="partner-img mb-5" style={{paddingLeft:"900px", paddingTop:"100px"}}>
                <img 
                  src="assets/images/logo/logo-1.png"
                  alt="partner image"
                  style={{maxWidth: '100%',    
                    height: 'auto'}}
                />
              </div>
    
      <div className="container" >
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "500px" }}
              />
            ) : null}
          </div>
        </div>
        <div className="partner-img " style={{paddingLeft:"550px"}}>
                <img 
                  src="assets/images/blog/line.png"
                  alt="partner image"
                />
              </div>
        <div className="myId"> 
          <FormControl 
          style={{ marginBottom: "20px", fontSize: "14px", padding: "6px 12px" }}
              
            id="filled-basic"
            placeholder="Name"
            aria-label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
          <CopyToClipboard text={me} onCopy={() => console.log('ID copied to clipboard')}>
          <Button
            className="main-btn yellow-bg mb-4"
            type="button"> <MDBIcon far icon="copy" />
            Copy ID
          </Button>
          </CopyToClipboard>

          <FormControl
            id="filled-basic"
            placeholder="ID to call"
            aria-label="ID to call"  
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="danger" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <Button className="main-btn yellow-bg mb-4"
              type="button" aria-label="call" onClick={() => callUser(idToCall)}>
                <MDBIcon fas icon="mobile" />
              </Button>
            )}
            {me && <div>{me}</div>}  
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="secondary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )

}