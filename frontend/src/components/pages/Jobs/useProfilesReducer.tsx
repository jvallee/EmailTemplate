import React from "react";

export type SortInfo = {
  sortBy: string;
  sortOrder: string;
};

export type AllProfilesState = {
  sortInfo: SortInfo;
  offset: number;
  pageSize: number;
  count: number;
  searchPhrase: string;
  currPageNumber: number;
};

export type AllProfilesActions =
  | { type: "EXAMPLE_ACTION" }
  | { type: "ANOTHER_EXAMPLE" };

function init(initialCount: AllProfilesState) {
  return { count: initialCount };
}

function reducer(
  state: AllProfilesState,
  action: AllProfilesActions
): AllProfilesState {
  switch (action.type) {
    case "EXAMPLE_ACTION":
      return { ...state, count: state.count + 1 };
    case "ANOTHER_EXAMPLE":
      return { ...state, count: state.count - 1 };

    default:
      throw new Error();
  }
}
