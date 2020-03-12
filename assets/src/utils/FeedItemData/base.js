import deepGet from "lodash/get";
import basicHelper from "../../helpers/basic";
import  ns from "../../libs/namespace";
const pepo = ns("pepo");
const PREFIX = 'id_';


class Base {

  constructor(videoId){
    this.videoId = videoId;
  }

  getVideoCoverImage(){
    let videoInfo = this.getVideoInfo();
    let posterImageId = videoInfo.poster_image_id;
    return deepGet(pepo.dataStore, `image_entities[${PREFIX}${posterImageId}].resolutions['576w'].url`) ||
      deepGet(pepo.dataStore, `image_entities[${PREFIX}${posterImageId}].resolutions['original'].url`);
  }

  getAmountRaised (){
    return basicHelper.convertWeiToNormal(this.getVideoDetails().total_amount_raised_in_wei).toString(10);
  }

  getOwnerProfileImage (){
      // creator user Id info
        let userInfo =  this.getUserInfo();
        // 144w can be used
        return deepGet(pepo.dataStore, `image_entities[${PREFIX}${userInfo.profile_image_id}].resolutions.original.url`) || '';
  }

  getUserName () {
    let userInfo =  this.getUserInfo();
    console.log(userInfo,'userInfo:getUserName');
    return userInfo.user_name || '';
  }

  getDescription () {
    return this.getDescriptionObject()['text'] || '';
  }

  getDescriptionObject () {
    let videoDetails = this.getVideoDetails();
    return deepGet(pepo.dataStore, `video_description_entities[${PREFIX}${videoDetails.description_id}]`) || {};
  }

  getVideoDetails (){
    let videoDetails =  deepGet(pepo.dataStore, `video_stat_entities[${PREFIX}${this.videoId}]`);
    return videoDetails || {};
  }

  getUserInfo (){
    console.log(this.getVideoOwnerId(), 'getVideoOwnerId=====');
    return deepGet(pepo.dataStore, `user_entities[${PREFIX}${this.getVideoOwnerId()}]`);
  }

  getVideoOwnerId(){
    return this.getVideoDetails()['creator_user_id'];

  }

  getVideoInfo(){
    return deepGet(pepo.dataStore, `video_entities[${PREFIX}${this.videoId}]`);
  }

}

export default Base;












