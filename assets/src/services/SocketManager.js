import PepoSocket from "../../src/services/PepoSocket";
import CurrentUser from "../model/CurrentUser";

class SocketManager {
  constructor() {
    this.pepoSocket = null;
  }

  initSocket() {
    if (!this.pepoSocket) {
      this.pepoSocket = new PepoSocket(CurrentUser.getUserId());
      this.pepoSocket.connect();
    }
  }

  componentWillUnmount() {
    this.pepoSocket && this.pepoSocket.disconnect();
  }

  init() {
    let userId = CurrentUser.getUserId();
    console.log('PepoSocket', userId);
    if (CurrentUser.getUserId()) {
      console.log('SocketManager', 'Socket init');
      this.initSocket();
    } else {
      if(this.pepoSocket){
        this.pepoSocket.disconnect();
        this.pepoSocket = null;
      }
    }
    return null;
  }
}

export default new SocketManager();
