import $ from 'jquery';
import ejs from 'ejs';
import feedItemList from './feedItemList.html';
import SimpleDataTable from '../utils/simpleDataTable';



class Feed {

  constructor(){
  }

  init = () => {
    this.bindEvents();
    this.fetchFeed();
  };

  bindEvents = () => {

    $('.feedList').on('click', (e) => {
      $('#feedModal').modal('show');
      e.preventDefault();
      e.stopPropagation();
    })

  }


  fetchFeed = ()=>{

    const simpleDataTable = new SimpleDataTable({

  jParent: $("#feedParent"),
  fetchResultsUrl: "/api/web/feeds",
  rowTemplate: ejs.compile(feedItemList, {client: true}),
  // getRowData : function (result) {
  //   return {}
  //   const oThis =  this;
  //   return {
  //     item : {id: 1},
  //     getUserName : function () {
  //      let data = data || oThis.getAssociatedData();
  //      return deepGet( data , `user_details[`${this.item.id}`]["user_name"]`);
  //     }
  //   }
  // }

});

  }
}

export default new Feed();
