import Search from '../common/Search';
import SimpleDataTable from '../utils/simpleDataTable';
import ejs from "ejs";
import communityListItem from "./communityListItem.html";
import DataGetters from "../model/DataGetters";
import deepGet from 'lodash/get';

class CommunityList{

  constructor() {}


  init = () => {
    console.log('init==');
    this.searchTerm = '';
    this.simpleDataTable = null;
    let searchComponent = new Search({searchSelector: '#community-search', onSearchHandler: this.onSearchHandler });
    this.initSimpleDataTable();
  };


  getFetchUrl = () => {
    // for time being, IT will change when backend will ready.
    return `api/web/search/channels?q=${this.searchTerm}`;
  };

  onSearchHandler = ( searchTerm ) => {
    console.log("search term =====", searchTerm);
    if ( searchTerm === this.searchTerm ){
      return;
    }
    this.searchTerm = searchTerm;
    this.initSimpleDataTable();
  };

  initSimpleDataTable = () => {
    const oThis = this;
    if(this.simpleDataTable && this.simpleDataTable.isLoadingData){
      return;
    }
    this.simpleDataTable = new SimpleDataTable({
      jParent: $("#communityListParent"),
      fetchResultsUrl: this.getFetchUrl(),
      rowTemplate: ejs.compile(communityListItem, {client: true}),
      getRowData : function (result) {
        console.log('result',result);
        return {
          channelId: deepGet(result, 'id'),
          DataGetters
        };
      }
    });
  }

}

export default new CommunityList();
