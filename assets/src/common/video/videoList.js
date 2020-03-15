import $ from 'jquery';
import ejs from 'ejs';
import videoModalDetail from './modalDetail.html';
import videoThumbnail from './thumbnail.html';
import SimpleDataTable from '../../utils/simpleDataTable';
import DataGetters from '../../model/DataGetters';
import deepGet from 'lodash/get';
import video from "./index";

const nextFetchThreshold =  4;


class VideoList {

  constructor(){
    this.currentItemIndex = null;
    this.simpleDataTable = null;
  }

  init = (config) => {
    this.config =  config;
    this.currentItemIndex = null;
    this.simpleDataTable = null;
    this.jModalWrapper =  $("#videoDetailsModal .videoDetailsContainer");
    this.arrowClickTimeOut = 0;
    this.fetchFeed();
    this.bindEvents();
  };

  bindEvents = () => {
    const jParent = $('#videoListParent'),
      jModalWrapper = this.jModalWrapper;


    jParent.off().on('click', '.videoList', (e) => {
        this.currentItemIndex = $(e.currentTarget).data('result-index');
        this.modalUIUpdate();
        $('#videoDetailsModal').modal('show');
        e.preventDefault();
        e.stopPropagation();
    });
    jModalWrapper.off();

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

    $('#videoDetailsModal').on('hide.bs.modal', function (event) {
      $(this).find(".videoDetailsContainer").empty();
    })
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
    this.pauseAllVideos();
    const jModal = this.getModalMarkup();
    this.updateModalUI(jModal);
    this.arrowsUpdate();
    clearTimeout(  this.arrowClickTimeOut );
    this.arrowClickTimeOut = setTimeout(()=> {
      video.bindEvents();
      this.autoPlayVideo( jModal );
      this.updateModalHeight();
    }, 100);
  };
  
  pauseAllVideos = ( ) => {
    const jVideos = $("video.pepoVideo");
    for(let cnt = 0 ;  cnt < jVideos.length ; cnt++){
      jVideos[cnt].pause();
    }
  };
  
  
  getModalMarkup = () => {
    let videoId = deepGet(this.getCurrentIndexResult(), 'video_id');
    const modal = ejs.compile(videoModalDetail, {client: true});
    return $(modal({
      videoId,
      DataGetters,
      innerContainerHeight: this.innerContainerHeight
    }));
  };
  
  updateModalUI = ( jModal ) => {
    this.jModalWrapper.empty();
    this.jModalWrapper.html(jModal);
  };
  

  autoPlayVideo = (jModal) =>{
    const jVideos =  jModal.find(".video-container-wrapper");
    for(let cnt = 0 ;  cnt < jVideos.length ; cnt++){
      if(jVideos.eq(cnt).visible()){
        video.playVideo( jVideos.eq(cnt) );
        return;
      }
    }
  };
  
  updateModalHeight = () => {
    this.innerContainerHeight = $('.videoContainer .innerContainer').height();
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
