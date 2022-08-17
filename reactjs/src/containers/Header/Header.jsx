import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from './../../store/actions/appActions';


const Header = () => {

    const userInfo = useSelector(state => state.user.userInfo)

    const dispatch = useDispatch()

    const processLogout = () => {
        dispatch(actions.processLogout())
    }

    const changeLanguage = (language) => {
		dispatch(changeLanguageApp(language))
	}

    return (
        <div className="header-container">
            {/* thanh navigator */}
            < div className="header-tabs-container" >
                <Navigator menus={adminMenu} />
            </div >

            <div className="languages">
                <h5><FormattedMessage id="homeheader.welcome" /> 
                    {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                </h5>

                <div className='language-toggle'>
                    <button className='px-2 language-toggle-vn' onClick={() => changeLanguage(languages.VI)}>VN</button>
                    <button className='px-2' onClick={() => changeLanguage(languages.EN)}>EN</button>
                </div>


                {/* nút logout */}
                < div className="btn btn-logout" onClick={processLogout} title="Log out" >
                    <i className="fas fa-sign-out-alt"></i>
                </div >
            </div>


        </div >
    );
}

export default Header

