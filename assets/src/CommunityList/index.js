import Search from '../common/Search';
import SimpleDataTable from '../utils/simpleDataTable';
import ejs from "ejs";
import communityListItem from "./communityListItem.html";
import DataGetters from "../model/DataGetters";
import deepGet from 'lodash/get';

class CommunityList{

  constructor() {}


  init = () => {
    this.searchTerm = '';
    this.queryDataTable = null;
    this.searchedResults = [];
    let searchComponent = new Search({searchSelector: '#community-search', onSearchHandler: this.onSearchHandler });
    this.initDefaultDataTable();
  };

  onSearchHandler = ( searchTerm ) => {
    if ( searchTerm === this.searchTerm ){
      return;
    }
    this.searchTerm = searchTerm;
    this.updateUIOnSearch(searchTerm);
    if(this.searchTerm){
      this.hideNoResults();
      this.fetchQueryDataTable();
    }
  };

  initDefaultDataTable = () => {
    let params = {
      jParent: $("#default-community-list-parent"),
      fetchResultsUrl: 'api/web/search/channels',
      rowTemplate: ejs.compile(communityListItem, {client: true}),
      getRowData : function (result) {
        console.log('result',result);
        return {
          channelId: deepGet(result, 'id'),
          DataGetters
        };
      }
    };
    let defaultDataTable = new SimpleDataTable(params);
  };

  fetchQueryDataTable = () => {
    if(this.queryDataTable){
      this.queryDataTable.updateFetchUrlAndLoad(this.getFetchUrl());
      return;
    }
    let params = {
      jParent: $("#searched-community-list-parent"),
      fetchResultsUrl: this.getFetchUrl(),
      rowTemplate: ejs.compile(communityListItem, {client: true}),
      getRowData : function (result) {
        console.log('result',result);
        return {
          channelId: deepGet(result, 'id'),
          DataGetters
        };
      },
      resultFetcherCallback:  (results) => {
        this.searchedResults = results;
        this.updateUIOnResults();
      }
    };
    this.queryDataTable = new SimpleDataTable(params);
  };

  getFetchUrl = () => {
    return `api/web/search/channels?q=${this.searchTerm}`;
  };

  updateUIOnResults = () => {
    this.updateUIOnSearch();
    if(!this.searchTerm){
      return;
    }
    if(this.searchedResults.length > 0){
      this.hideNoResults();
      this.hideDefaultSearchDiv();
    } else {
      this.showNoResults();
      this.showExploreCategories();
      this.showDefaultSearchDiv();
    }
  };

  updateUIOnSearch = () => {
    if(this.searchTerm){
      this.showSearchedDiv();
      this.hideDefaultSearchDiv();
    } else {
      this.hideSearchedDiv();
      this.showDefaultSearchDiv();
      this.showMeetPeeps();
    }
  };

  showSearchedDiv = () => {
    $(".searched-community-wrapper").show();
  };

  hideSearchedDiv = () => {
    $(".searched-community-wrapper").hide();
  };

  showDefaultSearchDiv = () => {
    $(".default-community-wrapper").show();
  };

  hideDefaultSearchDiv = () => {
    $(".default-community-wrapper").hide();
  };

  showNoResults = () => {
    $(".no-result-found").show();
  };

  hideNoResults = () => {
    $(".no-result-found").hide();
  };

  showMeetPeeps = () => {
    $(".explore-categories").hide();
    $(".meet-your-peeps").show();
  };

  showExploreCategories = () => {
    $(".explore-categories").show();
    $(".meet-your-peeps").hide();
  };


}

export default new CommunityList();
