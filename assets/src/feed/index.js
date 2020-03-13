import $ from 'jquery';
import ejs from 'ejs';
import videoModalDetail from '../video/modalDetail.html';
import videoThumbnail from '../video/thumbnail.html';
import SimpleDataTable from '../utils/simpleDataTable';
import DataGetters from '../model/DataGetters';
import deepGet from 'lodash/get';




class Feed {

  constructor(){
    this.currentItemIndex = null;
    this.simpleDataTable = null;
  }

  init = (config) => {
    // sequence is important.
    this.fetchFeed();
    this.bindEvents();
  };

  bindEvents = () => {
    const jFeedParent = $('#feedParent'),
      jFeedModalWrapper = $("#feedModal .modal-dialog .modal-content .feedContainer");


      jFeedParent.on('click', '.feedList', (e) => {
        this.currentItemIndex = $(e.currentTarget).data('result-index');
        this.modalUIUpdate();
        $('#feedModal').modal('show');
        e.preventDefault();
        e.stopPropagation();
    });

    jFeedModalWrapper.on('click', '.next-video', (e) => {
      this.currentItemIndex += 1;
      this.modalUIUpdate();

    });


    jFeedModalWrapper.on('click', '.prev-video', (e) => {
      if(this.currentItemIndex >= 1){
        this.currentItemIndex -= 1;
        this.modalUIUpdate();
      }
    });

  };


  modalUIUpdate = () => {
    const jFeedParentWrapper = $("#feedModal .modal-dialog .modal-content .feedContainer");
    let videoId = deepGet(this.getCurrentIndexResult(), 'video_id');
    const feedModal = ejs.compile(videoModalDetail, { client : true });
    const jFeedModal = $(feedModal({
      videoId,
      DataGetters
    }));
    //jFeedParentWrapper.html( '');
    jFeedParentWrapper.html(jFeedModal);
  };


  getCurrentIndexResult = () => {
    let results = this.simpleDataTable.getResults();
    return deepGet(results[this.currentItemIndex], 'payload');
  };


  fetchFeed = ()=> {
    const oThis =  this;
    this.simpleDataTable = new SimpleDataTable({
      jParent: $("#feedParent"),
      fetchResultsUrl: "/api/web/feeds",
      rowTemplate: ejs.compile(videoThumbnail, {client: true}),
      getRowData : function (result) {
        return {
          videoId: deepGet(result, 'payload.video_id'),
          item : result,
          DataGetters
        };
      }
    });
  }
}

export default new Feed();
