const basicHelper = require('../../helpers/basic');

function videoDataFormatter(apiData){
  if (! apiData || typeof apiData !== 'object'){
    return;
  }
  let resultObj = {};
  let resultType = apiData.result_type;
  let userVideos = apiData[resultType];
  if ( Array.isArray(userVideos) && userVideos.length > 0 ){
    let userVideo = userVideos[0];
    let userVideoId = userVideo && userVideo.payload && userVideo.payload.video_id;
    if(! userVideoId){
      return resultObj;
    }
    let videoData = apiData.videos &&  apiData.videos[userVideoId];

    resultObj['video_id'] = userVideoId;

    // Add video urls
    let videoUrlsObj = _getVideoUrls(videoData);
    Object.assign(resultObj, videoUrlsObj);


    // Add video poster urls
    let videoPosterObj = _getPosterImageUrl(videoData, apiData);
    Object.assign(resultObj, videoPosterObj);


    // Tokens raised, no of replies, link.
    let videoDetails = apiData.video_details &&  apiData.video_details[userVideoId];
      if (videoDetails){
        resultObj['tokens_raised'] = _getBTAmount(videoDetails.total_amount_raised_in_wei);
        resultObj['replies_count'] = videoDetails.total_replies;

        // get Link
        if (Array.isArray(videoDetails.link_ids) && videoDetails.link_ids.length > 0){
          let linkId = videoDetails.link_ids[0];
          resultObj['description_link'] = apiData.links && apiData.links[linkId] &&  apiData.links[linkId].url;
        }

        // get Description text
        if (videoDetails.description_id){
          resultObj['description_text'] = apiData.video_descriptions &&  apiData.video_descriptions[videoDetails.description_id]
          && apiData.video_descriptions[videoDetails.description_id].text;
        }

        // ProfileInfo.
        let creatorProfileInfoObj = _getCreatorProfileInfo(videoDetails, apiData);
        Object.assign(resultObj, creatorProfileInfoObj);
      }

      let channelsData = apiData.channels;
      if(channelsData){
        resultObj['channels_list'] = _getChannelsData(channelsData);
      }
    }

    console.log('================================');
    console.log(resultObj, 'resultObj');
    console.log('================================');
  return resultObj;
}

function _getCreatorProfileInfo(videoDetails, apiData){
  // creator user Id info
  let profileInfo = {};
  if (videoDetails.creator_user_id){
    let userInfo = apiData.users &&  apiData.users[videoDetails.creator_user_id];
    profileInfo['profile_name'] = userInfo.name;
    profileInfo['profile_username'] = userInfo.user_name;
    if(userInfo.profile_image_id){

      let profileImageData =  apiData.images[userInfo.profile_image_id];
      // let resolutions = profileImageData.resolutions;
      console.log(profileImageData, 'posterImageData:resolutions==========');
      if(profileImageData && profileImageData.resolutions && profileImageData.resolutions.original){
        profileInfo['original_profile_image_url'] =  profileImageData.resolutions.original.url;
      }
      if(profileImageData && profileImageData.resolutions && profileImageData.resolutions['288w']){
        profileInfo['288w_profile_image_url'] =  profileImageData.resolutions['288w'].url;
      }
    }
  }
  return profileInfo;
}

function _getPosterImageUrl(videoData, apiData){
  let posterObject = {};
  let posterImageId = videoData.poster_image_id;
  if (posterImageId && apiData.images &&  apiData.images[posterImageId] ) {
    let posterImageData = apiData.images[posterImageId];

    console.log(posterImageData, 'posterImageData:resolutions==========');
    if (posterImageData && posterImageData.resolutions && posterImageData.resolutions.original) {
      posterObject['original_video_poster_url'] = posterImageData.resolutions.original.url;
    }
    if (posterImageData && posterImageData.resolutions && posterImageData.resolutions['288w']) {
      posterObject['288w_video_poster_url'] = posterImageData.resolutions['288w'].url;
    }
  }
  return posterObject;

}

function _getBTAmount(amountInWei) {
  return basicHelper.convertWeiToNormal(amountInWei).toString(10);
}

function _getVideoUrls(videoData) {
  let urlObject = {};
  if (videoData && videoData.resolutions && videoData.resolutions.original) {
    urlObject['original_video_url'] = videoData.resolutions.original.url;
  }
  if (videoData && videoData.resolutions && videoData.resolutions['576w']) {
    urlObject['576w_video_url'] = videoData.resolutions['576w'].url;
  }
  if (videoData && videoData.resolutions && videoData.resolutions['external']) {
    urlObject['external_video_url'] = videoData.resolutions['external'].url;
  }
  return urlObject;
}

function _getChannelsData(channelsData){
  let channelNames = [];
  for (let id in channelsData){
    channelNames.push (channelsData[id].name);
  }
return channelNames;
}

module.exports = videoDataFormatter;
