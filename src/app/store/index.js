import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../store/rootsaga.js';
import {formSlice} from '../../features/formRegister/index.js';
import {loginSlice} from "../../features/formLogin/index.js";
import {toolsSendSlice} from "../../features/formToolsSend/index.js";

const sagaMiddleware = createSagaMiddleware();

const index = configureStore({
    reducer: {
        form: formSlice,
        login: loginSlice,
        toolsSend: toolsSendSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default index;