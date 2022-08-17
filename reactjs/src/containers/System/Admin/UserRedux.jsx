import React, { useEffect, useState } from 'react';
import { getAllCodeService } from '../../../services/userService';
import { useSelector, useDispatch } from 'react-redux';
import { languages, crudActions } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewUser1, editUserRedux } from '../../../store/actions';
import TableManaUser from './TableManaUser';
import CommonUtils from '../../../utils/CommonUtils';



const UserRedux = () => {

    const initialState = {
        id: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        avatar: '',
        action: crudActions.ADD
    }

    const [genderArr, setGenderArr] = useState([])
    const [positionArr, setPositionArr] = useState([])
    const [roleArr, setRoleArr] = useState([])
    const [previewImg, setPreviewImg] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [values, setValues] = useState(initialState)
    const [action, setAction] = useState('')


    const language = useSelector(state => state.app.language)

    const dispatch = useDispatch()

    const genderRedux = useSelector(state => state.admin.genders)
    const positionRedux = useSelector(state => state.admin.positions)
    const rolesRedux = useSelector(state => state.admin.roles)


    useEffect(() => {
        dispatch(actions.fetchGenderStart())
        dispatch(actions.fetchPositionStart())
        dispatch(actions.fetchRoleStart())
    }, [])

    useEffect(() => {
        setPositionArr(positionRedux)
        setValues({ ...values, position: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : '' })
    }, [positionRedux])
    useEffect(() => {
        setGenderArr(genderRedux)
        setValues({ ...values, gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : '' })

    }, [genderRedux])
    useEffect(() => {
        setRoleArr(rolesRedux)
        setValues({ ...values, role: rolesRedux && rolesRedux.length > 0 ? rolesRedux[0].keyMap : '' })

    }, [rolesRedux])


    const handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]

        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectURL = URL.createObjectURL(file)
            setPreviewImg(objectURL)
            setValues({
                ...values,
                avatar: base64
            })
        }

    }

    const openPreviewImage = () => {

        if (!previewImg) return
        setIsOpen(true)
    }

    const handleOnchangeInput = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }
    const checkValidate = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']

        for (let i = 0; i < arrCheck.length; i++) {
            if (!values[arrCheck[i]]) {
                isValid = false;
                alert('The input is required: ' + arrCheck[i])
                break;
            }

        }

        return isValid
    }

    const saveUserRedux = (e) => {

        console.log(values)


        e.preventDefault()
        let isValid = checkValidate()
        if (isValid === false) return;



        if (values.action === crudActions.ADD) {
            //fire action redux
            dispatch(createNewUser1({
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                address: values.address,
                phonenumber: values.phoneNumber,
                gender: values.gender,
                roleId: values.role,
                positionId: values.position,
                avatar: values.avatar
            }))
        }
        if (values.action === crudActions.EDIT) {

            dispatch(editUserRedux({
                id: values.id,
                firstName: values.firstName,
                lastName: values.lastName,
                phonenumber: values.phoneNumber,
                gender: values.gender,
                roleId: values.role,
                positionId: values.position,
                // positionId: values.position,
            }))
        }
    }

    const handleEditUserParent = (user) => {

        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer.from(user.image, 'base64').toString('binary');
        }
        setPreviewImg(imageBase64)

        setValues({
            ...values,
            id: user.id,
            email: user.email,
            password: 'HARDPASSWORD',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.position,
            role: user.role,
            avatar: '',
            action: crudActions.EDIT
        })
    }
    console.log(values)



    return (
        <>
            <div className='container'>
                <div className='title'>Create New Form</div>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email" name="email" onChange={handleOnchangeInput} value={values.email}
                                disabled={action === crudActions.EDIT}
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="inputPassword1">Password</label>
                            <input type="password" class="form-control" id="inputPassword1" placeholder="Password" name='password' onChange={handleOnchangeInput} value={values.password}
                                disabled={action === crudActions.EDIT}
                            />
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="inputPassword2">First Name</label>
                            <input type="text" class="form-control" id="inputPassword2" placeholder="Password" name='firstName' onChange={handleOnchangeInput} value={values.firstName} />
                        </div>
                        <div class="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last Name</label>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="Password" name='lastName' onChange={handleOnchangeInput} value={values.lastName} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label htmlFor="inputAddress">Phone</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Phone Number" name='phoneNumber' onChange={handleOnchangeInput} value={values.phoneNumber} />
                    </div>
                    <div class="form-group">
                        <label htmlFor="inputAddress2">Address</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Address" name='address' onChange={handleOnchangeInput} value={values.address} />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label htmlFor="inputState">Female</label>
                            <select id="inputState" class="form-control" name='gender' onChange={handleOnchangeInput}>
                                {
                                    genderArr.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label htmlFor="inputPosition">Position</label>
                            <select id="inputPosition" class="form-control" name='position' onChange={handleOnchangeInput}>
                                {
                                    positionArr.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label htmlFor="inputRole">Role</label>
                            <select id="inputRole" class="form-control" name='role' onChange={handleOnchangeInput}>
                                {
                                    roleArr.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label htmlFor="avatar">Avatar</label>
                            <input type="file"
                                onChange={handleOnChangeImage}
                                id='avatar' />

                            <div
                                style={{ backgroundImage: `url(${previewImg})`, width: '100%', height: '100px', backgroundPosition: 'center', backgroundSize: 'cover' }}
                                onClick={openPreviewImage}
                            ></div>

                        </div>

                    </div>
                    {/* <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" />
                            <label class="form-check-label" htmlFor="gridCheck">
                                Check me out
                            </label>
                        </div>
                    </div> */}
                    <button
                        type="submit"
                        class={action === crudActions.EDIT ? 'btn btn-warning px-2' : 'btn btn-primary px-2'}
                        onClick={saveUserRedux}
                    >Submit
                    </button>
                </form>
            </div>
            <div className='container mt-3 mb-5'>
                <TableManaUser
                    handleEditUserParent={handleEditUserParent}
                    action={action}
                />
            </div>
            {
                isOpen && <Lightbox
                    mainSrc={previewImg}
                    onCloseRequest={() => setIsOpen(false)}
                />
            }
        </>
    )
}

export default UserRedux