
import {MainPanelActionType} from '../../types';


export const getTodayUserCount = () => async (dispatch) => {
    dispatch({type: MainPanelActionType.setTodayUserCount, payload: {}});
};