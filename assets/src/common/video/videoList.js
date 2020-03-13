import $ from 'jquery';
import ejs from 'ejs';
import videoModalDetail from './modalDetail.html';
import videoThumbnail from './thumbnail.html';
import SimpleDataTable from '../../utils/simpleDataTable';
import DataGetters from '../../model/DataGetters';
import deepGet from 'lodash/get';
import video from "./index";

class VideoList {

  constructor(){
    this.currentItemIndex = null;
    this.simpleDataTable = null;
  }

  init = (config) => {
    this.config =  config;
    this.fetchFeed();
    this.bindEvents();
  };

  bindEvents = () => {
    const jParent = $('#videoListParent'),
      jModalWrapper = $("#videoDetailsModal .videoDetailsContainer");
  
  
    jParent.on('click', '.videoList', (e) => {
        this.currentItemIndex = $(e.currentTarget).data('result-index');
        this.modalUIUpdate();
        $('#videoDetailsModal').modal('show');
        e.preventDefault();
        e.stopPropagation();
    });
  
    jModalWrapper.on('click', '.next-video', (e) => {
      this.currentItemIndex += 1;
      this.modalUIUpdate();

    });
  
  
    jModalWrapper.on('click', '.prev-video', (e) => {
      if(this.currentItemIndex >= 1){
        this.currentItemIndex -= 1;
        this.modalUIUpdate();
      }
    });

  };


  modalUIUpdate = () => {
    const jParentWrapper = $("#videoDetailsModal .videoDetailsContainer");
    let videoId = deepGet(this.getCurrentIndexResult(), 'video_id');
    const modal = ejs.compile(videoModalDetail, { client : true });
    const jModal = $(modal({
      videoId,
      DataGetters
    }));
    jParentWrapper.html(jModal);
    video.bindEvents();
  };


  getCurrentIndexResult = () => {
    let results = this.simpleDataTable.getResults();
    return deepGet(results[this.currentItemIndex], 'payload');
  };


  fetchFeed = ()=> {
    const oThis =  this;
    this.simpleDataTable = new SimpleDataTable({
      jParent: $("#videoListParent"),
      fetchResultsUrl: this.config.fetchApi,
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

export default new VideoList();
