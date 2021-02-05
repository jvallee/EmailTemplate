import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import { ApiApi, Job } from "../../../util/gen/api/dist";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor, RawDraftContentState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import "./OutReachEditor.css";
import { Prompt, useParams } from "react-router";
import reducer, {
  OutReachEditorActions,
  OutReachEditorReducerState,
} from "./OutReachEditorReducer";
import {
  stringToEditorState,
  getEditorContentAsString,
} from "../../../util/HelperFunctions/TextEditorHelpers";
import Modal from "./Modal/Modal";
import "./OutReachEditor.css";
import Header from "../../common/Header/Header";
import Button from "../../common/Button/Button";
import HeaderContainer from "../../common/HeaderContainer/HeaderContainer";
import BorderBox from "../../common/BorderBox/BorderBox";
import { TextField } from "@material-ui/core";

type OutReachEditorProps = {
  setQueryInfo?: Function;
  apiService?: ApiApi;
};

interface IUserPublicProfileRouteParams {
  id: string;
}

const OutReachEditorPage: React.FC<OutReachEditorProps> = (props) => {
  const { apiService } = props;
  const id = parseInt(useParams<IUserPublicProfileRouteParams>().id);

  const [state, dispatch] = useReducer(reducer, {
    job: undefined,
    editorState: EditorState.createWithContent(
      ContentState.createFromText("placeholder")
    ),
    isDirty: false,
    isModalOpen: false,
    content: "",
    subject: "",
  } as OutReachEditorReducerState);

  const modalClickHelper = (loadedContent: string) => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: {
        editorState: stringToEditorState(loadedContent),
        loadedContent: loadedContent,
      },
    });
  };

  const useDraftHandler = () => {
    modalClickHelper(state.job?.templateDraft ?? "");
  };

  const useSavedHandler = () => {
    modalClickHelper(state.job?.template ?? "");
  };

  useEffect(() => {
    if (state.job == undefined) {
      // this will happen only once on page load
      loadDataIn(id, dispatch, apiService);
    } else if (
      state.isDirty === true &&
      state.editorState?.getCurrentContent() != undefined
    ) {
      editorEditedHandler(id, state, dispatch, apiService);
    }
  }, [state.isDirty]);

  const saveClickHandler = () => {
    if (state.editorState != undefined) {
      const value = getEditorContentAsString(state.editorState);
      save(value);
    }
  };

  const save = (value: string) => {
    apiService
      ?.apiJobsUpdate(id, {
        ...state.job,
        template: value,
        hasDraft: false,
        templateDraft: value,
        subject: state.subject,
      } as Job)
      .then((value) => {
        dispatch({ type: "EDITOR_POSTED", payload: value.data });
      });
  };

  const onEditorStateChange = (editorState: EditorState) => {
    dispatch({ type: "EDITOR_EDITED_200", payload: editorState });
  };
  const subjectChangeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch({ type: "SUBJECT_CHANGE", payload: event.target.value });
  };

  const init = ContentState.createFromText("plain text");

  return (
    <div className={"OutReachEditor_root"}>
      <Prompt
        when={(state.job?.template ?? "") != state.content}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}, you have unsaved changes`
        }
      />
      <Modal
        clickSavedHandler={useSavedHandler}
        clickDraftHandler={useDraftHandler}
        isOpen={state.isModalOpen}
      />
      <HeaderContainer className={"EditorHeader"}>
        <h2>{"Draft for " + state.job?.name}</h2>
        <Button
          onClick={saveClickHandler}
          disabled={
            (state.job?.template ?? "") == state.content &&
            state.job?.subject == state.subject
          }
          style={{ height: "30px" }}
        >
          Save Template
        </Button>
      </HeaderContainer>
      <TextField
        id="standard-basic"
        label="Subject"
        onChange={subjectChangeHandler}
        value={state.subject}
        style={{ marginBottom: "20px" }}
      ></TextField>
      <Editor
        initialContentState={convertToRaw(init)}
        editorState={state.editorState}
        onEditorStateChange={onEditorStateChange}
        spellCheck={true}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
      />
    </div>
  );
};

const loadDataIn = (
  id: number,
  dispatch: (value: OutReachEditorActions) => void,
  apiService?: ApiApi
) => {
  apiService?.apiJobsRetrieve(id).then((value) => {
    dispatch({ type: "EDITOR_LOAD_JOB", payload: value.data });
    if (value.data.hasDraft) {
      dispatch({ type: "OPEN_MODAL" });
    } else {
      var initialEditorState = stringToEditorState(value.data.template ?? "");
      dispatch({ type: "EDITOR_LOADED_200", payload: initialEditorState });
    }
  });
};

const editorEditedHandler = (
  id: number,
  state: OutReachEditorReducerState,
  dispatch: (value: OutReachEditorActions) => void,
  apiService?: ApiApi
) => {
  if (state.editorState?.getCurrentContent() == undefined) {
    console.error("should not be happening, editorState should be defined");
    return;
  }
  const editor_conent = getEditorContentAsString(state.editorState);
  if (state.job?.templateDraft !== editor_conent) {
    debugger;
    apiService
      ?.apiJobsUpdate(id, {
        ...state.job,
        templateDraft: editor_conent,
        hasDraft: true,
        subject: state.subject,
      } as Job)
      .then((value) => {
        debugger;
        dispatch({
          type: "EDITOR_POSTED",
          payload: value.data ?? "",
        });
      });
  } else {
    dispatch({ type: "STYLES_CHANGE" });
  }
};

export default OutReachEditorPage;
