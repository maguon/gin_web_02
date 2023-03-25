import React ,{useState,useEffect}from 'react';
import { connect } from 'react-redux';
import screenfull from "screenfull";
import { useConfirm } from "material-ui-confirm";
import {AppBar,Badge,Box,Divider,IconButton,ListItemIcon,ListItemText,Menu,MenuItem,Toolbar,Typography} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import { toggleTheme,adminLogout, getCurrentAdmin } from '../../store/actions/layout/AppAction'
import UpdatePasswordModal from './UpdatePasswordModal';


const Header = (props) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [accountModalOpenFlag, setAccountModalOpenFlag] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const { appReducer, toggleTheme,adminLogout ,getCurrentAdmin } = props;
    const confirm = useConfirm();
    const toggleFullScreen = () => {
        screenfull.toggle();
        setIsFullscreen(!isFullscreen);
        
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const openAccountModal = (event) => {
        handleMenuClose();
        setAccountModalOpenFlag(true);
    };
    const closeAccountModal = (event) => {
        setAccountModalOpenFlag(false);
    };

    const logout =()=>{
        handleMenuClose();        
        confirm({ title:"退出登录",description: "确定要退出系统?",confirmationText:"确定",cancellationText:"取消"})
        .then(() =>{
            adminLogout();
        }).catch(() => {
            console.log("取消推出!");
        });
    }
    useEffect(()=>{
        console.log("get current admin")
        getCurrentAdmin();
    },[])
    const renderMenu = (
        <Menu
        sx={{ mt: '32px' }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={openAccountModal}>
            <ListItemIcon>
                <LockIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>修改密码</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout}>
          <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>退出登录</ListItemText>
          </MenuItem>
        </Menu>
      );
    const handleAccountMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    return (
        <Box>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="dense">
            <svg  width="30" height="32" viewBox="0 0 36 32" fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z" fill="#FFFFFF"></path></svg>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' },ml:1 }}
            >
                Gin Admin
            </Typography>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ ml: 2 }}
            >
                <MenuIcon />
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <IconButton  color="inherit" onClick={() => { toggleTheme() }}>
                    {appReducer.darkMode=='light'?<DarkModeIcon  />:<LightModeIcon/>}
                </IconButton>
                <IconButton  color="inherit" onClick={()=>{toggleFullScreen()}}>
                    {isFullscreen?<FullscreenExitIcon />:<FullscreenIcon/>}
                </IconButton>
                <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                onClick={handleAccountMenuOpen}
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
            </Box>
            </Toolbar>
        </AppBar>
        {renderMenu}
        <UpdatePasswordModal openFlag={accountModalOpenFlag} closeAccountModal={closeAccountModal}/>
        </Box>
    );
};
const mapStateToProps = (state) => {
    return {
        appReducer: state.AppReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    toggleTheme: () => { dispatch(toggleTheme()) },
    adminLogout:()=>{dispatch(adminLogout())},
    getCurrentAdmin:()=>{dispatch(getCurrentAdmin())},
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);