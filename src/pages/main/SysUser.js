import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Autocomplete, Button,  Divider,FormControl,FormHelperText,Grid,IconButton,
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Select,MenuItem,
    InputLabel,Pagination,Paper, TextField,Typography} from '@mui/material';
import Icon from '@mdi/react'
import * as md from '@mdi/js'
import qs from 'querystring';
import { createBrowserHistory } from "history";
import { useLocation } from "react-router-dom";
import {getSysUserList,getSysUserTypeList,createSysUser,updateSysUser,exportSysUser} from '../../store/actions/main/SysUserAction'
import SimpleModal from '../layout/SimpleModal';

const sysConst = require('../../utils/SysConst')
const commonUtil = require('../../utils/CommonUtil')

const SysUser = (props) => {
    const {sysUserReducer,getSysUserList,getSysUserTypeList,createSysUser,updateSysUser,exportSysUser} = props;
    const {search} = useLocation();
    const searchObj = qs.parse(search.slice(1))
    let history = createBrowserHistory();
    const [id,setId] = useState("")
    const [phone,setPhone] = useState("")
    const [userName,setUserName] = useState("")
    const [gender,setGender] = useState("")
    const [type,setType] = useState("")
    const [pageNumber,setPageNumber] =useState(1)

    const [modalOpen, setModalOpen] = useState(false);
    const [newModal, setNewModal] = useState(true);
    const [validation,setValidation] = useState({});
    const [sysUserObj,setSysUserObj] = useState({});
    useEffect(()=>{
        getSysUserTypeList()
        getSysUserList({gender,userName,phone,type,pageNumber});        
    },[])
    
    const exportSysUserCsv = () =>{
        console.log("export sys user")
        exportSysUser({gender,userName,phone,type});
    }
    const querySysUser = ()=>{
        getSysUserList({id,gender,userName,phone,type,pageNumber:1});
    }

    const changePage = (pageNumber) =>{
        getSysUserList({id,gender,userName,phone,type,pageNumber});
    }

    const closeModal = () => {
        setModalOpen(false);
    };
    const openModal = (data)=>{
        console.log(data)
        setModalOpen(true)
        if(data == null){
            setNewModal(true)
            setSysUserObj({})
        }else{
            setNewModal(false)
            setSysUserObj(data)
        }
    }
    const validate = ()=>{
        const validateObj ={};
        if(newModal){
            
            if (!sysUserObj.password) {
                validateObj.password ='请输入用户密码';
            }
        }
        if (!sysUserObj.type) {
            validateObj.type ='请选择用户群组';
        }
        if (!sysUserObj.gender) {
            validateObj.gender ='请选择用户性别';
        }
        if (!sysUserObj.userName) {
            validateObj.userName ='请输入用户姓名';
        }
        if (!sysUserObj.email) {
            validateObj.email ='请输入邮箱';
        }
        if (!sysUserObj.phone) {
            validateObj.phone ='请输入手机号码';
        }
        setValidation(validateObj);
        return Object.keys(validateObj).length
    };
    const addSysUser = () => {
        const errorCount = validate();
        if(errorCount===0){
            setModalOpen(false);
            createSysUser(sysUserObj)
        }
    }
    const saveSysUser = () => {
        const errorCount = validate();
        if(errorCount===0){
            setModalOpen(false);
            updateSysUser(sysUserObj)
        }
    }
    return (
        <div>            
            <Typography gutterBottom variant="h6" >系统用户管理</Typography>
            <Divider  style={{borderWidth:2}} />
            <Grid container  spacing={1} style={{paddingTop:10}}>
                <Grid item md={10}>
                    <Grid container  spacing={1}>
                        <Grid item xs>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                size='small'
                                variant="outlined"
                                label="编号"
                                value={id}
                                onChange={(e)=>setId(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                size='small'
                                variant="outlined"
                                label="手机"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            />
                        </Grid>                        
                        <Grid item xs>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                size='small'
                                variant="outlined"
                                label="用户姓名"
                                value={userName}
                                onChange={(e)=>setUserName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined" fullWidth margin="dense" size="small">
                                <InputLabel >性别</InputLabel>
                                <Select label="性别"
                                        value={gender}
                                        onChange={(event, value) => {
                                            setGender(event.target.value);
                                        }}
                                >
                                    <MenuItem value="">请选择</MenuItem>
                                    {sysConst.GENDER.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs>
                            <FormControl variant="outlined" fullWidth margin="dense" size="small">
                                <InputLabel >群组</InputLabel>
                                <Select label="群组"
                                        value={type}
                                        onChange={(event, value) => {
                                            console.log(value)
                                            setType(event.target.value);
                                        }}
                                >
                                    <MenuItem value="">请选择</MenuItem>
                                    {sysUserReducer.typeArray.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.typeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={2}>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-around"  style={{marginTop:1}}>
                        <IconButton color="primary" aria-label="add" onClick={() => {openModal()}} >
                            <Icon path={md["mdiPlusCircle"]} size={1.5}/>
                        </IconButton>
                        <IconButton color="primary" aria-label="query" component="label" onClick={() => {querySysUser()}}>
                            <Icon path={md["mdiMagnify"]} size={1.5}/>
                        </IconButton>
                        <IconButton  color="primary" aria-label="download" component="label" onClick={() => {exportSysUserCsv()}} >
                            <Icon path={md["mdiArrowDownBoldCircle"]} size={1.5}/>
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
                                <TableCell  align="center">用户名称</TableCell>
                                <TableCell  align="center">用户群组</TableCell>
                                <TableCell  align="center">手机</TableCell>
                                <TableCell  align="center">邮箱</TableCell>
                                <TableCell  align="center">性别</TableCell>
                                <TableCell  align="center">创建时间</TableCell>
                                <TableCell  align="center">状态</TableCell>
                                <TableCell  align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sysUserReducer.sysUserData.list.length > 0 && sysUserReducer.sysUserData.list.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center" >{row.id}</TableCell>
                                    <TableCell align="center">{row.userName}</TableCell>
                                    <TableCell align="center">{row.type_name}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.GENDER, row.gender)}</TableCell>
                                    <TableCell align="center">{commonUtil.getDateTime(row.CreatedAt)}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.STATUS, row.status)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton  color="primary" aria-label="edit" component="label" onClick={() => {openModal(row)}} >
                                            <Icon path={md["mdiPlaylistEdit"]} size={1}/>
                                        </IconButton>
                                    </TableCell>                                    
                                </TableRow>))}
                                { sysUserReducer.sysUserData.list.length === 0 &&
                                    <TableRow style={{height:60}}><TableCell align="center" colSpan="10">暂无数据</TableCell></TableRow>
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid container justifyContent="flex-end" alignItems="center" style={{paddingTop:10}}>
                {sysUserReducer.sysUserData.total>0 &&<Pagination page={sysUserReducer.sysUserData.pageNumber} onChange={(e,pageNumber)=>{changePage(pageNumber)}}  count={Math.ceil(sysUserReducer.sysUserData.total/10)} color="primary" />}
            </Grid>
            <SimpleModal
                title={newModal ? "新增用户信息" : "修改用户信息"}
                open={modalOpen}
                onClose={closeModal}
                showFooter={true}
                footer={
                    <>
                        {newModal==false? <Button variant="contained" onClick={()=>{saveSysUser()}}  color="primary">
                            保存
                        </Button>:'' }


                        {newModal?
                            <Button variant="contained" onClick={()=>{addSysUser()}} color="primary">
                                确定
                            </Button>:''}

                        <Button onClick={closeModal} color="primary" autoFocus>
                            取消
                        </Button>
                    </>
                }
            >
                <Grid  container spacing={3}>
                    <Grid item md={6}>
                        <TextField fullWidth
                            margin='dense'
                            label="用户姓名"
                            name="adminUsername"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setSysUserObj({...sysUserObj,userName:e.target.value})
                            }}
                            error={validation.userName&&validation.userName!=''}
                            helperText={validation.userName}
                            value={sysUserObj.userName}

                        />
                    </Grid>
                    <Grid item md={6}>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel>性别</InputLabel>
                            <Select label="性别"
                                value={sysUserObj.gender}
                                onChange={(e, value) => {
                                    setSysUserObj({...sysUserObj,gender:e.target.value})
                                }}
                                error={validation.gender&&validation.gender!=''}
                            >
                                {sysConst.GENDER.map((item, index) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                            {(validation.gender&&validation.gender!='') && <FormHelperText style={{color: 'red'}}>{validation.gender}</FormHelperText>}
                        </FormControl>
                        
                    </Grid>
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            disabled={newModal?false:true}
                            name="phone"
                            type="text"
                            label="手机"
                            variant="outlined"
                            onChange={(e)=>{
                                setSysUserObj({...sysUserObj,phone:e.target.value})
                            }}
                            error={validation.phone && validation.phone!=''}
                            helperText={validation.phone}
                            value={sysUserObj.phone}

                        />
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            name="email"
                            type="text"
                            label="邮箱"
                            variant="outlined"
                            onChange={(e)=>{
                                setSysUserObj({...sysUserObj,email:e.target.value})
                            }}
                            error={validation.email && validation.email!=''}
                            helperText={validation.email}
                            value={sysUserObj.email}

                        />
                    </Grid>
                </Grid>                
                {newModal ? <Grid  container spacing={3}>
                 <Grid item xs>
                        <TextField fullWidth
                            label="密码"
                            name="password"
                            margin="dense"
                            type="password"
                            variant="outlined"
                            onChange={(e) => {
                                setSysUserObj({...sysUserObj,password:e.target.value})
                            }}
                            error={validation.password&&validation.password!=''}
                            helperText={validation.password}
                            value={sysUserObj.password}
                        />
                    </Grid> 
                </Grid>: ''}
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel>用户群组</InputLabel>
                            <Select label="用户群组"
                                value={sysUserObj.type}
                                onChange={(e, value) => {
                                    setSysUserObj({...sysUserObj,type:e.target.value})
                                }}
                                error={validation.type&&validation.type!=''}
                            >
                                {sysUserReducer.typeArray.map((item, index) => (
                                    <MenuItem key={item.id} value={item.id}>{item.typeName}</MenuItem>
                                ))}
                            </Select>
                            {(validation.type&&validation.type!='') && <FormHelperText style={{color: 'red'}}>{validation.type}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>
            </SimpleModal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sysUserReducer: state.SysUserReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSysUserList:(queryObj)=>{dispatch(getSysUserList(queryObj))},
    getSysUserTypeList:()=>{dispatch(getSysUserTypeList())},
    createSysUser:(sysUserObj)=>{dispatch(createSysUser(sysUserObj))},
    updateSysUser:(sysUserObj)=>{dispatch(updateSysUser(sysUserObj))},
    exportSysUser:(queryObj)=>{dispatch(exportSysUser(queryObj))}
});

export default connect(mapStateToProps, mapDispatchToProps)(SysUser);