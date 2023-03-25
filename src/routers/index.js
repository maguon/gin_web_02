import {Frame,Home,Login,NotFound,Setting,AppSetting,Dashboard,
    SysAuth,SysInfo,SysUser,Upload,UserDetail,UserList,UserStat} from '../pages'

export const routes = [
    // 登录画面
    {
        path: "/",
        key: "index",
        component: <Frame/>,
        children: [
            {
                path: "/", key: "home", component: <Home />
            },
            {
                path: "/setting", key: "setting", component: <Setting />
            },
            {
                path: "/dashboard", key: "dashboard", component: <Dashboard />
            },
            {
                path: "/app_setting", key: "app_setting", component: <AppSetting />
            },
            {
                path: "/sys_auth", key: "sys_auth", component: <SysAuth />
            },
            {
                path: "/sys_info", key: "sys_info", component: <SysInfo />
            },
            {
                path: "/sys_user", key: "sys_user", component: <SysUser />
            },
            {
                path: "/upload", key: "upload", component: <Upload />
            },
            {
                path: "/user_list", key: "user_list", component: <UserList />
            },
            {
                path: "/user_list/:userId", key: "user_detail", component: <UserDetail />
            },
            {
                path: "/user_stat", key: "user_stat", component: <UserStat />
            },
            
        ]
    },
    {path: "/login",key:"login", component: <Login/>},
    {path: "/*",key:"404", component: <NotFound/>}
]
