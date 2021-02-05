import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { Client } from "./gen/api/dist";

export {};

type AppReducerState = {
  isLoggedIn: boolean;
  currentUser?: Client;
};

function init(initialState: number): AppReducerState {
  return { isLoggedIn: false, currentUser: undefined };
}
