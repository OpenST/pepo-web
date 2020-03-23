import $ from 'jquery';

export default class Search{

  constructor(params) {
    this.searchTimeout = null;
    this.selector = params.searchSelector;
    this.onSearchHandler = params.onSearchHandler;
    this.minLengthForSearch = params.minLengthForSearch || 1;
    this.jSelector = $(params.searchSelector);
    this.bindEvents();
  }

  bindEvents = () => {
    this.jSelector.on('input', this.handleSearch);
  };

  handleSearch = (e) => {
    let text = $(e.currentTarget).val();
    if (text.length < this.minLengthForSearch && text.length !== 0 ){
      return;
    }
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(()=>{this.onSearchHandler(text)}, 300);
  };
}
