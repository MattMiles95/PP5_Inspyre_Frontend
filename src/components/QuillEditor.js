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
  "bullet",
  "color",
  "background",
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const QuillEditor = ({ content, onChange }) => {
  const { quill, quillRef } = useQuill({ theme: "snow", modules, formats });
  const initialized = useRef(false);
  const contentSet = useRef(false);

  // Apply onChange hook
  useEffect(() => {
    if (quill && !initialized.current) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange?.(html);
      });
      initialized.current = true;
    }
  }, [quill, onChange]);

  // Paste in content only once on load
  useEffect(() => {
    if (quill && !contentSet.current && content) {
      quill.clipboard.dangerouslyPasteHTML(content);
      contentSet.current = true;
    }
  }, [quill, content]);

  return (
    <div
      ref={quillRef}
      style={{
        height: 300,
        borderRadius: "8px",
        overflow: "hidden",
      }}
      className="inspyre-quill-wrapper"
    />
  );
};

export default QuillEditor;
