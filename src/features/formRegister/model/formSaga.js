import { call, put, takeLatest } from 'redux-saga/effects';
import { submitForm } from '../../../shared/api/formAPI.js';
import { FormActions } from './formSlice.js';
import { history } from '../../../app/providers/history.js';

function* handleSubmitForm(action) {
	try {
		const response = yield call(submitForm, action.payload);
		yield put(FormActions.submitFormSuccess(response));
		yield call([history, history.push], '/')
	} catch (error) {
		yield put(FormActions.submitFormFailure(error));
		if (error.status === 409) {
		alert('мага с таким сиянием уже есть');
		}
	}
}

export default function* watchSubmitForm() {
	yield takeLatest(FormActions.submit, handleSubmitForm);
}
