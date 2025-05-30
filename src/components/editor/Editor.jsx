import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import React from "react";
import { extensions } from "../../constants/tiptapExtensions";

const Editor = ({ onDataChange, content, editable }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          `prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none m-5 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf] editor-content`,
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className="w-full relative m-0 p-0 ">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className={`${editable && "border border-slate-300  bg-white "} mt-2 rounded-lg`}/>
    </div>
  );
};

export default Editor;