import {apiHost} from '../../../config';
import {AppActionType} from '../../types';
import { trackPromise } from 'react-promise-tracker';

const httpUtil = require('../../../utils/HttpUtils');
const httpHeaders = require('../../../utils/HttpHeaders');
const localUtil = require('../../../utils/LocalUtils');
const commonUtil = require('../../../utils/CommonUtil');
const sysConst = require('../../../utils/SysConst');
const sysAlert = require('../../../utils/SysAlert');

export const getCurrentAdmin = () => async (dispatch) => {
    try {
        // admin用户 检索 URL
        const url = apiHost + '/admin/sysUser';
        const token = localUtil.getSessionItem(sysConst.AUTH_TOKEN);
        if(token ==null || token ===""){
            window.location.href = '/login';
        }
        httpHeaders.set(sysConst.AUTH_TOKEN,token)
        // 发送 get 请求
        //console.log(url)
        const res = await trackPromise(httpUtil.httpGet(url));
        if (res.success) {
            if (res.data) {
                dispatch({type: AppActionType.setCurrentUser, payload: res.data.adminInfo})
                dispatch({type: AppActionType.setCurrentUserMenu, payload: commonUtil.objToMap(res.data.adminType[0].menuList)});
            } else {
                window.location.href = '/login';
            }
        } else if (!res.success) {
            sysAlert.WarningAlert('获取权限失败');
            window.location.href = '/login';
        }
    } catch (err) {
        sysAlert.ErrorAlert('获取权限失败');
    }
};

export const updateAdminPassword =(params) => async () => {
    try {
        // admin用户 检索 URL
        const url = apiHost + '/admin/password';
        const res = await httpUtil.httpPut(url,params);
        return res
    } catch (err) {
        sysAlert.ErrorAlert('密码更新失败');
    }
}

export const sendSms = (phone) => async (dispatch) => {
    try {
        // 状态
        let url = apiHost + '/api/phone/' + phone + '/passwordSms';
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpPost(url, {});
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (!res.success) {
            console.log("发送失败", res.msg, "warning");
        }
        return true;
    } catch (err) {
        console.log("操作失败", err.message, "error");
    }
};

export const changePassword = (originPassword, newPassword) => async (dispatch) => {
    try {
        const params = {
            originPassword: originPassword,
            newPassword: newPassword
        };
        // 状态
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/password';
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpPut(url, params);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        return res;
    } catch (err) {
        console.log("操作失败", err.message, "error");
    }
};

export const updatePassword = (data) => async (dispatch) => {
    try {
        const params = {
            code: data.code,
            newPassword: data.password
        };
        // 状态
        let url = apiHost + '/api/phone/' + data.phone + '/password';
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpPut(url, params);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success) {
            console.log("修改成功", "", "success");
        } else if (!res.success) {
            console.log("修改失败", res.msg, "warning");
        }
    } catch (err) {
        console.log("操作失败", err.message, "error");
    }
};

// 退出登录
export const adminLogout = () => async () => {
    localUtil.removeSessionStore(sysConst.LOGIN_ADMIN_ID);
    localUtil.removeSessionStore(sysConst.LOGIN_ADMIN_TYPE);
    localUtil.removeSessionStore(sysConst.AUTH_TOKEN);
    window.location.href = '/login';
};

export const toggleTheme = () => async (dispatch,getState) => {
    const darkMode = getState().AppReducer.darkMode;
    if(darkMode==='dark'){
        dispatch({type: AppActionType.setToggleDarkMode, payload: 'light'});
    }else{
        dispatch({type: AppActionType.setToggleDarkMode, payload: 'dark'});
    }
}

export const getCaptcha = () => async (dispatch,getState) => {    
    try {
        const res = await httpUtil.httpGet(apiHost + '/public/captcha', {});
        console.log(res)
        if (res.success === true) {
            console.log(res.data)
            dispatch({type: AppActionType.setCaptchaId, payload: res.data.captchaId});
            dispatch({type: AppActionType.setCaptchaImage, payload: res.data.img});
        }else if (res.success === false) {
            sysAlert.WarningAlert(res.msg)
        }
    } catch(err){
        console.log(err)
        sysAlert.ErrorAlert(err.message)
    }
}