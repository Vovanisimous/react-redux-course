import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_POSTS, REQUEST_POSTS } from "./types";
import { hideLoader, showAlert, showLoader } from "./actions";

// Звездочка означает генератор-функцию, в которой я пока не разобрался :)
export function* sagaWatcher() {
    // takeEvery подписывается на определенный action (первый аргумент) и выполняет действия по заданной генератор-функции (второй аргумент)
    yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
    try {
        // put запускает action
        yield put(showLoader());
        // call вызывает функцию
        const payload = yield call(fetchPosts);

        yield put({
            type: FETCH_POSTS,
            payload: payload,
        });
        yield put(hideLoader());
    } catch (error) {
        yield put(showAlert(error.toString()));
        yield put(hideLoader());
    }
}

async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    return await response.json();
}
