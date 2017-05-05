/**
 * Created by Jamais on 2016/12/15.
 */

const path = require('path');

const distRoot = path.resolve('..', '..', '..', '..', 'static');

const mExp = {
    dist_root: distRoot,
    project_path: '/m/subject/',
    ASSETS_COMMON_NAME: 'assets_common',
    langs: new Set(['en', 'zh'])
};

module.exports = mExp;
