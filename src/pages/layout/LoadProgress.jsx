import React from 'react';
import {connect} from 'react-redux';
import {Backdrop, CircularProgress} from '@mui/material';


function LoadProgress(props){
    return(
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress  size={80} thickness={1.6}/>
        </Backdrop>
    )
    
}
const mapStateToProps = (state) => {
    return {
        appReducer: state.AppReducer
    }
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoadProgress)