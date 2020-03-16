import  ns from "../src/libs/namespace";
import BaseView from "../src/common/BaseView";
import home from './home/index';

class Home extends BaseView {

    constructor( config ){
        super(config);
        home.init( config );
    }

}

const pepo = ns("pepo");
pepo.home = Home;

export default Home ;


