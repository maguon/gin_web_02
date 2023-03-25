import React, {useState} from 'react';
import {connect} from 'react-redux';


const Setting = (props) => {
    return (
        <div>
            <span>Setting</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        initialValues: {userName:state.LoginReducer.userName,password:state.LoginReducer.password}
    }
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);