import $ from 'jquery';
import ejs from 'ejs';
import feedItemList from './feedItemList.html';
import SimpleDataTable from '../utils/simpleDataTable';
import FeedItemData from '../utils/FeedItemData/base';




class Feed {

  constructor(){
  }

  init = () => {
    this.bindEvents();
    this.fetchFeed();
  };

  bindEvents = () => {

    $('#feedParent').on('click', '.feedList', (e) => {
      $('#feedModal').modal('show');
      e.preventDefault();
      e.stopPropagation();
    })

  }


  fetchFeed = ()=>{
    const oThis =  this;
    const simpleDataTable = new SimpleDataTable({

  jParent: $("#feedParent"),
  fetchResultsUrl: "/api/web/feeds",
  rowTemplate: ejs.compile(feedItemList, {client: true}),
  getRowData : function (result) {
    console.log("getRowData:sent", result);
    let feedItemData = new FeedItemData(result, this.getAssociatedData());
    return feedItemData.perform();
  }
  });
  }
}

export default new Feed();
