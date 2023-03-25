import React, {useState,useEffect} from 'react';
import {connect,useDispatch} from 'react-redux';
import {Autocomplete, Button,Checkbox,  Divider,FormControlLabel,Grid,IconButton,TextField,Typography} from '@mui/material';
import { useConfirm } from "material-ui-confirm";
import Icon from '@mdi/react'
import * as md from '@mdi/js'
import { SysAuthActionType} from '../../store/types';
import {getSysUserTypeList} from '../../store/actions/main/SysUserAction'
import {changeMenuList, createAdminType,deleteAdminType,updateAdminType} from '../../store/actions/main/SysAuthAction'
import SimpleModal from '../layout/SimpleModal';
const sysConst = require('../../utils/SysConst')
const commonUtil = require('../../utils/CommonUtil')

const SysAuth = (props) => {
    const {sysAuthReducer,sysUserReducer,getSysUserTypeList,menuLinkChange,updateAdminType,removeAdminType,createAdminType} = props;
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const [currentUserType, setCurrentUserType] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [typeName, setTypeName] = useState('');
    const [remark, setRemark] = useState('');
    const [validation,setValidation] = useState({});
    useEffect(()=>{        
        getSysUserTypeList();
    },[])

    const saveAdminType = ()=> {       
        console.log("updateadmintype")
        updateAdminType(currentUserType)
    }
    const openModal = (event) => {
        // 清check内容
        setValidation({});
        setTypeName('');
        setRemark('');
        setModalOpen(true);
    };

    const validate = ()=>{
        const validateObj ={};
        if (!typeName) {
            validateObj.typeName ='请输入用户群组名称';
        }
        setValidation(validateObj);
        return Object.keys(validateObj).length
    };

    const submitAdminType = ()=> {
        const errorCount = validate();
        if(errorCount===0){
            createAdminType({typeName, remark})
            setModalOpen(false);
        }
    }
    const delAdminTypeById = () => {

        if(currentUserType){
            confirm({ title:"删除用户组",description: "请确保该用户组下没有用户关联！",confirmationText:"确定",cancellationText:"取消"})
            .then(() =>{
                removeAdminType(currentUserType.id)
            }).catch(() => {
                console.log("取消推出!");
            });
            
        }
    }
    return (
        <div>
            <Typography gutterBottom variant="h6" >权限设置</Typography>
            <Divider  style={{borderWidth:2}} />
            <Grid container  spacing={1} style={{paddingTop:10}}>
                <Grid item xs={3}>
                    <Autocomplete ListboxProps={{style: {maxHeight: '175px'}}} fullWidth disableClearable
                        options={sysUserReducer.typeArray}
                        getOptionLabel={(option) => option.typeName}
                        value={currentUserType}
                        onChange={(event, value) => {
                            setCurrentUserType(value);
                            dispatch({type: SysAuthActionType.setMenuList, payload: commonUtil.objToMap(value.menuList)});
                        }}
                        renderInput={(params) => <TextField {...params} label="用户群组" margin="dense" size='small' variant="outlined"/>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth margin="dense" size='small' variant="outlined" label="备注" InputLabelProps={{ shrink: true }}
                        onChange={(e)=>{setCurrentUserType({...currentUserType,remark:e.target.value})}}
                        value={currentUserType != null?currentUserType.remark:''}                                
                    />
                </Grid>
                <Grid item xs={3}>
                    <Grid container alignItems="center" justifyContent="space-around">
                        <IconButton color="primary" aria-label="add" onClick={() => {openModal()}} >
                            <Icon path={md["mdiPlusCircle"]} size={1.5}/>
                        </IconButton>
                        {currentUserType&&<IconButton color="warning" aria-label="query" component="label" onClick={() => {delAdminTypeById()}}>
                            <Icon path={md["mdiCloseBox"]} size={1.5}/>
                        </IconButton>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <b>当前权限：</b>
                </Grid>
                {currentUserType != null && sysConst.ALL_PAGE_LIST.map(function (item, index) {
                    return (
                        <Grid item container xs={12}  key={'no_child_container' + index}>
                            {/* 不含子菜单的样式 */}
                            {item.children.length === 0 &&
                            <Grid item xs={3}  key={'no_child_item' + index}>
                                <FormControlLabel key={'no_child_FormControlLabel' + index}
                                    control={
                                        <Checkbox color="primary" key={'no_child_checkbox' + index}
                                            checked={sysAuthReducer.currentMenu.size>0 && sysAuthReducer.currentMenu.has(item.link)}
                                            onChange={(e) => {menuLinkChange(e, item.link)}}
                                        />
                                    }
                                    label={<span>{item.label}</span>}
                                />
                            </Grid>}

                            {/* 含子菜单的样式 */}
                            {item.children.length > 0 &&
                            <Grid item container xs={12} key={'has_child_container' + index}>
                                <Grid item xs={12} key={'has_child_item' + index}><b><span>{item.label}</span></b></Grid>
                                {item.children.map(function (menu, key) {
                                    return (
                                        <Grid item xs={3} key={'has_child_item' + index + key}>
                                            <FormControlLabel key={'has_child_FormControlLabel' + index + key}
                                                control={
                                                    <Checkbox color="primary" key={'has_child_checkbox' + index + key}
                                                        checked={sysAuthReducer.currentMenu.size>0 && sysAuthReducer.currentMenu.has(menu.link)}
                                                        onChange={(e) => {menuLinkChange(e, menu.link)}}
                                                    />
                                                }
                                                label={<span>{menu.name}</span>}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>}
                        </Grid>
                    )
                })}
                {currentUserType != null &&
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={()=>{saveAdminType()}}>修改</Button>
                </Grid>}
            </Grid>
            <SimpleModal
                title="新增用户群组"
                open={modalOpen}
                onClose={()=>{setModalOpen(false)}}
                showFooter={true}
                footer={
                    <>
                        <Button variant="contained" color="primary" onClick={()=>{submitAdminType()}}>确定</Button>
                        <Button variant="contained" onClick={()=>{setModalOpen(false)}}>关闭</Button>
                    </>
                }
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth margin="dense" variant="outlined" label="用户群组名称" value={typeName}
                                   onChange={(e) => {setTypeName(e.target.value)}}
                                   error={validation.typeName&&validation.typeName!=''}
                                   helperText={validation.typeName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth margin="dense" variant="outlined" label="备注" multiline rows={4} value={remark}
                                   onChange={(e) => {setRemark(e.target.value)}}/>
                    </Grid>
                </Grid>
            </SimpleModal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sysAuthReducer: state.SysAuthReducer,
        sysUserReducer: state.SysUserReducer,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSysUserTypeList:()=>{dispatch(getSysUserTypeList())},
    menuLinkChange: (event, key) => {
        dispatch(changeMenuList(key, event.target.checked))
    },
    createAdminType : (params)=>{
        dispatch(createAdminType(params))
    },
    updateAdminType :(currentAdminType)=>{
        console.log(currentAdminType)
        dispatch(updateAdminType(currentAdminType))
    },
    removeAdminType : (adminTypeId) => {
        dispatch(deleteAdminType(adminTypeId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SysAuth);