/**
 * Created by jamais on 2017/6/20.
 */

class Util {
    constructor() {

    }

    isTest() {
        return !(window.location.hostname === 'jamais.namie.cc');
    }

    getNamieApi(path='/') {
        return (this.isTest() ? 'http://test.namie.cc' : 'https://namie.cc') + path;
    }
}

export default new Util();
