import PepoSocket from "../../src/services/PepoSocket";

class SocketManager {
  constructor() {
    this.pepoSocket = null;
  }

  initSocket() {
    if (!this.pepoSocket) {
      this.pepoSocket = new PepoSocket('73323346-307b-4638-b66a-6ce6c5f6f4ca');
      this.pepoSocket.connect();
    }
  }

  componentWillUnmount() {
    this.pepoSocket && this.pepoSocket.disconnect();
  }

  init() {
    if (true) {
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
