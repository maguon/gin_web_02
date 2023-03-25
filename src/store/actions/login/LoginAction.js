import {apiHost} from '../../../config';
import {getCaptcha} from '../layout/AppAction'

const httpUtil = require('../../../utils/HttpUtils');
const localUtil = require('../../../utils/LocalUtils');
const sysConst = require('../../../utils/SysConst');
const sysAlert = require('../../../utils/SysAlert');
const httpHeaders = require('../../../utils/HttpHeaders');

export const adminLogin = (params) => async (dispatch) => {
    
    try {
        const res = await httpUtil.httpPost(apiHost + '/public/adminLogin', params);
        if (res.success === true) {
            localUtil.setSessionItem(sysConst.LOGIN_ADMIN_ID, res.data.admin.id);
            localUtil.setSessionItem(sysConst.LOGIN_ADMIN_TYPE, res.data.admin.type);
            localUtil.setSessionItem(sysConst.AUTH_TOKEN, res.data.token);
            httpHeaders.set(sysConst.AUTH_TOKEN,res.data.token)
            
            window.location.pathname = '/';
        } else if (res.success === false) {
            sysAlert.WarningAlert(res.msg)
            dispatch(getCaptcha())
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};