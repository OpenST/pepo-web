class DescriptionBox {

  constructor(params) {
    this.minLengthForShowMore = params.minLengthForShowMore;
    this.jSelector = $(params.selectorClass);
    this.jSelectorInitialText = this.jSelector.html();
    this.handleShowMoreLess();
  }

  handleShowMoreLess = () => {
    if (this.shouldUseShowMore()){
      this.showShowMore();
    }
  };

  showShowMore = () => {
    let htmlToShow = this.jSelectorInitialText

  };

  shouldUseShowMore = () => {
    return this.jSelector.html().length > this.minLengthForShowMore;
  };


}

export default DescriptionBox;
