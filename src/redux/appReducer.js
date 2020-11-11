import {HIDE_EMPTY_INPUT_ALERT, HIDE_LOADER, SHOW_EMPTY_INPUT_ALERT, SHOW_LOADER} from "./types";

const initialState = {
    loading: false,
    alert: null
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                loading: true,
            }
        case HIDE_LOADER:
            return {
                ...state,
                loading: false
            }
        case SHOW_EMPTY_INPUT_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case HIDE_EMPTY_INPUT_ALERT:
            return {
                ...state,
                alert: null
            }
        default: return state
    }
}