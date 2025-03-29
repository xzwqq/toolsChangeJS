import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from '../store/rootsaga.js';
import helperSlice from '../../utils/helper/helperSlice.js'
import {registerSlice} from '../../features/formRegister/index.js';
import {loginSlice} from "../../features/formLogin/index.js";
import {toolsSendSlice} from "../../features/formToolsSend/index.js";
import { containerSlice } from '../../features/container/index.js';
import { editSlice } from '../../features/editContainer/index.js';

const sagaMiddleware = createSagaMiddleware();

const index = configureStore({
    reducer: {
        helper : helperSlice,
        register: registerSlice,
        login: loginSlice,
        toolsSend: toolsSendSlice,
        container: containerSlice,
        edit: editSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default index;