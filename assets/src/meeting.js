import  ns from "../js/libs/namespace";
import BaseView from "../src/common/BaseView";

class Meeting extends BaseView {

    constructor(config){
        super(config);
    }

}

const pepo = ns("pepo");
pepo.meeting = Meeting;
