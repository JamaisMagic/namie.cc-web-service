/**
 * Created by jamais on 2017/6/20.
 */

class Util {
    constructor() {

    }

    isTest() {
        return /(test\.namie\.cc|test\.jamais\.namie\.cc|localhost)/.test(window.location.hostname);
    }

    getNamieApi(path='/') {
        return (this.isTest() ? 'http://test.namie.cc' : 'https://namie.cc') + path;
    }
}

export default new Util();
