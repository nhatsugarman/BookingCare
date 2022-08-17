import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';

const TableManaUser = (props) => {

    const [userRedux, setUserRedux] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.fetchAllUserStart())
    }, []);

    const listUsers = useSelector(state => state.admin.users)

    useEffect(() => {
        setUserRedux(listUsers)
    }, [listUsers]);


    const handleDelete = (user) => {
        dispatch(actions.deleteUserRedux(user.id))
    }

    const handleEditUser = (user) => {
        props.handleEditUserParent(user)
    }

    return (
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
                    userRedux && userRedux.map((item, index) => (
                      
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.address}</td>
                            <td>
                                <button
                                    className='btn-edit'
                                    onClick={() => handleEditUser(item)}
                                >
                                    <i className='fas fa-pencil-alt' ></i>
                                </button>
                                <button
                                    className='btn-delete'
                                    onClick={() => handleDelete(item)}
                                >
                                    <i className='fas fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
    )
}

export default TableManaUser