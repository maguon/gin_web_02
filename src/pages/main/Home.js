import React, {useState} from 'react';
import {connect} from 'react-redux';

const Home = (props) => {
    return (
        <div>
            
            <span>Home</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);