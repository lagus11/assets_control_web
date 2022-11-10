import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { assetDetailsSlice } from './slices/assetDetails/assetDetailsSlice';
import { assignationSlice } from './slices/assignation/assignationSlice';
import { damagedSlice } from './slices/damaged/damagedSlice';
import { lendSlice } from './slices/lend/lendSlice';
import { repairSlice } from './slices/repair/repairSlice';
import { modalSelectStatusSlice } from './slices/modalSelectStatus/modalSelectStatusSlice';
import { modalStatusDetailsSlice } from './slices/modalStatusDetails/modalStatusDetailsSlice';
import { lostSlice } from './slices/lost/lostSlice';
import { stolenSlice } from './slices/stolen/stolenSlice';
import { userSlice } from './slices/user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'keyTokenApp',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        assetDetails: assetDetailsSlice.reducer,
        assignation: assignationSlice.reducer,
        lend: lendSlice.reducer,
        damaged: damagedSlice.reducer,
        repair: repairSlice.reducer,
        lost: lostSlice.reducer,
        stolen: stolenSlice.reducer,
        modalStatusDetails: modalStatusDetailsSlice.reducer,
        modalSelectStatus: modalSelectStatusSlice.reducer,
        userState: persistedReducer,
    },

    middleware: [thunk]
});