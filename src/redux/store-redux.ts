import {applyMiddleware, combineReducers, createStore, compose } from "redux";
import todoReducer from "./todo-reducer";
import middleWare from 'redux-thunk'

const reducers = combineReducers({
    todoReducer: todoReducer
})
type reducersType = typeof reducers
export type AppState = ReturnType<reducersType>
export type AllActionType<T> = T extends {[key: string]:infer U} ? U : never
export function TypeFunction<T extends string>(arg: T):T{
    return arg
}


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(middleWare)));
//@ts-ignore
window.store = store
export default store


