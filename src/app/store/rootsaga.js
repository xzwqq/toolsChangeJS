import {all} from 'redux-saga/effects';
import {watchRegister} from '../../features/formRegister/index.js';
import {watchLogin} from "../../features/formLogin/index.js";
import {watchingToolsForm} from "../../features/formToolsSend/index.js";

export default function* rootSaga() {
    yield all([
        watchRegister(),
        watchLogin(),
        watchingToolsForm(),
    ]);
}