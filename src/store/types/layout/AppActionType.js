import {createAction} from 'redux-actions';

export const showLoadProgress = createAction('SHOW_LOAD_PROGRESS');
export const setCaptchaId = createAction('SET_CAPTCHA_ID')
export const setCaptchaImage = createAction('SET_CAPTCHA_IMAGE')
export const setCurrentUser = createAction('SET_CURRENT_USER');
export const setCurrentUserMenu = createAction('SET_CURRENT_USER_MENU');
export const setAllPath = createAction('SET_SYSTEM_ALL_PATH');
export const setToggleDarkMode = createAction('SET_TOGGLE_DARK_MODE')