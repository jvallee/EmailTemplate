import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { EditorState, RawDraftContentState } from "draft-js";
import { Client, Job } from "../../../util/gen/api/dist";

export {};

export type OutReachEditorReducerState = {
  job?: Job;
  editorState?: EditorState;
  isDirty: boolean;
  isModalOpen: boolean;
  content: string;
  subject: string;
};

export type OutReachEditorActions =
  | {
      type: "EDITOR_EDITED_200";
      payload: EditorState;
    }
  | {
      type: "EDITOR_POSTED";
      payload: Job;
    }
  | {
      type: "STYLES_CHANGE";
    }
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
      payload: { editorState: EditorState; loadedContent: string };
    }
  | {
      type: "EDITOR_LOAD_JOB";
      payload: Job;
    }
  | {
      type: "SUBJECT_CHANGE";
      payload: string;
    }
  | {
      type: "EDITOR_LOADED_200";
      payload: EditorState;
    };

export default function reducer(
  state: OutReachEditorReducerState,
  action: OutReachEditorActions
): OutReachEditorReducerState {
  debugger;
  switch (action.type) {
    case "EDITOR_EDITED_200":
      return { ...state, editorState: action.payload, isDirty: true };
    case "SUBJECT_CHANGE":
      return { ...state, subject: action.payload, isDirty: true };
    case "EDITOR_LOADED_200":
      return {
        ...state,
        isDirty: false,
        editorState: action.payload,
      };
    case "STYLES_CHANGE":
      return {
        ...state,
        isDirty: false,
      };
    case "EDITOR_POSTED":
      return {
        ...state,
        isDirty: false,
        content: action.payload.templateDraft ?? "",
        job: action.payload,
        subject: action.payload.subject ?? "",
      };

    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        editorState: action.payload.editorState,
        content: action.payload.loadedContent,
        isModalOpen: false,
      };
    case "EDITOR_LOAD_JOB":
      return {
        ...state,
        job: action.payload,
        content: action.payload.template,
        subject: action.payload.subject ?? "",
      };
    default:
      return state;
  }
}
