import {
    CREATE_POST,
    FETCH_POSTS,
    HIDE_EMPTY_INPUT_ALERT,
    HIDE_LOADER,
    SHOW_EMPTY_INPUT_ALERT,
    SHOW_LOADER,
} from "./types";

export function createPost(post) {
    return {
        type: CREATE_POST,
        payload: post,
    };
}

export function showLoader() {
    return {
        type: SHOW_LOADER,
    };
}

export function hideLoader() {
    return {
        type: HIDE_LOADER,
    };
}

export function fetchPosts() {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            // Заметь, что в конце ссылки метода fetch написано ?_limit=5, что ограничивает количество элементов, приходящих с сервера
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
            const json = await response.json();
            // Искусственная задержка для красоты :)
            setTimeout(() => {
                dispatch({ type: FETCH_POSTS, payload: json });
                dispatch(hideLoader());
            }, 500);
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showAlert(error.toString()));
        }
    };
}

export function showAlert(text) {
    return (dispatch) => {
        dispatch({
            type: SHOW_EMPTY_INPUT_ALERT,
            payload: text,
        });

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);
    };
}

export function hideAlert() {
    return {
        type: HIDE_EMPTY_INPUT_ALERT,
    };
}
