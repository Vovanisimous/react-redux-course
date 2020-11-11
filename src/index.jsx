import React from "react";
import { render } from "react-dom";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga"
// Provider - HOC
import { Provider } from "react-redux";
// Позволяет диспатчить асинхронные события
import thunk from "redux-thunk";

import App from "./App";
import { rootReducer } from "./redux/rootReducer";
import {forbiddenWordsMiddleware} from "./redux/middleware";
import {sagaWatcher} from "./redux/sagas";

const saga = createSagaMiddleware()

// Создаем redux хранилище с созданным нами rootReducer. ComposeWithDevTools подключает devTools, при этом у нас остается возможность
// передавать middlewares
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, forbiddenWordsMiddleware, saga)));

saga.run(sagaWatcher)

const app = (
    // Provider нуждается в обязательном параметре store, в который мы передаем наше зранилище
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

render(app, document.getElementById("root"));
