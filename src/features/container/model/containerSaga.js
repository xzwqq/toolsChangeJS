import { call, put, takeLatest } from "redux-saga/effects";
import { ContainerActions } from "./containerSlice";
import { AllContainer, myContainer, deleteContainer } from "../../../shared/api/containerAPI.js";
import { HelperActions } from "../../../utils/helper/helperSlice.js";


function* getMyContainer() {
    try{
        const response = yield call(myContainer)
        yield put(ContainerActions.setSuccses(response))
        yield put(HelperActions.setIsloadingSucsses())
    }catch(error){
        yield put(ContainerActions.setError(error))
    }
}
function* getAllContainer() {
    try{
        const response = yield call(AllContainer)
        yield put(ContainerActions.setSuccses(response))
        yield put(HelperActions.setIsloadingSucsses())
    }catch(error){
        yield put(ContainerActions.setError(error))
    }
}

function* deleteMyContainer(action){
    try{
        yield call(deleteContainer, action.payload)
    }catch(error){
        yield put(ContainerActions.setError(error))
    }
}


export default function* watchContainer (){
    yield takeLatest(ContainerActions.submitMyContainer, getMyContainer)
    yield takeLatest(ContainerActions.submitAllContainer, getAllContainer)
    yield takeLatest(ContainerActions.submitDeleteMyContainer, deleteMyContainer)
} 