const rootPrefix = '../..',
  basicHelper = require(rootPrefix + '/helpers/basic'),
  shortenedFromNow = require(rootPrefix + '/helpers/moment');

class VideoViewFormatter {
    constructor(params){
      const oThis = this;

      oThis.apiData = params;

      oThis._init();
    }

    _init(){
      const oThis = this;

      oThis.resultObj = {
        'video_id': '',
        'web_video_url': '',
        'mobile_video_url': '',
        'web_video_poster_url': '',
        'mobile_video_poster_url': '',
        'tokens_raised': null,
        'replies_count': null,
        'description_link': '',
        'description_display_link':'',
        'description_text': '',
        'channels_list': [],
        'profile_name': '',
        'profile_username':'',
        'original_profile_image_url': '',
        '144w_profile_image_url': '',
        'firebase_video_url': '',
        'share_url': '',
        'page_meta': {},
        'home_url' : '',
        'display_cts': ''
      }
    }

    perform(){
      const oThis = this;

      if (! oThis.apiData || typeof oThis.apiData !== 'object'){
        return oThis.resultObj;
      }

      const userVideos = oThis.apiData[oThis.apiData.result_type];
      if ( Array.isArray(userVideos) && userVideos.length > 0 ){
        let userVideo = userVideos[0];
        let userVideoId = userVideo && userVideo.payload && userVideo.payload.video_id;
        if(! userVideoId){
          return oThis.resultObj;
        }
        let videoData = oThis.apiData.videos &&  oThis.apiData.videos[userVideoId];

        oThis.resultObj['video_id'] = userVideoId;

        // Add video urls
        oThis._getVideoUrls(videoData);

        // Add video poster urls
        oThis._getPosterImageUrl(videoData, oThis.apiData);

        oThis._getVideoDetails(userVideoId);

        oThis._getChannelsData(oThis.apiData.channels);

        oThis._getVideoSharableData();
      }

      return oThis.resultObj;
    }

  _getVideoUrls(videoData) {
    const oThis = this;

    if (videoData && videoData.resolutions && videoData.resolutions['576w']) {
      oThis.resultObj['mobile_video_url'] = videoData.resolutions['576w'].url;
    } else {
      oThis.resultObj['mobile_video_url'] = videoData.resolutions['original'].url;
    }

    if (videoData && videoData.resolutions && videoData.resolutions['576w']) {
      oThis.resultObj['web_video_url'] = videoData.resolutions['576w'].url;
    } else {
      oThis.resultObj['web_video_url'] = videoData.resolutions['original'].url;
    }
  }

  _getPosterImageUrl(videoData, apiData){
    const oThis = this;

    let posterImageId = videoData.poster_image_id;
    if (posterImageId && apiData.images &&  apiData.images[posterImageId] ) {
      let posterImageData = apiData.images[posterImageId];

      if (posterImageData && posterImageData.resolutions && posterImageData.resolutions['576w']) {
        oThis.resultObj['mobile_video_poster_url'] = posterImageData.resolutions['576w'].url;
      } else {
        oThis.resultObj['mobile_video_poster_url'] = posterImageData.resolutions['original'].url;
      }

      if (posterImageData && posterImageData.resolutions && posterImageData.resolutions['576w']) {
        oThis.resultObj['web_video_poster_url'] = posterImageData.resolutions['576w'].url;
      } else {
        oThis.resultObj['web_video_poster_url'] = posterImageData.resolutions['original'].url;
      }

    }

  }

  _getVideoDetails(userVideoId){
      const oThis = this;

    // Tokens raised, no of replies, link.
    let videoDetails = oThis.apiData.video_details &&  oThis.apiData.video_details[userVideoId];
    if (videoDetails){
      oThis.resultObj['tokens_raised'] = basicHelper.convertWeiToNormal(videoDetails.total_amount_raised_in_wei).toString(10);
      oThis.resultObj['replies_count'] = videoDetails.total_replies;

      // get Link
      if (Array.isArray(videoDetails.link_ids) && videoDetails.link_ids.length > 0){
        let linkId = videoDetails.link_ids[0];
        oThis.resultObj['description_link'] = oThis.apiData.links && oThis.apiData.links[linkId] &&  oThis.apiData.links[linkId].url;
        oThis.resultObj['description_display_link'] = oThis.apiData.links[linkId].url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/$/, '');

      }

      // get Description text
      if (videoDetails.description_id){
        oThis.resultObj['description_text'] = oThis.apiData.video_descriptions &&
          oThis.apiData.video_descriptions[videoDetails.description_id] &&
          oThis.apiData.video_descriptions[videoDetails.description_id].text;
      }

      if(videoDetails.cts){
        oThis.resultObj['display_cts'] = shortenedFromNow(videoDetails.cts * 1000);
      }

      // ProfileInfo.
      oThis._getCreatorProfileInfo(videoDetails, oThis.apiData);
    }
  }

  _getCreatorProfileInfo(videoDetails, apiData){
    const oThis = this;

    // creator user Id info
    if (videoDetails.creator_user_id){
      let userInfo = apiData.users &&  apiData.users[videoDetails.creator_user_id];
      oThis.resultObj['profile_name'] = userInfo.name;
      oThis.resultObj['profile_username'] = userInfo.user_name;
      if(userInfo.profile_image_id){

        let profileImageData =  apiData.images[userInfo.profile_image_id];
        // let resolutions = profileImageData.resolutions;
        console.log(profileImageData, 'posterImageData:resolutions==========');
        if(profileImageData && profileImageData.resolutions && profileImageData.resolutions.original){
          oThis.resultObj['original_profile_image_url'] =  profileImageData.resolutions.original.url;
        }
        if(profileImageData && profileImageData.resolutions && profileImageData.resolutions['144w']){
          oThis.resultObj['144w_profile_image_url'] =  profileImageData.resolutions['144w'].url;
        }
      }
    }

  }

  _getChannelsData(channelsData){
    const oThis = this;

    let channelNames = [];
    for (let id in channelsData){
      channelNames.push (channelsData[id].name);
    }
    oThis.resultObj['channels_list'] = channelNames;
  }

  _getVideoSharableData() {
    const oThis = this;

    oThis.resultObj['firebase_video_url'] = oThis.apiData.firebase_video_url || '';
    oThis.resultObj['share_url'] = oThis.apiData.share_url || '';
    oThis.resultObj['page_meta'] = oThis.apiData.page_meta || {};
    if(oThis.resultObj['page_meta']['og']){
      oThis.resultObj['page_meta']['og']['video'] = oThis.resultObj['mobile_video_url'];
    }
    oThis.resultObj['home_url'] = oThis.apiData.home_url || '';

  }
}

module.exports = VideoViewFormatter;
