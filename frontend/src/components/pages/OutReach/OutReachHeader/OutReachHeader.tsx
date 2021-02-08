import React from "react";
import { ValleeBackendApi } from "../../../../util/gen/api/dist";
import Button from "../../../common/Button/Button";
import HeaderContainer from "../../../common/HeaderContainer/HeaderContainer";
import {
  publishClickHandler,
  saveClickHandler,
} from "../OutReachPageHelperFunctions/HelperFunctions";
import {
  OutReachEditorActions,
  OutReachEditorReducerState,
} from "../OutReachReducer";

export type OutReachHeaderProps = {
  dispatch: (value: OutReachEditorActions) => void;
  state: OutReachEditorReducerState;
  isEditorChanged: boolean;
  apiService: ValleeBackendApi;
  templateState: string;
};

/**
 * A header component for the outreach page. Contains the button for saving and publishing
 * the editor contents as well as displaying the current editor state i.e draft of published
 *
 * @param dispatch - the editor dispatch to handle events related to saving and publishing
 * @param state - the OutReachEditorReducerState containing the current state
 * @param isEditorChanged -  bool self explantory
 * @param templateState - string to display conditional text if current content published or saved
 * @param apiService - the api the connects to the backend used in publish and save
 *
 * @returns a boolean
 *
 * @beta
 */
const OutReachHeader: React.FC<OutReachHeaderProps> = (props) => {
  const { dispatch, state, isEditorChanged, templateState, apiService } = props;
  return (
    <HeaderContainer className={"EditorHeader"}>
      <div className="row_container">
        <h2>{"Email Template"}</h2>
        <h3>{templateState}</h3>
      </div>
      <div className="row_container">
        <Button
          onClick={() => {
            saveClickHandler(state, dispatch, apiService);
          }}
          disabled={!isEditorChanged}
          className={"outreach_button"}
        >
          Save Template
        </Button>
        <Button
          onClick={() => {
            publishClickHandler(state, dispatch, apiService);
          }}
          disabled={!isEditorChanged && state.outreach?.state === "FINALIZED"}
          className={"outreach_button"}
        >
          Publish
        </Button>
      </div>
    </HeaderContainer>
  );
};

export default OutReachHeader;
