import React, {useState} from 'react';
import {connect} from 'react-redux';

const UserList = (props) => {
    return (
        <div>
            
            <span>User List</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);