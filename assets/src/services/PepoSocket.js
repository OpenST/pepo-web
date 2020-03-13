import deepGet from 'lodash/get';
import io from 'socket.io-client';

const {$} = window;

const reconnectionAttempts = 10;

const LOG_TAG = "PepoSocket";

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

    if (this.isConnecting) {
      console.log(LOG_TAG, `Socket instance is connecting, aborting...`);
      return;
    }

    console.log(LOG_TAG, `Getting websocket details to connect...`);

    this.isConnecting = true;
    this.getWebSocketDetails(this.userId)
      .then((response) => {
        this.setConnectionParams(response);

        if (!this.protocol || !this.endPoint || !this.authKeyExpiryAt || !this.payload) {
          console.log(LOG_TAG, `Invalid params received, aborting...`);
          return;
        }

        console.log(LOG_TAG, `Connecting to socket server ${this.protocol}://${this.endPoint}`);

        this.establishSocketConnection();
      });
  }


  establishSocketConnection() {
    this.socket = io(
      `${this.protocol}://${this.endPoint}?auth_key_expiry_at=${this.authKeyExpiryAt}&payload=${this.payload}`,
      {
        jsonp: false,
        transports: ['websocket'],
        reconnectionAttempts: reconnectionAttempts
      }
    );

    // //Assign socket object to emitters
    // socketPixelCall.setPepoSocket(this.socket);

    this.socket.on('connect', () => {
      console.log(LOG_TAG, `Connected to socket server ${this.protocol}://${this.endPoint} successfully!`);
      this.isConnecting = false;
    });

    this.socket.on('connect_error', (err) => {
      console.log(LOG_TAG, `Error connecting to socket server ${this.protocol}://${this.endPoint} reason:`, err);
      this.isConnecting = false;
    });

    this.socket.on('disconnect', (reason) => {
      console.log(LOG_TAG, `Disconnected from socket server ${this.protocol}://${this.endPoint} reason: ${reason}`);
      this.isConnecting = false;
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.connect();
      }
    });

    this.socket.on('pepo-stream', (payload) => {
      if (payload && payload.notification_unread) {
        console.log(LOG_TAG, 'Payload unread', payload);
      }
    });
  }


  getWebSocketDetails(userId) {
    let _resolve,
      _reject,
      urlEndpoint = this.getUrlEndpoint(userId)
    ;

    console.log(LOG_TAG, urlEndpoint);
    $.ajax({
      url: urlEndpoint,
      method: 'GET',
      success: (response) => {
        console.log(LOG_TAG, JSON.stringify(response, null, 4));
        return _resolve(response);
      },
      error: (xhr, status, error) => {
        console.log(LOG_TAG, JSON.stringify(error, null, 4));
        return _reject(error);
      },
      complete: () => {
        console.log(LOG_TAG, 'Complete');
      }
    });

    return new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  }

  getUrlEndpoint(userId) {
    return `/api/web/users/${userId}/websocket-details`;
  }

  disconnect() {
    if (this.socket) {
      console.log(LOG_TAG, `Disconnecting from socket server ${this.protocol}://${this.endPoint}`);
      this.socket.close();
    }
  }
}

export default PepoSocket;
