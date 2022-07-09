import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import createSagaMiddleWare from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./state";
import usersSaga from "./saga";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersContainer from './Users/UserContainer';
import UserEdit from './Users/UserEdit';

const saga = createSagaMiddleWare();
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [saga],
});
saga.run(usersSaga)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='*' element={<UsersContainer/>}/>
          <Route path="/" element={<UsersContainer/>}/>
          <Route path="/edit/:id" element={<UserEdit/>}/>
          <Route path="/edit/create" element={<UserEdit/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
