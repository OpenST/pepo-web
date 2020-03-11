const basicHelper = require("../../helpers/basic");
const deepGet =  require("lodash/get");

const PREFIX = 'id';

class Feeds {
  constructor(data) {
    this.data = data;
  }

  /*
  *
  * getVideoCoverImage
  *
  * */

  getVideoCoverImage(videoId){
    let videoInfo = this.getVideoInfo(videoId);
    let posterImageId = videoInfo.poster_image_id;
    return deepGet(this.data, `image_entities[${PREFIX}_${posterImageId}].resolutions['576w'].url`) ||
      deepGet(this.data, `image_entities[${PREFIX}_${posterImageId}].resolutions['original'].url`);
  }

  getVideoInfo(videoId){
    console.log(this.data, deepGet(this.data, `video_entities`), videoId);
    return deepGet(this.data, `video_entities[${PREFIX}_${videoId}]`);
  }

  getVideoDescription (videoId) {
    return this.getDescriptionObject(videoId)['text'] || '';
  }

  getDescriptionObject (videoId) {
    let videoDetails = this.getVideoDetails(videoId);
    return deepGet(this.data, `video_description_entities[${PREFIX}_${videoDetails.description_id}]`) || {};
  }


  getVideoDetails (videoId){
    let videoDetails =  deepGet(this.data, `video_stat_entities[${PREFIX}_${videoId}]`);
    return videoDetails || {};
  }

  getOwnerUserName(videoId){
    let userInfo =  this.getUserInfo(videoId);
    return userInfo.user_name || '';

  }

  getAmountRaised(videoId){
    return basicHelper.convertWeiToNormal(this.getVideoDetails(videoId).total_amount_raised_in_wei).toString(10);
  }


  getOwnerProfileImage (){
    // creator user Id info
    let userInfo =  this.getUserInfo();
    // 144w can be used
    return deepGet(this.data, `image_entities[${PREFIX}_${userInfo.profile_image_id}].resolutions.original.url`) || '';
  }


  getUserInfo (videoId){
    let ownerId = this.getVideoDetails(videoId).creator_user_id;
    return deepGet(this.data, `user_entities[${PREFIX}_${ownerId}]`);
  }

}

module.exports = Feeds;
