import { call, put, takeLatest } from 'redux-saga/effects';
import { submitLogin } from '../../../shared/api/loginAPI.js';
import { LoginActions } from './loginSlice.js';
import { history } from '../../../app/providers/history.js';

function* handleSubmitForm(action) {
	try {
		const response = yield call(submitLogin, action.payload);
		yield put(LoginActions.submitFormSuccess(response));
		yield call([history, history.push], '/');
	} catch (error) {
		yield put(LoginActions.submitFormFailure(error));
		if (error.status === 404) {
			alert('маги с таким сиянием ещё нету');
		} else if (error.status === 401) {
			alert('мага пароль забыл что-ли да');
		}
	}
}

export default function* loginSaga() {
	yield takeLatest(LoginActions.submit, handleSubmitForm);
}
