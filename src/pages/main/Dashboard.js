import React, {useState} from 'react';
import {connect} from 'react-redux';

const Dashboard = (props) => {
    return (
        <div>
            
            <span>Dashboard</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);