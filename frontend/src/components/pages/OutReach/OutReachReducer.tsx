import React from "react";
import { EditorState } from "draft-js";

import {
  getEditorContentAsString,
  stringToEditorState,
} from "../../../util/HelperFunctions/TextEditorHelpers";
import { HasDraftReturnType } from "./OutReachPageHelperFunctions/HelperFunctions";
import { Outreach } from "../../../util/gen/api/dist";
import { AxiosResponse } from "axios";

export type OutReachEditorReducerState = {
  editorState: EditorState;
  isDirty: boolean;
  isModalOpen: boolean;
  content: string;
  subject: string;
  job: number;
  outreach?: Outreach;
  outreaches?: Outreach[];
  hasDraft: HasDraftReturnType;
};

export type OutReachEditorActions =
  | {
      type: "CLOSE_MODAL";
      payload: { editorState: EditorState; loadedContent: string };
    }
  | {
      type: "EDITOR_EDITED_200";
      payload: EditorState;
    }
  | {
      type: "SUBJECT_CHANGE";
      payload: string;
    }
  | {
      type: "USE_FINAL";
    }
  | {
      type: "USE_DRAFT";
    }
  | {
      type: "EDITOR_LOADED_200";
      payload: {
        outreach: Outreach;
        hasDraft: HasDraftReturnType;
        outreaches: Outreach[];
      };
    }
  | {
      type: "EDITOR_PUT_POST_200";
      payload: Outreach;
    };

export default function reducer(
  state: OutReachEditorReducerState,
  action: OutReachEditorActions
): OutReachEditorReducerState {
  switch (action.type) {
    case "EDITOR_LOADED_200":
      const isModallOpen = action.payload.hasDraft.finalIndex !== undefined;
      debugger;
      return {
        ...state,
        outreach: action.payload.outreach,
        editorState: stringToEditorState(
          action.payload.outreach?.editor_state?.body || ""
        ),
        subject: action.payload.outreach?.editor_state?.subject || "",
        isModalOpen: isModallOpen,
        outreaches: action.payload.outreaches,
        hasDraft: action.payload.hasDraft,
        content: action.payload.outreach?.editor_state?.body || "",
      };

    case "EDITOR_PUT_POST_200":
      /* TODO: Figure our serialization of text editor State*/
      return {
        ...state,
        outreach: action.payload,
      };
    case "SUBJECT_CHANGE":
      /* TODO: Figure our serialization of text editor State*/
      return {
        ...state,
        subject: action.payload,
      };
    case "EDITOR_EDITED_200":
      return {
        ...state,
        editorState: action.payload,
        content: getEditorContentAsString(state.editorState),
      };
    case "CLOSE_MODAL":
      return {
        ...state,
      };

    case "USE_DRAFT":
      if (state.outreaches && state.hasDraft?.finalIndex !== undefined) {
        return {
          ...state,
          outreach: state.outreaches[0],
          isModalOpen: false,
        };
      }
      return {
        ...state,
        isModalOpen: false,
      };
    case "USE_FINAL":
      if (state.outreaches && state.hasDraft?.finalIndex !== undefined) {
        const finalOutreach = state.outreaches[state.hasDraft.finalIndex];
        return {
          ...state,
          isModalOpen: false,
          outreach: state.outreaches[state.hasDraft.finalIndex],
          editorState: stringToEditorState(
            finalOutreach.editor_state?.body || ""
          ),
          subject: finalOutreach?.editor_state?.subject || "",
          content: finalOutreach.editor_state?.body,
        };
      }
      return {
        ...state,
        isModalOpen: false,
      };

    default:
      return state;
  }
}
