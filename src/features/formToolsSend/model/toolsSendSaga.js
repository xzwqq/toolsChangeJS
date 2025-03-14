import { call, put, takeLatest } from 'redux-saga/effects';
import { ToolsSendActions } from '../model/toolsSendSlice.js';
import {
	getToolsCategories,
	getToolsManufacturers,
	sendTools
} from '../../../shared/api/ToolsSendAPI.js';

function* toolsSendSaga(action) {
	try {
		const data = new FormData();
		data.append("tool", new Blob([JSON.stringify(action.payload.tool)], { type: "application/json" }));
		data.append('files', action.payload.files);
		const response = yield call(sendTools, data);
		yield put(ToolsSendActions.setSuccess(response));
	} catch (error) {
		yield put(ToolsSendActions.setError(error));
	}
}

function* toolsSelectC() {
	try {
		const select = yield call(getToolsCategories);
		yield put(ToolsSendActions.setSelectC(select));
	} catch (error) {
		yield put(ToolsSendActions.setError(error));
	}
}

function* toolsSelectManufacturer() {
	try {
		const response = yield call(getToolsManufacturers);
		yield put(ToolsSendActions.setSelectM(response));
		console.log(response);
	} catch (error) {
		yield put(ToolsSendActions.setError(error));
	}
}

export default function* watchingToolsForm() {
	yield takeLatest(ToolsSendActions.submitSelectC, toolsSelectC);
	yield takeLatest(ToolsSendActions.submitSelectM, toolsSelectManufacturer);
	yield takeLatest(ToolsSendActions.submit, toolsSendSaga);
}
