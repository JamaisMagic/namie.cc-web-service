/**
 * Created by Jamais on 2017/3/22.
 */

import {default as mSimpleUi} from 'com.cmcm.cloud/src/ui/simpleUi.js';

export function handleCatchError(error) {
    if (error && error.response) {
        mSimpleUi.toast('Network error, please try again:' + error.response.status);
    } else {
        mSimpleUi.toast('Unknown error:' + error.message);
    }
}

export function handleServerError(errorCode) {
    mSimpleUi.toast('Server error, please try again:' + errorCode);
}

const gameCenterHelper = {
    handleCatchError,
    handleServerError
};

export default gameCenterHelper
