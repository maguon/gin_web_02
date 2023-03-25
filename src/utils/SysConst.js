export const LOGIN_USER_ID ='user-id';
export const LOGIN_USER_TYPE ='user-type';
export const LOGIN_USER_STATUS='user-status';
export const LOGIN_ADMIN_ID ='admin-id';
export const LOGIN_ADMIN_TYPE ='admin-type';
export const LOGIN_ADMIN_STATUS='admin-status';
export const AUTH_TOKEN ='auth-token';

/**
 * 日期控件 国际化用
 */
export const DATE_PICKER_OPTION = {
    autoClose: true,
    // showClearBtn: true,
    format: 'yyyy-mm-dd',
    i18n: {
        cancel: '取消',
        clear: '清除',
        done: '确认',
        previousMonth: '‹',
        nextMonth: '›',
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
};

/**
 * 单选下拉菜单样式
 */
export const REACT_SELECT_SEARCH_STYLE = {
    // 整体容器
    // container: styles => ({ ...styles,  border:'1px solid #ff0000'}),
    // 控制器
    control: (styles, {isFocused}) => ({
        ...styles,
        height: 'calc(40px)',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#ffffff',
        margin: "0 0 20px 0",
        borderColor: isFocused ? '#3C3CC4' : '#ACACAC',
        ':hover': {
            borderColor: "#3C3CC4"
        }
    }),
    // 下拉菜单和输入框距离
    menu: styles => ({ ...styles, marginTop:'1px',zIndex: 10}),
    // 指示器（删除/下拉）分隔符(竖线)
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    // 检索输入框
    input: styles => ({...styles, margin: '0', paddingTop: '0',paddingBottom: '0',height: 'calc(3rem)'}),
    // 选中内容显示区域
    valueContainer: styles => ({
        ...styles,
        paddingLeft: '0',
        height: 'calc(3rem + 1px)'
    })
};
// 系统类型(1-安卓 2-苹果)
export const APP_TYPE = [
    {value: 1, label: "管理端"},
    {value: 2, label: "用户端"}
];

// 系统类型(1-安卓 2-苹果)
export const DEVICE_TYPE = [
    {value: 1, label: "安卓"},
    {value: 2, label: "苹果"}
];

// 强制更新(0-非强制更新 1-强制更新)
export const FORCE_UPDATE = [
    {value: 1, label: "否"},
    {value: 2, label: "是"}
];

export const GENDER = [
    {value: 2, label: "女"},
    {value: 1, label: "男"}
];

export const STATUS = [
    {value: -1, label: "禁用"},
    {value: 1, label: "可用"}
];
// 用于权限设定（包含所有机能设定）
export const ALL_PAGE_LIST = [
    {
        "link": "/",
        "label": "主控面板",
        "icon": "mdiMonitorDashboard",
        "children": [],
        "usable": false
    }, 
    {
        "link": "/user_list",
        "label": "考生信息",
        "icon": "mdiFolderSearch",
        "children": [],
        "usable": false
    },
    {
        "link": "/upload",
        "label": "数据导入",
        "icon": "mdiDatabaseImport",
        "children": [],
        "usable": false
    }, 
    {
        "label": "统计",
        "icon": "mdiChartAreaspline",
        "children": [
            {
                "link": "/user_stat",
                "name": "用户统计",
                "icon": "mdiChartPie",
                "usable": false
            },
            {
                "link": "/user_stat",
                "name": "API统计",
                "icon": "mdiChartLineStacked",
                "usable": false
            }

        ]
    },
    {
        "link": "/sys_info",
        "label": "系统状态",
        "icon": "mdiHarddisk",
        "children": [],
        "usable": false
    }, 
    {
        "label": "系统设置",
        "icon": "mdiCog",
        "children": [
            {
                "link": "/sys_user",
                "name": "用户管理",
                "icon": "mdiAccountCog",
                "usable": false
            },
            {
                "link": "/app_setting",
                "name": "App系统",
                "icon": "mdiTabletCellphone",
                "usable": false
            },
            {
                "link": "/sys_auth",
                "name": "权限设置",
                "icon": "mdiFamilyTree",
                "usable": false
            },

        ]
    }
];

// 全部权限（包含所有机能设定）
export const ALL_PAGE_JSON = {
    "/": {
        "usable": true
    },
    "/home": {
        "usable": true
    },
    "/dashboard": {
        "usable": true
    },
    "/user_list": {
        "usable": true
    },
    "/user_stat": {
        "usable": true
    },
    "/sys_info": {
        "usable": true
    },
     "/sys_user": {
        "usable": true
    },
    "/app_setting": {
        "usable": true
    },
    "/sys_auth": {
        "usable": true
    },
    "/upload": {
        "usable": true
    },
};