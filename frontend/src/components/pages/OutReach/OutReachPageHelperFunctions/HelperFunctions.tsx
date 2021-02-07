import { AxiosResponse } from "axios";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import {
  Outreach,
  OutreachStateEnum,
  ValleeBackendApi,
} from "../../../../util/gen/api/dist";

import {
  OutReachEditorReducerState,
  OutReachEditorActions,
} from "../OutReachReducer";

export type HasDraftReturnType = {
  hasDraft: boolean;
  finalIndex?: number;
};

// Will return false if most recent is not draft; true and index of most recent published if exists
export function hasDraft(data: Outreach[]): HasDraftReturnType {
  var firstDraft: undefined | Outreach = undefined;
  if (data.length !== 0) {
    const mostRecent = data[0];
    if (mostRecent.state == OutreachStateEnum.Finalized) {
      return { hasDraft: false };
    }

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (firstDraft == undefined && element.state == OutreachStateEnum.Draft) {
        firstDraft = element;
      } else if (element.state == OutreachStateEnum.Finalized) {
        return { hasDraft: true, finalIndex: index };
      }
    }
  }
  return { hasDraft: true };
}

export function isEditorChanged(state: OutReachEditorReducerState) {
  return !(
    state.outreach?.editor_state?.body == state.content &&
    state.subject == state.outreach.editor_state.subject
  );
}

/*TODO: show document history, that is why we are creating new when publishing */
export function publishClickHandler(
  state: OutReachEditorReducerState,
  dispatch: React.Dispatch<OutReachEditorActions>,
  client: ValleeBackendApi
) {
  client
    .createOutreach({
      state: OutreachStateEnum.Finalized,
      editor_state: {
        body: state.content,
        subject: state.subject,
      },

      job: state.job,
    })
    .then((value) => {
      dispatch({ type: "EDITOR_PUT_POST_200", payload: value.data });
    });
}

export function saveClickHandler(
  state: OutReachEditorReducerState,
  dispatch: React.Dispatch<OutReachEditorActions>,
  client: ValleeBackendApi
) {
  debugger;
  /* TODO: create new reducer action to update  state with returned value from api */
  if (
    state.outreach?.id &&
    state.outreach?.state !== OutreachStateEnum.Finalized
  ) {
    client
      .partialUpdateOutreach(state.outreach.id, {
        job: state.job,
        editor_state: {
          body:
            state.content /* TODO: Figure our serialization of text editor State */,
          subject: state.subject,
        },
        state: OutreachStateEnum.Draft,
      }) /*added this to update state of outrach after put/post */
      .then((value) => {
        dispatch({ type: "EDITOR_PUT_POST_200", payload: value.data });
      });
  } else if (isEditorChanged(state)) {
    client
      .createOutreach({
        job: state.job,
        editor_state: {
          body:
            state.content /* TODO: Figure our serialization of text editor State*/,
          subject: state.subject,
        },
        state: OutreachStateEnum.Draft,
      }) /*added this to update state of outrach after put/post */
      .then((value) => {
        dispatch({ type: "EDITOR_PUT_POST_200", payload: value.data });
      });
  }
}
