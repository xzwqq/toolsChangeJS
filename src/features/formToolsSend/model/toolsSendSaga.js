import { call, put, takeLatest } from 'redux-saga/effects';
import { ToolsSendActions } from '../model/toolsSendSlice.js';
import {
	// getAllContainer,
	getToolsCategories,
	getToolsManufacturers,
	sendTools
} from '../../../shared/api/toolsSendAPI.js';
import {ApiHome, deleteObj} from '../../../shared/api/myProfileAPI.js'

function* toolsSendSaga(action) {
	try {
		const data = new FormData();
		data.append(
			'tool',
			new Blob([JSON.stringify(action.payload.tool)], {
				type: 'application/json'
			})
		);
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

function* getForm() {
	try {
		const response = yield call(ApiHome);
		console.log(response.content)
		yield put(ToolsSendActions.setContainer(response.content));
	} catch (err) {
		yield put(ToolsSendActions.setError(err));
	}
}
function* deleteObject(action){
	try{
		yield call(deleteObj, action.payload)
	}catch(err){
		yield put(ToolsSendActions.setError(err))
	}
}

export default function* watchingToolsForm() {
	yield takeLatest(ToolsSendActions.submitSelectC, toolsSelectC);
	yield takeLatest(ToolsSendActions.submitSelectM, toolsSelectManufacturer);
	yield takeLatest(ToolsSendActions.submit, toolsSendSaga);
	yield takeLatest(ToolsSendActions.submitContainer, getForm);
	yield takeLatest(ToolsSendActions.submitDelete, deleteObject);
}
