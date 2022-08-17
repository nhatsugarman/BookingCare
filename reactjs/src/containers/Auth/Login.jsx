import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { handleLoginApi } from '../../services/userService';
import * as actions from "../../store/actions";


import './Login.scss'

const Login = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const dispatch = useDispatch()

    const handleOnChangeInput = (event) => {
        setUserName(event.target.value)
    }

    const handleOnChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {

        setErrorMessage('')


        try {
            let data = await handleLoginApi(userName, password);
            console.log(data)
            if (data && data.errCode !== 0) {
                setErrorMessage(data.message)
            }
            if (data && data.errCode === 0) {
                console.log('oke ban duong nhe')
                dispatch(actions.userLoginSuccess(data.user))
                console.log('loging success');
            }
        
        } catch (e) {
            
            if (e.response) {
                if (e.response.data) {
                    setErrorMessage(e.response.data.message)
                }
            }
            console.log('error message in login', e.response);
        }
    }

    const handleShowHidePassword = () => {
        setIsShowPassword(!isShowPassword)
    }


    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-center login-title">Login</div>
                    <div className="col-12 form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            className="form-control login-input"
                            placeholder="Enter your user name"
                            onChange={(e) => handleOnChangeInput(e)}
                            value={userName}
                            spellCheck='false'
                        />

                    </div>
                    <div className="col-12 form-group">
                        <label>Password: </label>
                        <div className="login-password">
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                className="form-control login-input"
                                placeholder="Enter your password"
                                onChange={(e) => handleOnChangePassword(e)}
                                value={password}
                                spellCheck='false'
                            />
                            <span className='show-password' onClick={() => handleShowHidePassword()}>
                                <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-12" style={{ color: 'red' }}>
                        {errorMessage}
                    </div>
                    <div className="col-12">
                        <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password">Forgot your password?</span>
                    </div>
                    <div className="col-12 text-center login-with mt-3">
                        <span className="">Or login with:</span>
                    </div>
                    <div className="col-12 social-login">
                        <i className="fab fa-facebook social-icon fb"></i>
                        <i className="fab fa-google-plus social-icon gg"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login