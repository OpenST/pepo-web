const basicHelper = require('../../helpers/basic');

  const defaultResultObject = {
    'video_id': '',
    'web_video_url': '',
    'mobile_video_url': '',
    'web_video_poster_url': '',
    'mobile_video_poster_url': '',
    'tokens_raised': null,
    'replies_count': null,
    'description_link': '',
    'description_text': '',
    'channels_list': [],
    'profile_name': '',
    'profile_username':'',
    'original_profile_image_url': '',
    '144w_profile_image_url': '',
    'firebase_video_url': '',
    'share_url': '',
    'page_meta': {},
    'home_url' : ''
}



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
  let videoUrlsObj = _getVideoSharableData(apiData, resultObj);
  Object.assign(resultObj, videoUrlsObj);

  return Object.assign(defaultResultObject ,resultObj);
}

function _getVideoSharableData(apiData, resultObj) {
  let sharableObject = {};
  sharableObject['firebase_video_url'] = apiData.firebase_video_url || '';
  sharableObject['share_url'] = apiData.share_url || '';
  sharableObject['page_meta'] = apiData.page_meta || {};
  if(sharableObject['page_meta']['og']){
    sharableObject['page_meta']['og']['video'] = resultObj['mobile_video_url'];
  }
  sharableObject['home_url'] = apiData.home_url || '';

  return sharableObject;

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
      if(profileImageData && profileImageData.resolutions && profileImageData.resolutions['144w']){
        profileInfo['144w_profile_image_url'] =  profileImageData.resolutions['144w'].url;
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

    if (posterImageData && posterImageData.resolutions && posterImageData.resolutions['576w']) {
      posterObject['mobile_video_poster_url'] = posterImageData.resolutions['576w'].url;
    } else {
      posterObject['mobile_video_poster_url'] = posterImageData.resolutions['original'].url;
    }

    if (posterImageData && posterImageData.resolutions && posterImageData.resolutions['576w']) {
      posterObject['web_video_poster_url'] = posterImageData.resolutions['576w'].url;
    } else {
      posterObject['web_video_poster_url'] = posterImageData.resolutions['original'].url;
    }

  }
  return posterObject;

}

function _getBTAmount(amountInWei) {
  return basicHelper.convertWeiToNormal(amountInWei).toString(10);
}

function _getVideoUrls(videoData) {
  let urlObject = {};
  if (videoData && videoData.resolutions && videoData.resolutions['576w']) {
    urlObject['mobile_video_url'] = videoData.resolutions['576w'].url;
  } else {
    urlObject['mobile_video_url'] = videoData.resolutions['original'].url;
  }

  if (videoData && videoData.resolutions && videoData.resolutions['576w']) {
    urlObject['web_video_url'] = videoData.resolutions['576w'].url;
  } else {
    urlObject['web_video_url'] = videoData.resolutions['original'].url;
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
