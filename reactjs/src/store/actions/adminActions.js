import {
    getAllCodeService, createNewUser, getAllUsers, deleteUserService,
    getTopDoctorHomeService,
    editUserService
} from "../../services/userService";
// import actionTypes from "./actionTypes";
import { toast } from 'react-toastify';



import actionTypes from "./actionTypes";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionSuccess = (position) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: position
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleSuccess = (role) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: role
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const createNewUser1 = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(data);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Create new user successfuly")
            } else {
                dispatch(saveUserFailed())
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})
export const saveUserFailed = () => (
    {
        type: 'CREATE_USER_FAILED'
    }
)


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")
            let res1 = await getTopDoctorHomeService(3)
            console.log(res1)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: 'FETCH_ALL_USER_SUCCESS',
    users: data
})
export const fetchAllUserFailed = () => (
    {
        type: 'FETCH_ALL_USER_FAILED'
    }
)


export const deleteUserRedux = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Delete a user successfuly")
            } else {
                toast.error("Delete a user error")
                dispatch(deleteUserFailed())
            }

        } catch (error) {
            toast.error("Delete a user error")
            console.log(error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => (
    {
        type: actionTypes.DELETE_USER_FAILED
    }
)

export const editUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);

            if (res && res.errCode === 0) {
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("update a user successfuly")
            } else {
                toast.error("update a user error ngoaif else")
                dispatch(editUserFailed())
            }

        } catch (error) {
            toast.error("update a user error")
            console.log(error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => (
    {
        type: actionTypes.EDIT_USER_FAILED
    }
)

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('10');
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
        }
    };
};