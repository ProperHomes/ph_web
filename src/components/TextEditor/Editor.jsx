"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export default function QuillEditor({ initialState, isError, setValue }) {
  return (
    <ReactQuill
      defaultValue={initialState}
      onChange={setValue}
      modules={modules}
      formats={formats}
      style={{
        border: isError ? "1px solid red" : "none",
        height: "100%",
      }}
    />
  );
}
