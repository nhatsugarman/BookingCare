import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import _ from "lodash";

const ModalEditUser = ({ isOpenModal, toggleFormParent, currentUser, editUser }) => {

    const initialValues = {
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
    }

    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        let user = currentUser
        if (user && !_.isEmpty(user)) {
            setValues({
                id: user.id,
                email: user.email,
                password: "okela",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }

    }, [currentUser]);


    const handleOnChangeInput = (e) => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

    };

    const checkValidateInput = () => {

        let isValid = true

        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']

        for (let i = 0; i < arrInput.length; i++) {
            if (!values[arrInput[i]]) {
                isValid = false
                alert('Missing parameter, ' + arrInput[i])
                break
            }

        }

        return isValid;
    }


    const handleSaveUser = () => {
        let isValid = checkValidateInput()
        if (isValid === true) {
            //Call Api from server
            editUser(values)
            // setValues(initialValues)
        }
    }


    const toggle = () => toggleFormParent();

    return (
        <Modal isOpen={isOpenModal} toggle={toggle} className={'abcClassName'} >
            <ModalHeader toggle={toggle}>
                Modal Edit User
            </ModalHeader>
            <ModalBody>
                <div className="modal-user-body">
                    <div className="input-container">
                        <label>Email</label>
                        <input type="text" onChange={handleOnChangeInput} name="email" value={values.email} disabled/>
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="password" onChange={handleOnChangeInput} name="password" value={values.password} disabled/>
                    </div>
                    <div className="input-container">
                        <label>First Name</label>
                        <input type="text" onChange={handleOnChangeInput} name="firstName" value={values.firstName} />
                    </div>
                    <div className="input-container">
                        <label>Last Name</label>
                        <input type="text" onChange={handleOnChangeInput} name="lastName" value={values.lastName} />
                    </div>
                    <div className="input-container">
                        <label>Address</label>
                        <input type="text" onChange={handleOnChangeInput} name="address" value={values.address} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveUser} className='px-3'> Save Changes </Button>

                <Button onClick={toggle} className='px-3'>Close</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalEditUser