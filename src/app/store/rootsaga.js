import {all} from 'redux-saga/effects';
import {watchSubmitForm} from '../../features/formRegister/index.js';
import {loginSaga} from "../../features/formLogin/index.js";
import {watchingToolsForm} from "../../features/formToolsSend/index.js";

export default function* rootSaga() {
    yield all([
        watchSubmitForm(),
        loginSaga(),
        watchingToolsForm(),
    ]);
}