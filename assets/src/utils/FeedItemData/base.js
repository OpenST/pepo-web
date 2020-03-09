import deepGet from "lodash/get";
import basicHelper from "../../helpers/basic";

class Base {

  constructor(item, associatedData, params = {}){
    this.associatedData = associatedData;
    this.params = params;
    this.videoId = deepGet(item, 'payload.video_id');
    this.ownerId = deepGet(item, 'payload.user_id');
    this.videoDetailId = deepGet(item, 'payload.video_detail_id');
  }

  perform (){
    return {
      userName: this.getUserName(),
      description: this.getDescription(),
      profileImage: this.getOwnerProfileImage(),
      videoCoverImage: this.getVideoCoverImage(),
      amountRaised : this.getAmountRaised()
    }
  }

  getVideoCoverImage(){
    let videoInfo = this.getVideoInfo();
    let posterImageId = videoInfo.poster_image_id;
    return deepGet(this.associatedData, `images[${posterImageId}].resolutions['576w'].url`) ||
      deepGet(this.associatedData, `images[${posterImageId}].resolutions['original'].url`);
  }

  getAmountRaised (){
    return basicHelper.convertWeiToNormal(this.getVideoDetails().total_amount_raised_in_wei).toString(10);
  }

  getOwnerProfileImage (){
      // creator user Id info
        let userInfo =  this.getUserInfo();
        // 144w can be used
        return deepGet(this.associatedData, `images[${userInfo.profile_image_id}].resolutions.original.url`) || '';
  }

  getUserName () {
    let userInfo =  this.getUserInfo();
    return userInfo.user_name || '';
  }

  getDescription () {
    return this.getDescriptionObject()['text'] || '';
  }

  getDescriptionObject () {
    let videoDetails = this.getVideoDetails();
    return deepGet(this.associatedData, `video_descriptions[${videoDetails.description_id}]`) || {};
  }

  getVideoDetails (){
    let videoDetails =  deepGet(this.associatedData, `video_details[${this.videoId}]`);
    return videoDetails || {};
  }

  getUserInfo (){
    return deepGet(this.associatedData, `users[${this.ownerId}]`);
  }

  getVideoInfo(){
    return deepGet(this.associatedData, `videos[${this.videoId}]`);
  }



}

export default Base;
