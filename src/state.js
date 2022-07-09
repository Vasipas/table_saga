import { createSlice } from "@reduxjs/toolkit"

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        editUser: {name: '', surname: '', desc: ''},
        isLoading: false,
        error: null,
        updated: null

    },
    reducers: {
        getUsersFetch: (state) => {
            state.isLoading = true
            state.error = null
        },
        getUsersSuccess: (state, {payload}) => {
            state.users = (payload.filter(item => item.name || item.surname || item.desc))
            state.isLoading = false
            state.error = null
        },
        editUser: () => {
        },
        getEditUserSuccess: (state, {payload}) => {
            state.isLoading = false
            state.editUser = payload
            state.error = null
            state.updated = null
        },
        changeUserField: (state, {payload}) => {
            if(payload.id === 'name') {
                state.editUser = {...state.editUser, name: payload.value}
            }
            if(payload.id === 'surname') {
                state.editUser = {...state.editUser, surname: payload.value}
            }
            if(payload.id === 'description') {
                state.editUser = {...state.editUser, desc: payload.value}
            }
            state.updated = 'pending'
        },
        updateUser: (state) => {
            state.isLoading = true
            state.error = null
            state.updated = null
        },
        createUser: (state) => {
            state.isLoading = true
            state.error = null
            state.updated = null
        },
        deleteUser: (state) => {
            state.isLoading = true
            state.error = null
            state.updated = null
        },
        setError: (state, {payload}) => {
            state.isLoading = false
            state.error = payload.error
            state.updated = false
        },
        updatingSuccess: (state, {payload}) => {
            state.isLoading = false
            state.updated = payload
        },
        setDefault: (state) => {
            state.editUser = {name: '', surname: '', desc: ''}
        }

    }
})

export const {
    getUsersFetch, 
    getUsersSuccess, 
    editUser, 
    getEditUserSuccess, 
    changeUserField,
    updateUser,
    createUser,
    deleteUser, 
    setError,
    updatingSuccess,
    setDefault
 } = usersSlice.actions
export default usersSlice.reducer