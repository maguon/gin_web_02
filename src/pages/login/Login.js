import React, {useState,useEffect,useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink} from "react-router-dom";
import {Box, Button, Container, FormControl,FormHelperText,Grid,IconButton, InputAdornment,InputLabel,Link,OutlinedInput,Paper, TextField,Typography} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CachedIcon from '@mui/icons-material/Cached';
import {webName} from '../../config'

import { SuccessAlert,ErrorAlert } from '../../utils/SysAlert';
import {getCaptcha} from '../../store/actions/layout/AppAction'
import {adminLogin} from '../../store/actions/login/LoginAction'
import AppReducer from '../../store/reducers/layout/AppReducer';
const Login = (props) => {
    const {loginReducer,appReducer,getCaptcha,adminLogin} = props;
    const [userName, setUserName] = useState(loginReducer.userName);
    const [password, setPassword] = useState(loginReducer.password);
    const [captcha, setCaptcha] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    const [validation,setValidation] = useState({});
    
    const validate = ()=>{
        const validateObj = {};
        if(!userName){
            validateObj.userName ='请输入有效的用户名';
        }
        if(!password || password.length <6){
            validateObj.password ='密码格式错误';
        }
        if(!captcha || captcha.length !=6){
            validateObj.captcha ='请输入有效的验证码';
        }
        setValidation(validateObj)
        return Object.keys(validateObj).length
    }

    const login = ()=>{
        const errorCount = validate();
        if(errorCount===0){
            const paramsObj = {
                username:userName,
                password:password,
                captcha:captcha,
                captchaId:appReducer.captchaId
            }
            adminLogin(paramsObj)
        }
    }
    useLayoutEffect(()=> {
        getCaptcha()
    },[getCaptcha]);
    return (
        <Box sx={{
            backgroundColor: 'success.main',
            backgroundImage: "url(" + "/login_bg.jpg" + ")",
            backgroundSize: "cover",
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
            alignItems: "center"
        }}>
            <Grid container spacing={4} style={{width: "96vw",height: "94vh",backgroundColor: "rgba(255,255,255,.8)",
                    display: "flex",alignItems: "center",justifyContent: "space-evenly"}}>
                <Grid item xs={5}>
                    <Paper elevation={6} sx={{ml:8,mr:8,pl:4,pr:4}} >
                    <Typography color="textPrimary" variant="h2" align="center"><img style={{paddingTop: 6}} src="/logo192.png" alt=""/></Typography>
                    <Typography color="textPrimary" variant="h2" align="center">{webName}</Typography>
                    <FormControl fullWidth variant="outlined" sx={{mt:4}}>
                        <InputLabel htmlFor="login-username">用户名</InputLabel>
                        <OutlinedInput
                            id="login-username"
                            type={'text'}
                            value={userName}
                            fullWidth
                            onChange={(e)=>setUserName(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                edge="end"
                                >
                                    <AccountCircle/>
                                </IconButton>
                            </InputAdornment>
                            }
                            label="用户名"
                        />
                        <FormHelperText id="component-helper-text" error={validation.userName&&validation.userName != ''}>
                            {validation.userName}
                        </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" sx={{mt:4}}>
                        <InputLabel htmlFor="login-password">密码</InputLabel>
                        <OutlinedInput
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            fullWidth
                            onChange={(e)=>setPassword(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={()=>{setShowPassword(!showPassword)}}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="密码"
                        />
                        <FormHelperText id="component-helper-text" error={validation.password&&validation.password!=''}>
                            {validation.password}
                        </FormHelperText>
                    </FormControl>
                    <FormControl size='medium' variant="outlined" sx={{mt:4,width:400}}>
                        <InputLabel htmlFor="login-captcha">验证码</InputLabel>
                        <OutlinedInput
                            id="login-captcha"
                            type={'text' }
                            value={captcha}
                            fullWidth
                            onChange={(e)=>setCaptcha(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={getCaptcha}><CachedIcon/></IconButton>
                            </InputAdornment>
                            }
                            label="验证码"
                        />
                        <FormHelperText id="component-helper-text" error={validation.captcha&&validation.captcha!=''}>
                            {validation.captcha}
                        </FormHelperText>
                    </FormControl>
                    <Box sx={{float:"right",mt:4}}>
                        <img style={{height:54,backgroundColor:"#ccc"}} src={appReducer.captchaImage} alt="请输入验证码" />
                    </Box>                    
                    <Box sx={{py: 2}}>
                        <Button color="primary" fullWidth size="large" type="submit" onClick={login}
                                variant="contained" endIcon={<i className="mdi mdi-login"/>}>
                            登陆
                        </Button>
                    </Box>


                    <Grid container spacing={3} sx={{pb:2}}>
                        <Grid item xs={6}>
                            
                        </Grid>
                        <Grid container item xs={6} direction="row" sx={{justifyContent:"flex-end"}}>
                            <Typography color="textSecondary" variant="body1">
                                <Link component={RouterLink} style={{textDecoration: 'none',color:"inherit"}} to="/reset" variant="h6">忘记密码</Link>
                            </Typography>
                        </Grid>
                    </Grid>

                    </Paper>
                </Grid>
                <Grid item xs={6} style={{
                    backgroundImage: "url(" + "/login_left.svg" + ")",
                    backgroundSize: "cover",
                    height: "60%",
                    float: "right"
                }}>

                </Grid>
            </Grid>
            <Container maxWidth="md" >
                
                
            </Container>
        </Box>
    )
}

const mapStateToProps = (state) => {
    return {
        loginReducer :state.LoginReducer,
        appReducer : state.AppReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCaptcha: ()=> {
        dispatch(getCaptcha())
    },
    adminLogin:(params) => {
        dispatch(adminLogin(params))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);