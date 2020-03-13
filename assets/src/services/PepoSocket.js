import deepGet from 'lodash/get';
const { $ } = window;
// import socketPixelCall from './../services/SocketPixelCall'

const reconnectionAttempts = 10;

class PepoSocket {
  constructor(userId) {
    this.userId = userId;
    this.endPoint = null;
    this.protocol = null;
    this.payload = null;
    this.socket = null;
    this.isConnecting = false;
    this.attempt = 0;
  }

  setConnectionParams(response) {
    let resultType = deepGet(response, 'data.result_type');
    this.endPoint = deepGet(response, `data.${resultType}.websocket_endpoint.endpoint`);
    this.protocol = deepGet(response, `data.${resultType}.websocket_endpoint.protocol`);
    this.authKeyExpiryAt = deepGet(response, `data.${resultType}.auth_key_expiry_at`);
    this.payload = deepGet(response, `data.${resultType}.payload`);
  }

  connect() {

    if(this.isConnecting) {
      console.log(`Socket instance is connecting, aborting...`);
      return;
    }

    console.log(`Getting websocket details to connect...`);

    this.isConnecting = true;
    // this.getWebSocketDetails(this.userId);
    // .then((response) => {
    //   this.setConnectionParams(response);
    //
    //   if(!this.protocol || !this.endPoint || !this.authKeyExpiryAt || !this.payload){
    //     console.log(`Invalid params received, aborting...`);
    //     return;
    //   }
    //
    //   console.log(`Connecting to socket server ${this.protocol}://${this.endPoint}`);
    //
    //   this.socket = io(
    //     `${this.protocol}://${this.endPoint}?auth_key_expiry_at=${this.authKeyExpiryAt}&payload=${this.payload}`,
    //     {
    //       jsonp: false,
    //       transports: ['websocket'],
    //       reconnectionAttempts: reconnectionAttempts
    //     }
    //   );
    //
    //   // //Assign socket object to emitters
    //   // socketPixelCall.setPepoSocket(this.socket);
    //
    //   this.socket.on('connect', () => {
    //     console.log(`Connected to socket server ${this.protocol}://${this.endPoint} successfully!`);
    //     this.isConnecting = false;
    //   });
    //
    //   this.socket.on('connect_error', (err) => {
    //     console.log(`Error connecting to socket server ${this.protocol}://${this.endPoint} reason:`, err);
    //     this.isConnecting = false;
    //   });
    //
    //   this.socket.on('disconnect', (reason) => {
    //     console.log(`Disconnected from socket server ${this.protocol}://${this.endPoint} reason: ${reason}`);
    //     this.isConnecting = false;
    //     if (reason === 'io server disconnect') {
    //       // the disconnection was initiated by the server, you need to reconnect manually
    //       this.connect();
    //     }
    //   });
    //
    //   this.socket.on('pepo-stream', (payload) => {
    //     if (payload && payload.notification_unread) {
    //       console.log('Payload unread', payload);
    //     }
    //   });
    // });
  }

  getWebSocketDetails(userId) {
    let urlEndpoint = this.getUrlEndpoint(userId);
    console.log('PepoSocket', urlEndpoint);
    $.ajax({
      url: urlEndpoint,
      method:'GET',
      success: ( response )=>{
        console.log('PepoSocket', JSON.stringify(response, null, 4));
      },
      error : ( xhr,status,error )=>{
        console.log('PepoSocket', JSON.stringify(error, null, 4));
      },
      complete: ()=>{
        console.log('PepoSocket', 'Complete');
      }
    });
  }

  getUrlEndpoint(userId) {
    return `/api/web/users/${userId}/websocket-details`;
  }

  disconnect() {
    if(this.socket){
      console.log(`Disconnecting from socket server ${this.protocol}://${this.endPoint}`);
      this.socket.close();
    }
  }
}

export default PepoSocket;
