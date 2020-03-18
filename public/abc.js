var apiKey = "46559682";
var sessionId = "1_MX40NjU1OTY4Mn5-MTU4NDQ2ODkzNjY1MX5OMjNqYnNxSFBIN3hXK1BOV2lQeUJQeWZ-fg";
var token = "T1==cGFydG5lcl9pZD00NjU1OTY4MiZzaWc9NWQxNWIzYmM2MzljNjhlOGQyNzIyOTVjZWI0ZDJmNjE0OWI5YjIyODpzZXNzaW9uX2lkPTFfTVg0ME5qVTFPVFk0TW41LU1UVTRORFEyT0Rrek5qWTFNWDVPTWpOcVluTnhTRkJJTjNoWEsxQk9WMmxRZVVKUWVXWi1mZyZjcmVhdGVfdGltZT0xNTg0NTA5OTQ5Jm5vbmNlPTAuOTczNDc3MTMxMjMxNjI5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1ODUxMTQ3MjcmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";

var mainAdded = false;
var audioEvent = null;
var audioEvent1 = null;

initializeSession();

function addSubscriberToMain() {
  setTimeout(function () {
    var jEls = $("#subscriber > div.OT_subscriber");
    if (!mainAdded) {
      mainAdded = true;
      $("#main").append(jEls[0]);
    }
  }, 1000);
}

function handleError(err) {
  console.log("handleError===============");
  console.log(err);
}

var lastSwitched = null;
var switchVideoTimeOut = 0;
function switchMarkup(id) {
  clearTimeout(switchVideoTimeOut);
  setTimeout(()=> {
    __switchMarkup(id);
  }, 1000)
}

function __switchMarkup (id) {
  if(id == lastSwitched) return;
  lastSwitched = id;
  var jMainMarkup = $("#main .OT_subscriber").get(0);
  var jSubscriberMarkup = $(`#${id}`).get(0);
  if(!jSubscriberMarkup) return;
  $("#main").append(jSubscriberMarkup);
  $("#subscriber").append(jMainMarkup);
}

$("#subscriber").on("click" , ".OT_subscriber" , function (e){
  var id = $(this).attr("id");
  switchMarkup(id);
});

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

    // subscriber.subscribeToAudio(true);

    var movingAvg = null;

    subscriber.on('audioLevelUpdated', function (event) {

      // console.log('AudioLevelUpdatedEvent RECEIVED');
      if (!audioEvent1) {
        audioEvent1 = event;
      }

      if (event && event.audioLevel) {
        // console.log('AudioLevelUpdatedEvent: ', event.audioLevel, event.target.id);
        if (movingAvg === null || movingAvg <= event.audioLevel) {
          movingAvg = event.audioLevel;
        } else {
          movingAvg = 0.7 * movingAvg + 0.3 * event.audioLevel;
        }

        // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
        var logLevel = (Math.log(movingAvg) / Math.LN10) / 1.5 + 1;
        logLevel = Math.min(Math.max(logLevel, 0), 1);
        if(logLevel > 0.5){
          console.log('logLevel > 0.5 for target', event , event.target , event.target.id, logLevel);
          switchMarkup(event.target.id);
        }
      }
    });


  });

  session.on("connectionCreated", function (event) {
    // console.log("HERE connectionCreated",session);
    console.log("connectionCreated========", $("#subscriber > div"));
    mainAdded = false;
    addSubscriberToMain();
  });

  session.on("connectionDestroyed", function (event) {
    setTimeout(function(){
      a = $("#main > div");
      console.log("HERE=======connectionDestroyed=============", a.length);
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

  publisher.on('streamCreated', function (event) {
    console.log('Stream resolution: ' +
      event.stream.videoDimensions.width +
      'x' + event.stream.videoDimensions.height);
    console.log('Frame rate: ' + event.stream.frameRate);
  });

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