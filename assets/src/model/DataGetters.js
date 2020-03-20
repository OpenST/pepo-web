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

  getOwnerProfileImage (id , size){
    let profileImageId =  deepGet(this.getUserInfo(id), 'profile_image_id');
    size = size || "144w" ;
    return deepGet(getDataStore(), `image_entities[${PREFIX}${profileImageId}].resolutions.${size}.url`)
      || deepGet(getDataStore(), `image_entities[${PREFIX}${profileImageId}].resolutions.original.url`) ;
  }

  getImageUrl(id, size){
    return deepGet(getDataStore(), `image_entities[${PREFIX}${id}].resolutions.${size}.url`)
      || deepGet(getDataStore(), `image_entities[${PREFIX}${id}].resolutions.original.url`);
  }

  getUserName (id) {
    return deepGet(this.getUserInfo(id), 'user_name');
  }

  getName(id){
    return deepGet(this.getUserInfo(id), 'name');

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
    return deepGet(getDataStore(), `link_entities[${PREFIX}${linkId}].url` );

  }

  getDisplayDescriptionLink(id){
    let videoDetails  = this.getVideoDetails(id);
    let linkId = deepGet(videoDetails, 'link_ids[0]');
    return deepGet(getDataStore(), `link_entities[${PREFIX}${linkId}].url`) &&
      deepGet(getDataStore(), `link_entities[${PREFIX}${linkId}].url`).replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/$/, '');
  }

  getChannelEntity(id){
    return deepGet(getDataStore(), `channel_entities[${PREFIX}${id}]`)
  }

  getChannelList (id) {
    let channelsList  = deepGet(this.getVideoDetails(id), 'channel_ids') || [];
    let channelArray = [];
    for (let channelId of channelsList){
      channelArray.push({name: deepGet(this.getChannelEntity(channelId), 'name'), permalink: deepGet(this.getChannelEntity(channelId), 'permalink')});
    }
    return channelArray;
  }

  getDisplayCTS(id) {
    let videoDetails  = this.getVideoDetails(id);
    return shortenedFromNow(videoDetails.cts * 1000);

}

  getVideoShareUrl(id){
    return basicHelper.getVideoShareUrl(id)
  }

  getChannelName(id){
    return deepGet(this.getChannelEntity(id), 'name');
  }

  getChannelTagText(id){
    return this.getText(deepGet(this.getChannelDetailEntity(id), 'tagline_id'));
  }

  getChannelDesc(id){
    return this.getText(deepGet(this.getChannelDetailEntity(id), 'description_id'));
  }

  getChannelVideoCount(id){
    return deepGet(this.getChannelStatsEntity(id), 'total_videos');
  }

  getChannelMemberCount(id){
    return deepGet(this.getChannelStatsEntity(id), 'total_users');
  }

  getChannelCoverImage(id){
    return this.getImageUrl(deepGet(this.getChannelDetailEntity(id), 'cover_image_id'), '576w');
  }


  getChannelDetailEntity(id){
    return deepGet(getDataStore(), `channel_detail_entities[${PREFIX}${id}]`);
  }

  getChannelStatsEntity(id){
    return deepGet(getDataStore(), `channel_stat_entities[${PREFIX}${id}]`);
  }

  getText(id){
    return deepGet(getDataStore(), `text_entities[${PREFIX}${id}].text`);
  }




}

export default new DataGetters();






