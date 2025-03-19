import { call, put, takeLatest } from 'redux-saga/effects';
import { submitRegister } from '../../../shared/api/authAPI.js';
import { RegisterActions } from './registerSlice.js';
import { history } from '../../../app/providers/history.js';

function* handleSubmitForm(action) {
	try {
		const response = yield call(submitRegister, action.payload);
		yield put(RegisterActions.setSuccess(response));
		yield call([history, history.push], '/')
	} catch (error) {
		yield put(RegisterActions.setError(error));
		if (error.status === 409) {
		alert('мага с таким сиянием уже есть');
		}
		if (error.status === 409) {
			alert('пользователь с такой почтой уже существует!');
		}
	}
}

export default function* watchRegister() {
	yield takeLatest(RegisterActions.submit, handleSubmitForm);
}
