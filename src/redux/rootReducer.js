import {combineReducers} from "redux";
import {postsReducer} from "./postsReducer";
import {appReducer} from "./appReducer";

// Наш основной Reducer, в котором комбинируются все остальные
export const rootReducer = combineReducers({
    posts: postsReducer,
    app: appReducer,
})