import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserManage extends Component {


    componentDidMount() {
        console.log('chua den day');
    }


    render() {
        return (
            <div className="text-center">Manage users sdadas
                {
                    console.log('da den day roi')
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
