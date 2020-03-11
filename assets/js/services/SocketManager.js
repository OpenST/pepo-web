
class SocketManager {
  constructor() {
    this.pepoSocket = null;
  }

  initSocket() {
    if (!this.pepoSocket) {
      this.pepoSocket = new PepoSocket(this.props.currentUserId);
      this.pepoSocket.connect();
    }
  }

  componentWillUnmount() {
    this.pepoSocket && this.pepoSocket.disconnect();
  }

  render() {
    if (this.props.currentUserId) {
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

module.exports = SocketManager;
