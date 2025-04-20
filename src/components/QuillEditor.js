// React
import React, { useEffect, useRef } from "react";

// React Quill
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const QuillEditor = ({ content, onChange }) => {
  const { quill, quillRef } = useQuill({ modules, formats, theme: "snow" });
  const initialized = useRef(false);
  const contentSet = useRef(false);

  useEffect(() => {
    if (quill && !initialized.current) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange?.(html);
      });
      initialized.current = true;
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && !contentSet.current && content) {
      quill.clipboard.dangerouslyPasteHTML(content);
      contentSet.current = true;
    }
  }, [quill, content]);

  return <div ref={quillRef} style={{ height: 200 }} />;
};

export default QuillEditor;
