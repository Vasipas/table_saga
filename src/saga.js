import { call, put, takeLatest } from "redux-saga/effects";
import { getUsersSuccess, getEditUserSuccess, setError, updatingSuccess, getUsersFetch } from "./state";
import { getUsers, getUser, putUser, postUser, deleteUser } from './requests/user_api';


function* workGetUsersFetch() {
  try {
    const users = yield call(getUsers);
    const formattedUsers = yield users.data;
    yield put(getUsersSuccess(formattedUsers));
  } catch (error) {
    yield put(setError(error))
  }
}

function* workEditUser(action) {
  try {
    const { id } = action.payload
    const user = yield call(getUser, id);
    const formattedUser = yield user.data
    yield put(getEditUserSuccess(formattedUser));
  } catch (error) {
    yield put(setError(error))
  }
}

function* workPutUser(action) {
    try {
    const { payload } = action
    let result = yield call(putUser, payload.id, payload.data);
    if(result.status === 200) {
      yield put(updatingSuccess('updated'))
      yield getUsersFetch()
    }
    } catch (error) {
      yield put(setError(error))
    }
  }

  function* workPostUser(action) {
    try {
    const { payload } = action
    let result = yield call(postUser, {...payload});
    if (result.status === 200) {
      yield put(updatingSuccess('created'))
      yield getUsersFetch()
    } else { throw new Error(result.error) }

    } catch (error) {
      yield put(setError(error))
    }
  }

  function* workDeleteUser(action) {
    try {
    const { payload } = action
    let result = yield call(deleteUser, payload.id);
    if (result.status === 200) {
      yield put(updatingSuccess('deleted'))
      yield getUsersFetch()
    } else { throw new Error(result.error) }
    } catch (error) {
      yield put(setError(error))
    }
  }

function* userSaga() {
  yield takeLatest("users/getUsersFetch", workGetUsersFetch);
  yield takeLatest("users/editUser", workEditUser);
  yield takeLatest("users/updateUser", workPutUser);
  yield takeLatest("users/createUser", workPostUser);
  yield takeLatest("users/deleteUser", workDeleteUser);
}

export default userSaga;
