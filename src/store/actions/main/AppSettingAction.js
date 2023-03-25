import { trackPromise } from 'react-promise-tracker';

import {apiHost} from '../../../config';
import {AppActionType, AppSettingActionType} from '../../types';

const httpUtil = require('../../../utils/HttpUtils');
const localUtil = require('../../../utils/LocalUtils');
const sysConst = require('../../../utils/SysConst');
const sysAlert = require('../../../utils/SysAlert');
export const getAppList = (params) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        params.pageNumber = params.pageNumber ||1 ;
        // 检索条件：每页数量
        params.pageSize = getState().AppSettingReducer.appData.pageSize;

        // 基本检索URL
        let url = apiHost + '/public/app?'
            
        let conditions = httpUtil.objToUrl(params);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;

        const res = await httpUtil.httpGet(url);
        let appData = getState().AppSettingReducer.appData;
        if (res.success) {
            appData.pageNumber = params.pageNumber;
            appData.total = res.data.total;
            appData.list = res.data.list;
            dispatch({type: AppSettingActionType.setAppData, payload: appData});
        } else if (!res.success) {
            sysAlert.WarningAlert("获取App系统列表信息失败")
            
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};

export const changeStatus = (id, status, condition) => async (dispatch, getState) => {
    try {
        // 状态
        let newStatus;
        if (status === 0) {
            newStatus = 1
        } else {
            newStatus = 0
        }

        // 状态
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/app/' + id + '/status?status=' + newStatus;
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpPut(url, {});
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success) {
            console.log("修改成功", "", "success");
            // 刷新列表
            dispatch(getAppList({...condition,
                dataStart: getState().AppSettingReducer.appData.start
            }));
        } else if (!res.success) {
            console.log("修改失败", res.msg, "warning");
        }
    } catch (err) {
        console.log("操作失败", err.message, "error");
    }
};

export const deleteAppSetting = (id) => async (dispatch) => {
    try {
        const url = apiHost + '/admin/app/' + id;
        const res = await trackPromise(httpUtil.httpDelete(url, {}));
        if (res.success) {
            sysAlert.SuccessAlert("删除成功")
            dispatch(getAppList({}));
        } else if (!res.success) {
            sysAlert.WarningAlert("删除失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};

export const createAppSetting = (appObj) => async(dispatch) => {
    try {
        let url = apiHost + '/admin/app';
        let res = await trackPromise(httpUtil.httpPost(url, appObj));
        if (res.success) {
            sysAlert.SuccessAlert("创建成功")
            dispatch(getAppList({}));
        }else{
            sysAlert.WarningAlert("创建失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
    
        
}

export const updateAppSetting = (appObj) => async(dispatch) => {
    try {
        let url = apiHost + '/admin/app/'+appObj.id;
        let res = await trackPromise(httpUtil.httpPut(url, appObj));
        if (res.success) {
            sysAlert.SuccessAlert("保存成功")
            dispatch(getAppList({}));
        }else{
            sysAlert.WarningAlert("保存失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
}
