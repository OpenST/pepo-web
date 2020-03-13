import $ from 'jquery';
import ejs from 'ejs';
import videoModalDetail from './modalDetail.html';
import videoThumbnail from './thumbnail.html';
import SimpleDataTable from '../../utils/simpleDataTable';
import DataGetters from '../../model/DataGetters';
import deepGet from 'lodash/get';

const nextFetchThreshold =  4;


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
      if(this.simpleDataTable.isLoadingData) return;
      const resultsLn = this.simpleDataTable.getResults().length ;
      this.currentItemIndex += 1;
      if ( this.currentItemIndex  >= resultsLn - nextFetchThreshold ){
        this.simpleDataTable.fetchResults(false , ()=> {
          this.modalUpdateOnLast(resultsLn);
        });
      }
      this.modalUpdateOnNext(resultsLn );
    });

    jModalWrapper.on('click', '.prev-video', (e) => {
      if(this.currentItemIndex >= 1){
        this.currentItemIndex -= 1;
        this.modalUIUpdate();
      }
    });
  };

  modalUpdateOnNext(resultsLn){
    if( this.currentItemIndex < resultsLn ){
      this.modalUIUpdate();
    }
  }

  modalUpdateOnLast(resultsLn){
    if( this.currentItemIndex + 1 == resultsLn ) {
      this.modalUIUpdate();
    } else if(this.currentItemIndex == resultsLn  ){
      this.arrowsUpdate();
    }
  }

  arrowsUpdate = () => {
    const resultsLn = this.simpleDataTable.getResults().length ;
    $('.prev-video').show();
    $('.next-video').show();
    if (this.currentItemIndex <= 0){
      $('.prev-video').hide();
    }
    if( !this.simpleDataTable.hasNextPage && resultsLn - 1 <= this.currentItemIndex ){
      $('.next-video').hide();
    }
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
    this.arrowsUpdate();
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
