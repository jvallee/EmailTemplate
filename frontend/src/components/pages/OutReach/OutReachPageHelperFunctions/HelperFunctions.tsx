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

/**
 * a function that will return false if most recent is not draft; else will
 * true and index of most recent published if exists. Note: will never
 * return index if does not have a draft before the most recent published
 *
 * @param data - array of outreaches sorted by creation date
 *
 * @returns nothing
 *
 * @beta
 */
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

/* TODO: show document history, that is why we are creating new when publishing */
/**
 * a function that will create a new published outreach on the backend.
 *
 * @param state - the OutReachEditorReducerState containing the current state
 * @param dispatch - the editor dispatch to handle events related to saving and publishing
 * @param apiService - the api the connects to the backend used in publish and save
 *
 * @returns nothing
 *
 * @beta
 */
export function publishClickHandler(
  state: OutReachEditorReducerState,
  dispatch: React.Dispatch<OutReachEditorActions>,
  apiService: ValleeBackendApi
) {
  apiService
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

/**
 * a function that will save the outreach as a draft. If the this job has
 * no outreaches associated with it, will create no outreach. Will also create
 * new if this outreach has an edit, but the previous version was published.
 * If this job has an outreach assocaited with it (that wasn'y published)
 * will update said outreach
 *
 * @param state - the OutReachEditorReducerState containing the current state
 * @param dispatch - the editor dispatch to handle events related to saving and publishing
 * @param apiService - the api the connects to the backend used in publish and save
 *
 * @returns nothing
 *
 * @beta
 */
export function saveClickHandler(
  state: OutReachEditorReducerState,
  dispatch: React.Dispatch<OutReachEditorActions>,
  apiService: ValleeBackendApi
) {
  /* we pulled an outreach from the server, and that outreach wasn't published */
  if (
    state.outreach?.id &&
    state.outreach?.state !== OutreachStateEnum.Finalized
  ) {
    apiService
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
  }
  // There is a change and outreach is published (create new draft)
  else if (isEditorChanged(state)) {
    apiService
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
