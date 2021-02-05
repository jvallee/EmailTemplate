import { ContentState, convertToRaw, EditorState } from "draft-js";

export function getEditorContentAsString(editorState: EditorState) {
  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const value = blocks
    .map((block) => (!block.text.trim() && "\n") || block.text)
    .join("\n");
  return value.trim();
}

export function stringToEditorState(text: string) {
  var initialContentState = ContentState.createFromText(text);
  return EditorState.createWithContent(initialContentState);
}
