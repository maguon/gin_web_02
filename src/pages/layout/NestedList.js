import React from "react";
import {NavLink} from "react-router-dom";
import {Box, List, ListItem, ListItemIcon, ListItemText, Collapse} from "@mui/material";
import Icon from '@mdi/react'
import * as md from '@mdi/js'


const  NestedList =(props) => {
    let {item, handleDrawerClose} = props;
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon><Icon path={md[`${item.icon}`]}  size={1}/></ListItemIcon>
                <ListItemText primary={item.label}/>
                {open ? <Icon path={md["mdiChevronDown"]} size={1}/>:<Icon path={md["mdiChevronRight"]} size={1}/>}
            </ListItem>
            <Box sx={{ ml:2 }}>
                <Collapse timeout="auto" in={open} unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map(function (menu) {
                            return (
                                // eslint-disable-next-line react/jsx-no-duplicate-props
                                <NavLink exact="true" key={menu.link+"menulink"}  to={menu.link} style={{textDecoration: 'none',color:"inherit"}} key={'link-' + menu.link}>
                                    <ListItem button onClick={handleDrawerClose} key={'second-' + menu.link}>
                                        <ListItemIcon><Icon path={md[`${menu.icon}`]}  size={1}/></ListItemIcon>
                                        <ListItemText primary={menu.name}/>
                                    </ListItem>
                                </NavLink>
                            )
                        })}
                    </List>
                </Collapse>
            </Box>
        </>
    );
}
export default NestedList;