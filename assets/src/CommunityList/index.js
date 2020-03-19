import Search from '../common/Search';
import SimpleDataTable from '../utils/simpleDataTable';
import ejs from "ejs";
import communityListItem from "./communityListItem.html";
import DataGetters from "../model/DataGetters";
import deepGet from 'lodash/get';

class CommunityList{

  constructor(props) {
    this.searchTerm = '';
  }


  init = () => {
    console.log('init==');
    let searchComponent = new Search({searchSelector: '#community-search', onSearchHandler: this.onSearchHandler });
    this.initSimpleDataTable();
  };


  getFetchUrl = () => {
    // for time being, IT will change when backend will ready.
    return "/api/web/feeds";
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
    let simpleDataTable = new SimpleDataTable({
      jParent: $("#communityListParent"),
      fetchResultsUrl: this.getFetchUrl(),
      rowTemplate: ejs.compile(communityListItem, {client: true}),
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

export default new CommunityList();
