import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useParams } from 'react-router-dom';
import { createBrowserHistory } from "history";
import {Divider,Grid,IconButton,Typography} from '@mui/material';
import Icon from '@mdi/react'
import * as md from '@mdi/js'


const UserDetail = (props) => {
    let history = createBrowserHistory();
    let { userId } = useParams();
    return (
        <div>
            <Typography gutterBottom variant="h6" >
                <IconButton color="primary" aria-label="back" onClick={()=>{}}><Icon path={md["mdiArrowLeftBold"]} size={1.5}/></IconButton>
                用户详情 {userId}
            </Typography>
            <Divider  style={{borderWidth:2}} />
            <Grid container  spacing={1} style={{paddingTop:10}}>
                <Grid item xs={3}>
                    <Typography gutterBottom variant="h6" >User Detail {userId}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);