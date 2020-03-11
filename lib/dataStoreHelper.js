/* *
* Returns a formatted Object for know entities
* */



const merge =  require("lodash/merge");
const deepGet =  require("lodash/get");
const assignIn = require("lodash/assignIn");


// This is data store setter which checks for
// whitelisted entities from response and set

const backendToAppEntities = {
  ost_transaction: 'transaction_entities',
  tags: 'tag_entities',
  tag_search_results:'tag_entities',
  user_search_results:'user_entities',
  user_profile: 'user_profile_entities',
  user_profiles: 'user_profile_entities',
  user_stats: 'user_stat_entities',
  links: 'link_entities',
  video_descriptions: 'video_description_entities',
  videos: 'video_entities',
  video_details: 'video_stat_entities',
  reply_details: 'reply_detail_entities',
  current_user_video_relations: 'current_user_video_relation_entities',
  current_user_reply_detail_relations: 'current_user_reply_detail_relation_entities',
  images: 'image_entities',
  texts: 'text_entities',
  current_user_video_contributions: 'video_contribution_entities',
  current_user_reply_detail_contributions: 'reply_contribution_entities',
  current_user_user_contributions: 'user_contribution_entities',
  price_points: {
    key: 'price_points',
    parser: parser_price_points
  },
  token: 'token',
  users: 'user_entities',
  contribution_to_users: 'user_entities',
  contribution_by_users: 'user_entities',
  channel_users: 'user_entities',
  user_contribution_to_stats: {
    key: 'user_contribution_to_stats',
    parser: parser_merge
  },
  user_contribution_by_stats: {
    key: 'user_contribution_by_stats',
    parser: parser_merge
  },
  contribution_suggestions: 'user_entities',
  public_activity: 'activities_entities',
  user_activity: 'activities_entities',
  user_videos: 'user_video_entities',
  tag_videos: 'tag_video_entities',
  user_notifications: 'user_notifications',
  feeds: 'feed_entities',
  notification_unread: 'notification_unread',
  feed: 'feed_entities',
  twitter_users : 'twitter_entities',
  user_allowed_actions: 'user_allowed_action_entities',
  pepocorn_balance: {
    key: 'pepocorn',
    parser: parser_direct_assign
  },
  unseen_replies: 'unseen_replies_entities',
  channels: 'channel_entities',
  channel: 'channel_entities',
  channel_details: 'channel_detail_entities',
  channel_detail: 'channel_detail_entities',
  channel_stats: 'channel_stat_entities',
  channel_stat: 'channel_stat_entities',
  channel_taglines: 'channel_tagline_entities',
  current_user_channel_relations: 'current_user_channel_relation_entities',
  channel_user_relations: {
    key :  'channel_user_relation_entities',
    parser: parser_merge
  }
};

// This is a map of signular entity result_type w.r.t. result_type of result collect (Array/HashMap) of same type.
const knownSinglularEntities = {
  user_profile: 'user_profiles'
};

function getEntities(entities, key = 'id') {
  if (entities instanceof Array) {
    return getEntitiesFromArray(entities, key);
  }
  return getEntitiesFromObj(entities, key);
};

function getEntitiesFromArray (resultData, key = 'id') {
  const entities = {};
  resultData.forEach((item) => {
    entities[`${key}_${item[key]}`] = item;
  });
  return entities;
};

function getEntitiesFromObj (resultObj, key = 'id'){
  const entities = {};
  for (let identifier in resultObj) {
    if (resultObj.hasOwnProperty(identifier)) {
      let key_identifier = isNaN(parseInt(identifier)) ? identifier : `${key}_${identifier}`;
      entities[key_identifier] = resultObj[identifier];
    }
  }
  return entities;
};

function parser_merge (oldState, newState)  {
  return merge({}, oldState, newState);
};

function parser_direct_assign (oldState, newState) {
  return newState;
};

function parser_price_points (oldState, newState) {
  //Make sure price_points is not null;
  if (!newState) {
    return oldState;
  }

  // Make sure response has keys;
  if ( !Object.keys(newState).length ) {
    return oldState;
  }

  return {
    ...oldState,
    ...newState
  };
};

module.exports = (response, data = {}) => {

  // Get backend data
  let responseData = deepGet(response, 'data');

  // Return cloned data if no data
  if (!responseData) return {...data};

  // Clone data for later use
  let newState = {...data};

  let whitelistedEntities = [];

  // Loop on backend data for whitelisted processing
  for (let entity in responseData) {

    if (responseData.hasOwnProperty(entity)) {

      // App entity to parse or assignIn as-is
      let appEntity = backendToAppEntities[entity] ,
        entityData = responseData[entity];

      // In case of singular entities, convert to array
      if( knownSinglularEntities[entity] ){
        entityData = [entityData];
      }

      // Proceed only if whitelisted
      if(appEntity) {
        if(typeof appEntity === 'string'){
          // Default processing (assignIn)
          newState[appEntity] = assignIn({}, data[appEntity], getEntities(entityData));
          whitelistedEntities.push(entity);
        } else {
          // Parser based processing
          const appEntityKey = appEntity.key;
          if( appEntityKey && typeof appEntity.parser === 'function'){
            newState[appEntityKey] = appEntity.parser(data[appEntityKey], getEntities(entityData));
            whitelistedEntities.push(entity);
          }
        }
      }

    }
  }
  if(whitelistedEntities.length > 0) console.log('Upserting following whitelisted entities: ', whitelistedEntities);
  return newState;

};
