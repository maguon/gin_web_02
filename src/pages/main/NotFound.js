import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Box,Button,Grid,Typography} from '@mui/material';
import { getCurrentAdmin } from '../../store/actions/layout/AppAction'
const NotFound = (props) => {
    const {getCurrentAdmin } = props;
    useEffect(()=>{
        getCurrentAdmin();
    },[])
    return (
        <div>
            <Grid container justifyContent="center">
                <Box>
                <Typography color="textPrimary" variant="h2" align="center"><img style={{paddingTop: 60,width:640}} src="/404.svg" alt="404"/></Typography>
                <Typography variant="h3" gutterBottom>
                    The page you were looking for doesn't exist.
                </Typography>
                <Typography variant="h5" gutterBottom>
                    It's on us, we moved the content to a different page. The search below should help!
                </Typography>
                <Grid container justifyContent="center" style={{paddingTop:10}}>
                    <Button variant="outlined" size="large" href="/">返回首页</Button>
                </Grid>
                </Box>
                
               
            </Grid>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    
    getCurrentAdmin:()=>{dispatch(getCurrentAdmin())},
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);