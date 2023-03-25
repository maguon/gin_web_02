/* eslint-disable eqeqeq */
import { trackPromise } from 'react-promise-tracker';
import {apiHost, hiddenUserType} from '../../../config';
import {AppActionType, SysAuthActionType} from '../../types';
import {getSysUserTypeList} from './SysUserAction'
const httpUtil = require('../../../utils/HttpUtils');
const localUtil = require('../../../utils/LocalUtils');
const commonUtil = require('../../../utils/CommonUtil');
const sysConst = require('../../../utils/SysConst');
const sysAlert = require('../../../utils/SysAlert');

// 系统设置 -> 权限设置 取得用户群组列表
export const getUserGroupList = () => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/userTypeList';

        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success) {
            let roles = [];
            let hiddenFlag;
            res.rows.forEach((item) => {
                hiddenFlag = false;
                for (let i = 0; i < hiddenUserType.length; i++) {
                    if (item.id == hiddenUserType[i]) {
                        hiddenFlag = true;
                        break;
                    }
                }
                if (!hiddenFlag) {
                    roles.push(item);
                }
            });

            dispatch({type: SysAuthActionType.setUserGroupList, payload: roles});
        } else if (!res.success) {
            console.log('获取用户群组信息失败', res.msg, 'warning');
        }
    } catch (err) {
        console.log('操作失败', err.message, 'error');
    }
};

// 系统设置 -> 权限设置 取得画面选择群组权限
export const getMenuList = (conditionUserType) => async (dispatch, getState) => {
    try {
        // 检索条件：用户类型
        let type = conditionUserType === null ? '-1' : conditionUserType.value;

        // 基本检索URL
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/type/' + type;
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});

        if (res.success) {
            if (res.rows.length > 0){
                dispatch({type: SysAuthActionType.setCurrentRemark, payload: res.rows[0].remarks});
                dispatch({type: SysAuthActionType.setMenuList, payload: commonUtil.objToMap(res.rows[0].menu_list)});
                // dispatch({type: AuthoritySettingActionType.setMenuList, payload: commonUtil.objToMap(sysConst.ALL_PAGE_JSON)});
            }else {
                dispatch({type: SysAuthActionType.setCurrentRemark, payload: ''});
                dispatch({type: SysAuthActionType.setMenuList, payload: new Map()});
            }
        } else if (!res.success) {
            console.log('获取菜单权限信息失败', res.msg, 'warning');
        }
    } catch (err) {
        console.log('操作失败', err.message, 'error');
    }
};

// 系统设置 -> 权限设置 新增用户群组
export const createAdminType = (params) => async (dispatch, getState) => {
    try {
        // 基本url
        let url = apiHost + '/admin/type' ;
        params.menuList ={};
        let res = await trackPromise(httpUtil.httpPost(url, params));
        if (res.success) {
            sysAlert.SuccessAlert("保存成功")
            dispatch(getSysUserTypeList())
        } else if (!res.success) {
            sysAlert.WarningAlert("保存失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};

// 系统设置 -> 权限设置 修改权限设置
export const changeMenuList = (key, checked) => async (dispatch, getState) => {
    try {
        // 当前权限菜单
        let menuMap = getState().SysAuthReducer.currentMenu;
        if (checked) {
            menuMap.set(key,{"usable": true});
        } else {
            menuMap.delete(key);
        }
        dispatch({type: SysAuthActionType.setMenuList, payload: menuMap});
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};

// 系统设置 -> 权限设置 保存权限
export const updateAdminType = (currentUserType) => async (dispatch, getState) => {
    try {
        
        const currentMenu = getState().SysAuthReducer.currentMenu;

        const params = {
            typeName: currentUserType === null ? '' : currentUserType.type_name,
            menuList: commonUtil.mapToObj(currentMenu),
            remark: currentUserType.remark,
            status: currentUserType.status
        };
        // 基本url
        let url = apiHost + '/admin/type/'+currentUserType.id;
        let res = await trackPromise(httpUtil.httpPut(url, params));

        if (res.success) {
            sysAlert.SuccessAlert("保存成功")
        } else if (!res.success) {
            sysAlert.WarningAlert("保存失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};

export const deleteAdminType = (id) => async (dispatch, getState) => {
    try {
        const url = apiHost + '/admin/type/'  + id;
        const res = await trackPromise(httpUtil.httpDelete(url, {}));
        if (res.success && res.data.total ==0) {
            sysAlert.SuccessAlert("删除成功")
            dispatch(getSysUserTypeList());
            return true;
        } else{
            sysAlert.WarningAlert("删除失败,请确保用户组下没有用户")
            return false;
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};