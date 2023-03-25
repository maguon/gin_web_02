import {handleActions} from 'redux-actions';
import {SysInfoActionType} from '../../types';

const initialState = {
    // 当前用户群组列表
    serverInfo: {
        disk:{},
        os:{},
        cpu:{},
        ram:{},
    }
};

export default handleActions({
    [SysInfoActionType.getServerInfo]: (state, action) => {
        return {
            ...state,
            serverInfo: action.payload
        }
    }
}, initialState)
