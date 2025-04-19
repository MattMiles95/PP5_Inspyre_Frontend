// React
import React, { useEffect } from "react";

// React Quill
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ content, onChange }) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(content);
      quill.on("text-change", () => {
        onChange?.(quill.root.innerHTML);
      });
    }
  }, [quill, content, onChange]);

  return <div ref={quillRef} style={{ height: 200 }} />;
};

export default QuillEditor;
