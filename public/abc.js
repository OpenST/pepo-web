var apiKey = "46559682";
var sessionId = "1_MX40NjU1OTY4Mn5-MTU4NDQ2ODkzNjY1MX5OMjNqYnNxSFBIN3hXK1BOV2lQeUJQeWZ-fg";
var token = "T1==cGFydG5lcl9pZD00NjU1OTY4MiZzaWc9NWQxNWIzYmM2MzljNjhlOGQyNzIyOTVjZWI0ZDJmNjE0OWI5YjIyODpzZXNzaW9uX2lkPTFfTVg0ME5qVTFPVFk0TW41LU1UVTRORFEyT0Rrek5qWTFNWDVPTWpOcVluTnhTRkJJTjNoWEsxQk9WMmxRZVVKUWVXWi1mZyZjcmVhdGVfdGltZT0xNTg0NTA5OTQ5Jm5vbmNlPTAuOTczNDc3MTMxMjMxNjI5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1ODUxMTQ3MjcmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";

var mainAdded = false;
// var apiKey = "46560962";
// var sessionId = "1_MX40NjU1OTY4Mn5-MTU4NDQ2Mzc5NTI0M35zdEUrZjhMZWlaNnROaUhyRWI2d0g5MVN-UH4";
// var token = "T1==cGFydG5lcl9pZD00NjU1OTY4MiZzaWc9ZWQ1YjMyMGExMjA4MGM0NGYyMWFmYmM0Zjc5NDE0ZjBiYjhhODU0YzpzZXNzaW9uX2lkPTFfTVg0ME5qVTFPVFk0TW41LU1UVTRORFEyTXpjNU5USTBNMzV6ZEVVclpqaE1aV2xhTm5ST2FVaHlSV0kyZDBnNU1WTi1VSDQmY3JlYXRlX3RpbWU9MTU4NDQ2MzgwNSZub25jZT0wLjY3NjcwMTI5MDM5ODU1NTkmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU4NDQ4NTQwNCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";


// 7bff3a4e2c23bdf50541431ce6e945a9029ddd4b
// (optional) add server code here
initializeSession();

function addSubscriberToMain() {
  setTimeout(function(){
    a = $("#subscriber > div.OT_subscriber");
    console.log("HERE====================",a.length);
    if (!mainAdded) {
      mainAdded = true;
      $("#main").append(a[0]);
    }
  }, 1000);
}

function handleError(err) {
  console.log("handleError===============");
  console.log(err);
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function (event) {
    var subscriber = session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      // audioBitrate: '64,000',
      frameRate: 30,
      // insertDefaultUI: true,
      resolution: "1280x720",
      audioSource: false,
      // insertMode: 'after',
      publishAudio: true,
      // insertDefaultUI: false
    }, handleError);

    //
    // subscriber.on('videoElementCreated', function (event) {
    // });
  
    subscriber.subscribeToAudio(true);

  });

  // session.on('subscribe', function (event) {
  //   console.log("HEREsubscribesubscribesubscribe",event);
  // });
  //
  // session.on('videoElementCreated', function (event) {
  //   console.log("VideoElementCreatedEvent======",event);
  // });


  session.on("connectionCreated", function (event) {
    // console.log("HERE connectionCreated",session);
    console.log("connectionCreated========",$("#subscriber > div"));

    addSubscriberToMain();
  });

  session.on("connectionDestroyed", function (event) {
    setTimeout(function(){
      a = $("#main > div");
      if (a.length == 0) {
        mainAdded = false;
        addSubscriberToMain();
      }
    }, 1000);
  });


  // Create a publisher
  var publisher = OT.initPublisher('subscriber', {
    insertMode: 'append',
    width: '100%',
    height: '100%',
    // audioBitrate: '64,000',
    // frameRate: 30,
    // insertDefaultUI: true,
    resolution: "1280x720",
    frameRate: 30,
    audioSource: true,
    publishAudio: false
  }, handleError);

  // publisher.on('streamCreated', function (event) {
  //   console.log('Stream resolution: ' +
  //     event.stream.videoDimensions.width +
  //     'x' + event.stream.videoDimensions.height);
  //   console.log('Frame rate: ' + event.stream.frameRate);
  // });

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}