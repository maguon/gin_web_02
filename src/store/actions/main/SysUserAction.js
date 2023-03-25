/* eslint-disable eqeqeq */
import { trackPromise } from 'react-promise-tracker';
import {apiHost} from '../../../config';
import {SysUserActionType} from '../../types';
const httpUtil = require('../../../utils/HttpUtils');
const sysAlert = require('../../../utils/SysAlert');
// 系统设置 -> 员工管理 取得画面列表
export const getSysUserList = (params) => async (dispatch, getState) => {
    console.log(params)
    try {
        // 基本检索URL
        let url = apiHost + '/admin/sysUserList?';
        params.pageNumber = params.pageNumber ||1 ;
        // 检索条件：每页数量
        params.pageSize = getState().SysUserReducer.sysUserData.pageSize;
        
        let conditions = httpUtil.objToUrl(params);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;

        const res = await trackPromise(httpUtil.httpGet(url));
        let sysUserData = getState().SysUserReducer.sysUserData;
        if (res.success === true) {
            sysUserData.pageNumber = params.pageNumber;
            sysUserData.total = res.data.total;
            sysUserData.list = res.data.list;
            dispatch({type: SysUserActionType.getSysUserList, payload: sysUserData});
        } else if (res.success === false) {
            sysAlert.WarningAlert("获取管理员列表信息失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};

export const exportSysUser = (params) => async (dispatch, getState) => {
    console.log(params)
    try {
        // 基本检索URL
        let url = apiHost + '/admin/sysUser.csv?';
        
        let conditions = httpUtil.objToUrl(params);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        window.open("http://"+url)
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};
//群组查找
export const getSysUserTypeList = () => async (dispatch) => {
    try {
        let url = apiHost + '/admin/type?';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SysUserActionType.setTypeArray, payload: res.data.list});
        } else if (res.success === false) {
            //console.log('群组查询失败', res.msg, 'warning');
            sysAlert.WarningAlert("群组查询失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};

export const createSysUser = (sysUserObj) => async(dispatch) => {
    try {
        let url = apiHost + '/admin/sysUser';
        let res = await trackPromise(httpUtil.httpPost(url, sysUserObj));
        if (res.success) {
            sysAlert.SuccessAlert("创建成功")
            dispatch(getSysUserList({}))
        }else{
            sysAlert.WarningAlert("创建失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
}


export const updateSysUser = (sysUserObj) => async(dispatch) => {
    try {
        let url = apiHost + '/admin/sysUser/'+sysUserObj.id;
        let res = await trackPromise(httpUtil.httpPut(url, sysUserObj));
        if (res.success) {
            sysAlert.SuccessAlert("保存成功")
        }else{
            sysAlert.WarningAlert("保存失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
}

/* export const getUserById = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/user?id='+ id;
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true) {
            if (res.rows.length > 0) {
                dispatch({type: SysUserActionType.setAdminItem, payload: res.rows});
            }
        } else if (res.success === false) {
            console.log('获取员工详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        console.log('操作失败', err.message, 'error');
    }
}; */
