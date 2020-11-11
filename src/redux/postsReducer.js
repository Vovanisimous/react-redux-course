// Создаем состояние по умолчанию
import {CREATE_POST, FETCH_POSTS} from "./types";

const initialState = {
    posts: [],
    fetchedPosts: [],
}

// Передаем initialState, чтобы при инициализации проекта в reducer не передавалось undefined, если постов не будет
export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST: {
            return {
                ...state,
                // Тут расписаны два метода того, как можно добавлять новые элементы в масив, не мутируя основное состояние
                posts: state.posts.concat([action.payload])
                // posts: [...state.posts, action.payload]
            }
        }
        case FETCH_POSTS: {
            return {
                ...state,
                fetchedPosts: action.payload,
            }
        }
        default: return state
    }
}