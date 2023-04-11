import { Server } from 'socket.io';
import SimpleWebRTC from 'simplewebrtc';

const io = new Server(8888, {
  path: '/my-socket-path'
});

const webrtc = new SimpleWebRTC({
  autoRequestMedia: true,
  url: 'https://localhost:8888',
  socketio: io,
  media: {
    video: true,
    audio: true
  },
  receiveMedia: {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  }
});

webrtc.on('readyToCall', function () {
  console.log('SimpleWebRTC est prêt à se connecter aux pairs !');
});
