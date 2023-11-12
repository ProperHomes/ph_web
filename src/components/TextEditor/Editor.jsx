"use client";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function DraftEditor({ initialState, isError, setValue }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (initialState) {
      const editorContent = EditorState.createWithContent(
        convertFromHTML(initialState)
      );
      setEditorState(editorContent);
    }
  }, [initialState]);

  const handleChangeEditorState = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const htmlContent = convertToHTML(contentState);
    setValue(htmlContent);
  };

  return (
    <Stack>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        editorStyle={{
          border: isError ? "1px solid red" : "1px solid #ccc",
          padding: "1rem",
        }}
        editorState={editorState}
        onEditorStateChange={handleChangeEditorState}
        toolbar={{
          options: ["inline", "textAlign", "list"],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
        }}
      />
    </Stack>
  );
}
