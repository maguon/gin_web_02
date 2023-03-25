import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { createBrowserHistory } from "history";
import { useConfirm } from "material-ui-confirm";
import {Box, Button, Container, Divider,Fab,FormControl,FormHelperText,Grid,IconButton,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Select,MenuItem,
    InputAdornment,InputLabel,Link,OutlinedInput,Pagination,Paper, TextField,Typography} from '@mui/material';
import Icon from '@mdi/react'
import * as md from '@mdi/js'
import {getAppList,createAppSetting,updateAppSetting,deleteAppSetting} from '../../store/actions/main/AppSettingAction'
import SimpleModal from '../layout/SimpleModal';
const commonUtil = require('../../utils/CommonUtil')
const sysConst = require('../../utils/SysConst')
const AppSetting = (props) => {
    const {appSettingReducer,getAppList,createAppSetting,updateAppSetting,deleteAppSetting} = props;
    let history = createBrowserHistory();
    const confirm = useConfirm();
    const [appType,setAppType] = useState()
    const [deviceType,setDeviceType] = useState()
    const [forceUpdate,setForceUpdate] = useState()
    const [version,setVersion] = useState()
    const [versionNum,setVersionNum] = useState()
    // 模态属性
    const [modalOpen, setModalOpen] = useState(false);
    const [newModal, setNewModal] = useState(true);
    const [validation,setValidation] = useState({});
    const [appObj,setAppObj] = useState({})
    useEffect(()=>{
        getAppList({}) 
    },[])

    const queryApp = ()=>{
        getAppList({appType,deviceType,forceUpdate,version,versionNum,pageNumber:1})
    }

    const changePage = (pageNumber) =>{
        getAppList({appType,deviceType,forceUpdate,version,versionNum,pageNumber})
    }
    const validate = ()=>{
        const validateObj ={};
        if(newModal){
            if (!appObj.appType) {
                validateObj.appType ='请选择App类型';
            }
            if (!appObj.deviceType) {
                validateObj.deviceType ='请选择系统类型';
            }
            if (!appObj.forceUpdate) {
                validateObj.forceUpdate ='请选择强制更新';
            }
        }
        if (!appObj.version) {
            validateObj.version ='请输入版本号';
        }
        if (!appObj.versionNum) {
            validateObj.versionNum ='请输入版本序号';
        }
        if (!appObj.minVersionNum) {
            validateObj.minVersionNum ='请输入最低版本号';
        }
        if (!appObj.url) {
            validateObj.url ='请输入下载地址';
        }
        setValidation(validateObj);
        return Object.keys(validateObj).length
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const openModal = (data)=>{
        console.log(data)
        setModalOpen(true)
        if(data == null){
            setNewModal(true)
            setAppObj({})
        }else{
            setNewModal(false)
            setAppObj(data)
        }
    }

    const saveApp = ()=>{
        const errorCount = validate();
        if(errorCount===0){
            setModalOpen(false);
            newModal?createAppSetting(appObj):updateAppSetting(appObj)
        }
    }

    const removeApp = (appId)=>{
        confirm({ title:"删除App版本信息",description: "确定删除该版本信息?",confirmationText:"确定",cancellationText:"取消"})
        .then(() =>{
            deleteAppSetting(appId)
        }).catch(() => {
            console.log("取消推出!");
        });
       
    }
    return (
        <div>
            <Typography gutterBottom variant="h6" >App管理</Typography>
            <Divider  style={{borderWidth:2}} />
            <Grid container  spacing={1} style={{paddingTop:10}}>
                <Grid item md={10}>
                    <Grid container  spacing={1}>
                        <Grid item xs>
                            <FormControl variant="outlined" fullWidth margin="dense" size="small">
                                <InputLabel >App</InputLabel>
                                <Select label="App"
                                        value={appType}
                                        onChange={(event, value) => {
                                            setAppType(event.target.value);
                                        }}
                                >
                                    <MenuItem value="">请选择</MenuItem>
                                    {sysConst.APP_TYPE.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined" fullWidth margin="dense" size="small">
                                <InputLabel >设备类型</InputLabel>
                                <Select label="设备类型"
                                        value={deviceType}
                                        onChange={(event, value) => {
                                            setDeviceType(event.target.value);
                                        }}
                                >
                                    <MenuItem value="">请选择</MenuItem>
                                    {sysConst.DEVICE_TYPE.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined" fullWidth margin="dense" size="small">
                                <InputLabel >强制更新</InputLabel>
                                <Select label="强制更新"
                                        value={forceUpdate}
                                        onChange={(event, value) => {
                                            setForceUpdate(event.target.value);
                                        }}
                                >
                                    <MenuItem value="">请选择</MenuItem>
                                    {sysConst.FORCE_UPDATE.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                size='small'
                                variant="outlined"
                                label="版本"
                                value={version}
                                onChange={(e)=>setVersion(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                size='small'
                                variant="outlined"
                                label="版本数"
                                value={versionNum}
                                type="number"
                                onChange={(e)=>setVersionNum(e.target.value)}
                            />
                        </Grid>    
                    </Grid>
                </Grid>
                <Grid item md={2}>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-around" style={{marginTop:1}}>
                        <IconButton color="primary" aria-label="add" onClick={() => {openModal()}} >
                            <Icon path={md["mdiPlusCircle"]} size={1.5}/>
                        </IconButton>
                        <IconButton color="primary" aria-label="query" component="label" onClick={() => {queryApp()}} >
                            <Icon path={md["mdiMagnify"]} size={1.5}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{paddingLeft:15}}>
                <TableContainer component={Paper} style={{marginTop:40}}>
                    <Table  size={'small'} aria-label="a dense table">
                        <TableHead >
                            <TableRow style={{height:50}}>
                                <TableCell  align="center">ID</TableCell>
                                <TableCell  align="center">App</TableCell>
                                <TableCell  align="center">设备类型</TableCell>
                                <TableCell  align="center">强制更新</TableCell>
                                <TableCell  align="center">支持最低版本数</TableCell>
                                <TableCell  align="center">版本</TableCell>
                                <TableCell  align="center">版本数</TableCell>
                                <TableCell  align="center">下载地址</TableCell>
                                <TableCell  align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appSettingReducer.appData.list.length > 0 && appSettingReducer.appData.list.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center" >{row.id}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.APP_TYPE, row.appType)}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.DEVICE_TYPE, row.deviceType)}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.FORCE_UPDATE, row.forceUpdate)}</TableCell>
                                    <TableCell align="center">{row.minVersionNum}</TableCell>
                                    <TableCell align="center">{row.version}</TableCell>
                                    <TableCell align="center">{row.versionNum}</TableCell>
                                    <TableCell align="center">{row.url}</TableCell>
                                    <TableCell align="center">
                                        <IconButton  color="primary" aria-label="edit" component="label" onClick={() => {openModal(row)}} >
                                            <Icon path={md["mdiPlaylistEdit"]} size={1}/>
                                        </IconButton>
                                        <IconButton   aria-label="delete" component="label" onClick={() => {removeApp(row.id)}} >
                                            <Icon path={md["mdiDeleteForever"]} size={1}/>
                                        </IconButton>
                                    </TableCell>                                    
                                </TableRow>))}
                                { appSettingReducer.appData.list.length === 0 &&
                                    <TableRow style={{height:60}}><TableCell align="center" colSpan="10">暂无数据</TableCell></TableRow>
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center" style={{paddingTop:10}}>
                {appSettingReducer.appData.list.length>0 &&<Pagination page={appSettingReducer.appData.pageNumber} onChange={(e,pageNumber)=>{changePage(pageNumber)}} count={Math.ceil(appSettingReducer.appData.total/10)} color="primary" />}
            </Grid>
            <SimpleModal
                maxWidth={'sm'}
                title={ newModal ? '新增App' : '修改App'}
                open={modalOpen}
                onClose={closeModal}
                showFooter={true}
                footer={
                    <>
                        <Button variant="contained" color="primary" onClick={()=>{saveApp()}}>确定</Button>
                        <Button  onClick={closeModal}>关闭</Button>
                    </>
                }
            >
                <Grid container spacing={1}>
                    {!newModal && <Grid item sm={12}><Typography color="primary">ID：{appObj.id}</Typography></Grid>}
                    <Grid item sm={4}>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel>App类型</InputLabel>
                            <Select label="App类型"
                                value={appObj.appType}
                                onChange={(event, value) => {
                                    setAppObj({...appObj,appType:event.target.value});
                                }}
                                error={validation.appType&&validation.appType!=''}
                            >
                                {sysConst.APP_TYPE.map((item, index) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                            {(validation.appType&&validation.appType!='') && <FormHelperText style={{color: 'red'}}>{validation.appType}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel>系统类型</InputLabel>
                            <Select label="系统类型"
                                value={appObj.deviceType}
                                onChange={(event, value) => {
                                    setAppObj({...appObj,deviceType:event.target.value});
                                }}
                                error={validation.deviceType&&validation.deviceType!=''}
                            >
                                {sysConst.DEVICE_TYPE.map((item, index) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                            {(validation.deviceType&&validation.deviceType!='') && <FormHelperText style={{color: 'red'}}>{validation.deviceType}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel>强制更新</InputLabel>
                            <Select label="强制更新"
                                value={appObj.forceUpdate}
                                onChange={(event, value) => {
                                    setAppObj({...appObj,forceUpdate:event.target.value});
                                }}
                                error={validation.forceUpdate&&validation.forceUpdate!=''}
                            >
                                {sysConst.FORCE_UPDATE.map((item, index) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                            {(validation.forceUpdate&&validation.forceUpdate!='') && <FormHelperText style={{color: 'red'}}>{validation.forceUpdate}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField label="版本号" fullWidth margin="dense" variant="outlined" value={appObj.version}
                                   onChange={(e) => {
                                    setAppObj({...appObj,version:e.target.value});
                                   }}
                                   error={validation.version&&validation.version!=''}
                                   helperText={validation.version}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="版本序号" fullWidth margin="dense" variant="outlined" value={appObj.versionNum} type="number"
                                   onChange={(e) => {
                                    setAppObj({...appObj,versionNum:e.target.value});
                                   }}
                                   error={validation.versionNum&&validation.versionNum!=''}
                                   helperText={validation.versionNum}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="最低版本号" fullWidth margin="dense" variant="outlined" value={appObj.minVersionNum} type="number"
                                   onChange={(e) => {
                                    setAppObj({...appObj,minVersionNum:e.target.value});
                                   }}
                                   error={validation.minVersionNum&&validation.minVersionNum!=''}
                                   helperText={validation.minVersionNum}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="下载地址" fullWidth margin="dense" variant="outlined" value={appObj.url}
                                   onChange={(e) => {
                                        setAppObj({...appObj,url:e.target.value});
                                   }}
                                   error={validation.url&&validation.url!=''}
                                   helperText={validation.url}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="备注" fullWidth margin="dense" variant="outlined" multiline rows={4} value={appObj.remark}
                                onChange={(e) => {
                                    setAppObj({...appObj,remark:e.target.value});
                                }}
                        />
                    </Grid>
                </Grid>

            </SimpleModal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        appSettingReducer:state.AppSettingReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAppList : (params)=>{dispatch(getAppList(params))},
    createAppSetting :(params)=>{dispatch(createAppSetting(params))},
    updateAppSetting :(params)=>{dispatch(updateAppSetting(params))},
    deleteAppSetting :(appId)=>{dispatch(deleteAppSetting(appId))}
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSetting);