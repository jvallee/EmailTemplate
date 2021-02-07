import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import reducer, { OutReachEditorReducerState } from "./OutReachReducer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import "./OutReach.css";
import { TextField } from "@material-ui/core";
import Modal from "./Modal/Modal";
import OutReachHeader from "./OutReachHeader/OutReachHeader";
import {
  OutreachStateEnum,
  ValleeBackendApi,
} from "../../../util/gen/api/dist";
import { hasDraft } from "./OutReachPageHelperFunctions/HelperFunctions";
import { useParams } from "react-router";

type OutReachEditorPageProps = {
  apiService: ValleeBackendApi;
};

interface IUserPublicProfileRouteParams {
  id: string;
}
/**
 * Renders the Outreach Editor Page
 *
 * @returns a React Component that contains the editor that
 *  allows us to edit the Outreach email and subject
 *
 * @beta
 */
const OutReachEditorPage: React.FC<OutReachEditorPageProps> = (props) => {
  const { apiService } = props;
  const id = parseInt(useParams<IUserPublicProfileRouteParams>().id);
  const [state, dispatch] = useReducer(reducer, {
    editorState: EditorState.createEmpty(),
    isDirty: false,
    isModalOpen: false,
    content: "",
    subject: "",
    job: id,
    outreach: undefined,
    hasDraft: { hasDraft: true },
  });
  useEffect(() => {
    //note: we get jobs sorted by creation, with most recent at first index
    apiService.jobsOutreachList(id).then((value) => {
      const data = value.data;
      dispatch({
        type: "EDITOR_LOADED_200",
        payload: {
          outreach: data[0],
          outreaches: data,
          hasDraft: hasDraft(data),
        },
      });
    });
  }, []);

  const onEditorStateChange = (editorState: EditorState) => {
    dispatch({ type: "EDITOR_EDITED_200", payload: editorState });
  };

  const onSubjectChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: "SUBJECT_CHANGE", payload: event.target.value });
  };

  const templateState =
    state.outreach?.state == OutreachStateEnum.Finalized &&
    !isEditorChanged(state)
      ? "Current Published Template"
      : "Current Draft Template";

  return (
    <div className="OutReachEditor_root">
      <Modal
        clickSavedHandler={() => {
          dispatch({ type: "USE_FINAL" });
        }}
        clickDraftHandler={() => {
          dispatch({ type: "USE_DRAFT" });
        }}
        isOpen={state.isModalOpen}
      />
      <OutReachHeader
        dispatch={dispatch}
        state={state}
        isEditorChanged={isEditorChanged(state)}
        apiService={apiService}
        templateState={templateState}
      />
      <TextField
        id="standard-basic"
        label="Subject"
        onChange={onSubjectChange}
        value={state.subject}
        style={{ marginBottom: "20px" }}
      ></TextField>
      <Editor
        editorState={state.editorState}
        onEditorStateChange={onEditorStateChange}
        spellCheck={true}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
      />
    </div>
  );
};

/**
 * A function to determine if the editor has content changes, we compare the original
 * outreach content/subject with the current editor content/subject
 *
 * @param state - the outreach editor state
 *
 * @returns a boolean
 *
 * @beta
 */
const isEditorChanged = (state: OutReachEditorReducerState) => {
  if (state === null) {
    debugger;
    return false;
  }
  return !(
    state.outreach?.editor_state?.body == state.content &&
    state.subject == state.outreach.editor_state.subject
  );
};

export default OutReachEditorPage;
