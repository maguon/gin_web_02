import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';
import AppReducer from './layout/AppReducer';
import CommonReducer from './layout/CommonReducer';
import LoginReducer from './login/LoginReducer';
import MainPanelReducer from './main/MainPanelReducer';
import SysAuthReducer from './main/SysAuthReducer';
import SysInfoReducer from './main/SysInfoReducer';
import SysUserReducer from "./main/SysUserReducer";
import AppSettingReducer from "./main/AppSettingReducer";
export default combineReducers({
    form: reduxFormReducer,
    AppReducer,
    CommonReducer,
    LoginReducer,
    MainPanelReducer,
    SysAuthReducer,
    SysInfoReducer,
    SysUserReducer,
    AppSettingReducer,
});
