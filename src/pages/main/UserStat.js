import React, {useState} from 'react';
import {connect} from 'react-redux';

const UserStat = (props) => {
    return (
        <div>
            
            <span>User Stat</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(UserStat);