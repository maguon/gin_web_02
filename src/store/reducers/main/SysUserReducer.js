import {handleActions} from 'redux-actions';
import {SysUserActionType} from '../../types';
const initialState = {
    //查询条件
    queryObj:{
        realName:'',
        status:'',
        phone :'',
        type :'',
        gender :'',
        pageNumber :1
    },
    // 每页数量
    sysUserData : {
        pageSize: 10,
        pageNumber: 1,
        total:0,
        list: []
    },
    typeArray:[]
};
export default handleActions({
    [SysUserActionType.setQueryObj]: (state, action) => {
        return {
            ...state,
            queryObj: action.payload
        }
    },
    [SysUserActionType.getSysUserList]: (state, action) => {
        return {
            ...state,
            sysUserData: action.payload
        }
    },
    [SysUserActionType.setUserListDataSize]: (state, action) => {
        return {
            ...state,
            total: action.payload
        }
    },
    [SysUserActionType.setTypeArray]: (state, action) => {
        return {
            ...state,
            typeArray: action.payload
        }
    },

}, initialState)