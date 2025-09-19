import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore,persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage"
import userReducer from "./userSlice"
import cartReducer from "./cartSlice"

const rootReducer = combineReducers({
    users:userReducer,
    cart:cartReducer
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig : PersistConfig<RootState> = {
    key:"root",
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck:false
        })
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store