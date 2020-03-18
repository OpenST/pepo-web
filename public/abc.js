var apiKey = "46559682";
var sessionId = "1_MX40NjU1OTY4Mn5-MTU4NDQ2ODkzNjY1MX5OMjNqYnNxSFBIN3hXK1BOV2lQeUJQeWZ-fg";
var token = "T1==cGFydG5lcl9pZD00NjU1OTY4MiZzaWc9NWQxNWIzYmM2MzljNjhlOGQyNzIyOTVjZWI0ZDJmNjE0OWI5YjIyODpzZXNzaW9uX2lkPTFfTVg0ME5qVTFPVFk0TW41LU1UVTRORFEyT0Rrek5qWTFNWDVPTWpOcVluTnhTRkJJTjNoWEsxQk9WMmxRZVVKUWVXWi1mZyZjcmVhdGVfdGltZT0xNTg0NTA5OTQ5Jm5vbmNlPTAuOTczNDc3MTMxMjMxNjI5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1ODUxMTQ3MjcmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";
//
// var apiKey = "46566572";
// var sessionId = "2_MX40NjU2NjU3Mn5-MTU4NDUzODg2MTA1Mn5UUzVhY1ppWDRHQTE4ak4ycTRwaG0zVjB-fg";
// var token = "T1==cGFydG5lcl9pZD00NjU2NjU3MiZzaWc9MmE2NWQ4NWZmNDg5MDJkMzdhOTAzMzgwNzMzN2Y0MTA3MTNkMDlhMDpzZXNzaW9uX2lkPTJfTVg0ME5qVTJOalUzTW41LU1UVTRORFV6T0RnMk1UQTFNbjVVVXpWaFkxcHBXRFJIUVRFNGFrNHljVFJ3YUcwelZqQi1mZyZjcmVhdGVfdGltZT0xNTg0NTM4ODg1Jm5vbmNlPTAuMjM0MTk3OTAxMDUwNDA1NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTg1MTQzNjg0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";


var mainAdded = false;
var audioEvent1 = null;
var movingAvg = {};
var switchVideoTimeOut = 0;

initializeSession();

function addSubscriberToMain() {
  var jEls = $("#subscriber > div.OT_subscriber");
  if (!mainAdded && jEls.length > 0) {
    mainAdded = true;
    $("#main").append(jEls[0]);
  }else{
    mainAdded = false;
  }
}

function handleError(err) {
  console.log("handleError===============");
  console.log(err);
}


function switchMarkup(id) {
  clearTimeout(switchVideoTimeOut);
  switchVideoTimeOut = setTimeout(() => {
    switchMarkupWithTimeout(id);
  }, 300)
}


// var lastSwitchedId = null;
// var idToSwitch = {};
// var switchVideoTimeOut = 0;
//
// function switchMarkup(id) {
//   var preTime = idToSwitch["id"] && idToSwitch["id"]["uts"] || 0;  //GET previous time for id
//   if(!preTime) return ; //Return As a person should speak for at least 1 second
//   var currTime = Date.now() ; //TIME in milliseconds
//   if( currTime - preTime  >= 1000) { //IF differences is greater than 1s, switch video
//     idToSwitch[id] ={};
//     idToSwitch[id]["uts"] = currTime;
//     __switchMarkup(id);
//   }
// }

function switchMarkupWithTimeout(id) {

  var jMainMarkup = $("#main .OT_subscriber").get(0);
  if (!jMainMarkup || (jMainMarkup.id == id)) {
    return;
  }

  var jSubscriberMarkup = $(`#${id}`).get(0);
  if (!jSubscriberMarkup) {
    if (!jMainMarkup || !jMainMarkup.id) {
      console.log("addSubscriberToMain CALLED from switchMarkupWithTimeout because no main id and subscriber id found ");
      addSubscriberToMain();
    }
    return;
  }

  $("#main").append(jSubscriberMarkup);
  $("#subscriber").append(jMainMarkup);
  mainAdded = true;
}

$("#subscriber").on("click", ".OT_subscriber", function (e) {
  var id = $(this).attr("id");
  console.log("switchMarkupWithTimeout CALLED from subscriber click action");
  switchMarkupWithTimeout(id);
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
      audioSource: true,
      // insertMode: 'after',
      publishAudio: true,
      // insertDefaultUI: false
    }, handleError);

    // subscriber.subscribeToAudio(true);

    subscriber.on('audioLevelUpdated', function (event) {

      // console.log('AudioLevelUpdatedEvent RECEIVED');
      if (!audioEvent1) {
        audioEvent1 = event;
      }


      if (event && event.audioLevel) {
        var id = event.target.id;
        var currentAvg = movingAvg[id] || null;

        // console.log('AudioLevelUpdatedEvent: ', event.audioLevel, event.target.id);
        if (currentAvg === null || currentAvg <= event.audioLevel) {
          currentAvg = event.audioLevel;
        } else {
          currentAvg = 0.7 * currentAvg + 0.3 * event.audioLevel;
        }

        movingAvg[id] = currentAvg;

        var jMainMarkup = $("#main .OT_subscriber").get(0);
        if (!jMainMarkup || !jMainMarkup.id) {
          console.log("switchMarkupWithTimeout CALLED from voice event because no main id");
          switchMarkupWithTimeout(id);
        } else if (jMainMarkup.id != id) {
          var mainAvg = (movingAvg[jMainMarkup.id] || 0);
          if (mainAvg < currentAvg - 0.1) {

            // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
            var logLevel = (Math.log(currentAvg) / Math.LN10) / 1.5 + 1;
            logLevel = Math.min(Math.max(logLevel, 0), 1);
            if (logLevel > 0.5) {
              console.log(`switchMarkup CALLED from voice event because logLevel:${logLevel}, currentAvg:${currentAvg}, mainAvg:${mainAvg}`);
              // console.log('logLevel > 0.5 for target', event, event.target, event.target.id, logLevel);
              switchMarkup(id);
            }
          }
        }
      }
    });

  });

  session.on("connectionCreated", function (event) {
    // console.log("HERE connectionCreated",session);
    // console.log("connectionCreated========", $("#subscriber > div"));
    setTimeout(function () {
      console.log("addSubscriberToMain CALLED from connectionCreated");
      addSubscriberToMain();
    }, 500);
  });

  session.on("connectionDestroyed", function (event) {
    setTimeout(function () {
      a = $("#main > div");
      // console.log("HERE=======connectionDestroyed=============", a.length);
      if (a.length == 0) {
        mainAdded = false;
        console.log("addSubscriberToMain CALLED from connectionDestroyed");
        addSubscriberToMain();
      }
    }, 500);
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
    publishAudio: true
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