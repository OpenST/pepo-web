import $ from 'jquery';
import ejs from 'ejs';
import feedItemModal from './feedItemModal.html';
import feedItemList from './feedItemList.html';
import SimpleDataTable from '../utils/simpleDataTable';
import FeedItemData from '../utils/FeedItemData/base';
import deepGet from 'lodash/get';




class Feed {

  constructor(){
  }

  init = (config) => {
    this.bindEvents();
    this.fetchFeed();
  };

  bindEvents = () => {
    const jFeedParent = $('#feedParent'),
      jFeedParentWrapper = $("#feedModalWrapper");


      jFeedParent.on('click', '.feedList', (e) => {
      let videoId = $(e.currentTarget).data('video-id');
      const feedModal = ejs.compile(feedItemModal, { client : true });
      const jFeedModal = $(feedModal(new FeedItemData(videoId)));
        jFeedParentWrapper.html( '');
        jFeedParentWrapper.append(jFeedModal);
        $('#feedModal').modal('show');
        e.preventDefault();
        e.stopPropagation();
    });
  };


  fetchFeed = ()=> {
    const oThis =  this;
    const simpleDataTable = new SimpleDataTable({
      jParent: $("#feedParent"),
      fetchResultsUrl: "/api/web/feeds",
      rowTemplate: ejs.compile(feedItemList, {client: true}),
      getRowData : function (result) {
        const videoId = deepGet(result, 'payload.video_id');
        return new FeedItemData(videoId);
      }
    });
  }
}

export default new Feed();
