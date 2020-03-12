/*
 * TODO: Remove used for testing
 */
// var userObj = {
//     "logged_in_user": {
//       "id": 2579,
//       "uts": 1583494145,
//       "signup_airdrop_status": 1,
//       "user_id": 2579
//     },
//     "users": {
//       "2579": {
//         "id": 2579,
//         "user_name": "Test_k6cd95gykm",
//         "name": "Test",
//         "status": "ACTIVE",
//         "approved_creator": 1,
//         "uts": 1583494145,
//         "ost_user_id": "73323346-307b-4638-b66a-6ce6c5f6f4ca",
//         "ost_token_holder_address": "0xe9ac4b04547095f8557e4bac8375846492039a95",
//         "ost_status": "ACTIVATED",
//         "profile_image_id": "8251"
//       }
//     },
//     "images": {
//       "8251": {
//         "id": 8251,
//         "resolutions": {
//           "144w": {
//             "size": 6004,
//             "height": "145",
//             "width": "144",
//             "url": "https://dbvoeb7t6hffk.cloudfront.net/pepo-staging1000/ua/images/2579-6b27f2856f87481aa69c9594a15e5e8d-144w.jpeg"
//           },
//           "original": {
//             "size": 48274,
//             "height": "511",
//             "width": "509",
//             "url": "https://dbvoeb7t6hffk.cloudfront.net/pepo-staging1000/ua/images/2579-6b27f2856f87481aa69c9594a15e5e8d-original.jpeg"
//           }
//         },
//         "status": "ACTIVE",
//         "uts": 1581330915
//       }
//     },
//     "utm_params": {},
//     "meta": {
//       "is_registration": 1,
//       "invite_code": "",
//       "service_type": "google"
//     },
//     "go_to": {
//       "pn": null,
//       "v": null
//     },
//     "result_type": "logged_in_user"
//   }

class CurrentUser {
    constructor(params){
        this.apiData = params && params.data;
    }

    initUser(apiResponse){
        //TODO merger logined_user and user from data.users and set it at this level
    }

    _getUser(){
        return this.apiData && this.apiData.logged_in_user;
    }

    _getUserDetails(){
        return this.apiData && this.apiData.users;
    }

    _getUserImage(){
        return this.apiData && this.apiData.images;
    }

    isLoggedIn(){
        return !!this._getUser();
    }

    getUserName(){
        var user = this._getUser();
        if(!user) return;

        var userId = user.id,
            userDetails = this._getUserDetails();
        return userDetails && userDetails[userId] && userDetails[userId].name;
    }

    getUserProfileImage(){
        var user = this._getUser();
        if(!user) return;

        var userId = user.id,
        userDetails = this._getUserDetails();
        var profileImageId = userDetails[userId].profile_image_id,
            userImage = this._getUserImage(),
            image = userImage && userImage[profileImageId];
        return image && image.resolutions &&
                 image.resolutions['144w'] && image.resolutions['144w'].url;
    }

    getLoginType(){
        return this.apiData && this.apiData.meta && this.apiData.meta.service_type;
    }

}

module.exports = CurrentUser;
