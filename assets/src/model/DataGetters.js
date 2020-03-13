import deepGet from "lodash/get";
import basicHelper from "../helpers/basic";
import shortenedFromNow from '../helpers/moment';


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

  getName(id){
    let userInfo =  this.getUserInfo(id);
    return userInfo.name || '';

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

  getVideoUrl(id) {
    const oThis = this;
    const videoData = oThis.getVideoInfo(id);
    return deepGet(videoData, `resolutions['576w'].url` ) || deepGet(videoData, `resolutions['original'].url` );
  }


  getTotalVideoReplies (id){
    let videoDetails  = this.getVideoDetails(id);
    return deepGet(videoDetails, 'total_replies');
  }

  getDescriptionLink(id){
    let videoDetails  = this.getVideoDetails(id);
    let linkId = deepGet(videoDetails, 'link_ids[0]');
    return deepGet(getDataStore(), `link_entities[${linkId}].url` );

  }

  getDisplayDescriptionLink(id){
    let videoDetails  = this.getVideoDetails(id);
    let linkId = deepGet(videoDetails, 'link_ids[0]');
    return deepGet(getDataStore(), `link_entities[${linkId}].url`) &&
      deepGet(getDataStore(), `link_entities[${linkId}].url`).replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/$/, '');
  }

  getChannelEntity(id){
    return deepGet(getDataStore(), `channel_entities[${PREFIX}${id}]`)
  }

  getChannelList (id) {
    let channelsList  = deepGet(this.getVideoDetails(id), 'channel_ids') || [];
    let channelNames = [];
    for (let channelId of channelsList){
      channelNames.push(deepGet(this.getChannelEntity(channelId), 'name'));
    }
    return channelNames;
  }

  getDisplayCTS(id) {
    let videoDetails  = this.getVideoDetails(id);
    return shortenedFromNow(videoDetails.cts * 1000);

}

}

export default new DataGetters();


const a = {

  'video_id'
:
  '',
    'web_video_url'
:
  '',
    'mobile_video_url'
:
  '',
    'web_video_poster_url'
:
  '',
    'mobile_video_poster_url'
:
  '',
    'tokens_raised'
:
  null,
    'replies_count'
:
  null,
    'description_link'
:
  '',
    'description_display_link'
:
  '',
    'description_text'
:
  '',
    'channels_list'
:
  [],
    'profile_name'
:
  '',
    'profile_username'
:
  '',
    'original_profile_image_url'
:
  '',
    '144w_profile_image_url'
:
  '',
    'firebase_video_url'
:
  '',
    'share_url'
:
  '',
    'page_meta'
:
  {
  }
,
  'home_url'
:
  '',
    'display_cts'
:
  ''


}








