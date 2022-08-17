import React, { useEffect, useState } from 'react';
import './UserManager.scss';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { getAllUsers, createNewUser, deleteUserService, editUserService } from '../../services/userService';



const UserManage = () => {

    const [arrayUsers, setArrayUsers] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [userEdit, setuserEdit] = useState({})

    useEffect(() => {
        getAllUsersAPI()

    }, [])

    const getAllUsersAPI = async () => {
        let response = await getAllUsers('ALL')

        if (response && response.errCode === 0) {
            setArrayUsers(response.users)
        }

    }

    const handleAddNewUser = () => {
        setIsOpenModal(true)
    }


    const toggleUserModal = () => {
        setIsOpenModal(!isOpenModal)
    }



    const createNewUserReact = async (data) => {
        try {
            let response = await createNewUser(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await getAllUsersAPI()
                setIsOpenModal(false)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id)

            if (res && res.errCode === 0) {
                await getAllUsersAPI()
            } else {
                alert(res.errMessage)
            }


        } catch (error) {
            console.log(error);
        }
    }

    const handleEditUser = (user) => {
        setIsOpenEditModal(true)
        setuserEdit(user)
    }

    const toggleEditModal = () => {
        setIsOpenEditModal(!isOpenEditModal)
    }

    const handleEditUserAPI = async(user) => {
        try {
            let res = await editUserService(user)
            if(res && res.errCode === 0) {
                console.log(res)
                setIsOpenEditModal(false)
                await getAllUsersAPI()
            } else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
  
    }

    return (
        <div className="text-center mx-3">
            <ModalUser
                isOpenModal={isOpenModal}
                toggleFormParent={toggleUserModal}
                createNewUser={createNewUserReact}
            />
            {
                isOpenEditModal && <ModalEditUser
                    isOpenModal={isOpenEditModal}
                    toggleFormParent={toggleEditModal}
                    currentUser={userEdit}
                    editUser={handleEditUserAPI}
                />
            }
            <h2>HTML Table</h2>
            <div className='mx-1'>
                <button
                    className='btn btn-primary px-3'
                    onClick={() => handleAddNewUser()}
                >
                    <i className='fas fa-plus'></i>

                    Add new user</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        arrayUsers && arrayUsers.map((item, index) => (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit' onClick={() => handleEditUser(item)}>
                                        <i className='fas fa-pencil-alt' ></i>
                                    </button>
                                    <button className='btn-delete' onClick={() => handleDeleteUser(item)}>
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>


            </table>
        </div>
    )
}

export default UserManage
