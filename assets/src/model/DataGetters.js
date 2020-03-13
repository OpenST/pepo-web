import deepGet from "lodash/get";
import basicHelper from "../helpers/basic";


const PREFIX = 'id_';


import  {getDataStore} from "./DataStore";

class DataGetters {

  getVideoCoverImage(id){
    let videoInfo = this.getVideoInfo(id);
    let posterImageId = videoInfo.poster_image_id;
    return deepGet(getDataStore(), `image_entities[${PREFIX}${posterImageId}].resolutions['576w'].url`) ||
      deepGet(getDataStore(), `image_entities[${PREFIX}${posterImageId}].resolutions['original'].url`);
  }

  getAmountRaised (id){
    return basicHelper.convertWeiToNormal(this.getVideoDetails(id).total_amount_raised_in_wei).toString(10);
  }

  getOwnerProfileImage (id){
    let userInfo =  this.getUserInfo(id);
    return deepGet(getDataStore(), `image_entities[${PREFIX}${userInfo.profile_image_id}].resolutions.original.url`) || '';
  }

  getUserName (id) {
    let userInfo =  this.getUserInfo(id);
    return userInfo.user_name || '';
  }

  getDescription (id) {
    return this.getDescriptionObject(id)['text'] || '';
  }

  getDescriptionObject (id) {
    let videoDetails = this.getVideoDetails(id);
    return deepGet(getDataStore(), `video_description_entities[${PREFIX}${videoDetails.description_id}]`) || {};
  }

  getVideoDetails (id){
    let videoDetails =  deepGet(getDataStore(), `video_stat_entities[${PREFIX}${id}]`);
    return videoDetails || {};
  }

  getUserInfo (id){
    return deepGet(getDataStore(), `user_entities[${PREFIX}${id}]`);
  }

  getVideoOwnerId(id){
    return this.getVideoDetails(id)['creator_user_id'];

  }

  getVideoInfo(id){
    return deepGet( getDataStore(), `video_entities[${PREFIX}${id}]`);
  }

}

export default new DataGetters();












