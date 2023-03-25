/* eslint-disable eqeqeq */
import { trackPromise } from 'react-promise-tracker';
import {apiHost} from '../../../config';
import { SysInfoActionType} from '../../types';
const httpUtil = require('../../../utils/HttpUtils');
const sysAlert = require('../../../utils/SysAlert');

// 系统设置 -> 权限设置 取得用户群组列表
export const getSysServerInfo = () => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/admin/serverInfo';
        const res = await trackPromise(httpUtil.httpGet(url));
        if (res.success) {
            dispatch({type: SysInfoActionType.getServerInfo, payload: res.data.server});
        } else if (!res.success) {
            sysAlert.WarningAlert("保存失败")
        }
    } catch (err) {
        sysAlert.ErrorAlert(err.message)
    }
};