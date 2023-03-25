import React, { useState } from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

import {Avatar,Box, Divider, Drawer, Grid, 
    List, ListItem,ListItemButton, ListItemIcon, ListItemText,Toolbar} from '@mui/material';
import Icon from '@mdi/react'
import * as md from '@mdi/js'
import {ALL_PAGE_LIST} from '../../utils/SysConst'
import NestedList from './NestedList';

const drawerWidth = 240;
const Navi = (props)=>{
  const {appReducer} = props;
  console.log(appReducer)
  const[open,setOpen] =useState(false)
    return (
        <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box',borderRightWidth:5, },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {appReducer.currentUserMenu.menuList.map((item, index) => {
              return (
                <>
                  {item.children.length === 0 &&
                    <NavLink exact="true" key={item.link+"link"} to={item.link} style={{textDecoration: 'none',color:"inherit"}}>
                      <ListItem  key={item.link + index} disablePadding >
                        <ListItemButton>
                            <ListItemIcon>
                            <Icon path={md[`${item.icon}`]} size={1}/>
                            </ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                      </ListItem>
                    </NavLink>
                  }
                  {item.children.length > 0 &&
                     <NestedList  key={item.link+"nestlink"}  item={item}/>}       
                  
                </>
              )
            })}
          </List>
        </Box>
      </Drawer>
    )
}

const mapStateToProps = (state) => {
    return {
        appReducer: state.AppReducer
    }
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navi);